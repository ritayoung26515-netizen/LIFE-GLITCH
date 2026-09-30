/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameState, GameEvent, EventChoice, TurnFeedback, PastRun, Language, Theme, LifeLogEntry } from './types/game';
import { eventEngine } from './data/eventEngine';
import { determineDeathReason, generateEpitaph } from './utils/epitaph';
import { sounds } from './utils/audio';
import { calculateJobSalary } from './utils/economy';

import { StatusHUD } from './components/StatusHUD';
import { EventCard } from './components/EventCard';
import { StartScreen } from './components/StartScreen';
import { EndScreen } from './components/EndScreen';
import { LifeLogDrawer } from './components/LifeLogDrawer';
import { MockAdModal } from './components/MockAdModal';
import { AbandonModal } from './components/AbandonModal';
import { TrophyRoomModal } from './components/TrophyRoomModal';
import { DEFAULT_PAST_RUNS, ensurePastRunHistory } from './data/sampleRuns';
import { gameplayStart, gameplayStop, requestRewardedAd } from './utils/crazyGames';
import { getUnlockedMedalIds, saveUnlockedMedalIds } from './utils/traits';

const initialState = (): GameState => ({
  age: 18,
  money: 1000,
  health: 80,
  happiness: 60,
  stress: 20,
  fame: 0,
  job: { en: 'Unemployed', zh: '無業遊民' },
  relationship: { en: 'Single', zh: '單身' },
  flags: [],
  hasRevived: false,
  isAlive: true,
  deathReason: null,
  history: [],
  peakMoney: 1000,
  decisionsCount: 0
});

export default function App() {
  const [screen, setScreen] = useState<'START' | 'PLAYING' | 'END'>('START');
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');
  const [isMuted, setIsMuted] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [feedback, setFeedback] = useState<TurnFeedback | null>(null);
  const [previousTurnState, setPreviousTurnState] = useState<GameState | null>(null);
  const [previousEvent, setPreviousEvent] = useState<GameEvent | null>(null);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isAbandonConfirmOpen, setIsAbandonConfirmOpen] = useState(false);
  const [isTrophyRoomOpen, setIsTrophyRoomOpen] = useState(false);
  const [isProcessingChoice, setIsProcessingChoice] = useState(false);
  const [pastRuns, setPastRuns] = useState<PastRun[]>(() => ensurePastRunHistory(DEFAULT_PAST_RUNS));
  const [inspectedPastRun, setInspectedPastRun] = useState<PastRun | null>(null);
  const [unlockedMedalIds, setUnlockedMedalIds] = useState<string[]>(() => getUnlockedMedalIds());
  const [showRegretAd, setShowRegretAd] = useState(false);
  const [showReviveAd, setShowReviveAd] = useState(false);

  useEffect(() => {
    sounds.setMuted(isMuted);
  }, [isMuted]);

  const handleToggleLanguage = () => setLanguage(l => l === 'zh' ? 'en' : 'zh');
  const handleToggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const handleToggleMute = () => setIsMuted(m => !m);

  const handleStart = () => {
    eventEngine.reset();
    const freshState = initialState();
    setGameState(freshState);
    setFeedback(null);
    setPreviousTurnState(null);
    setPreviousEvent(null);
    setInspectedPastRun(null);
    const firstEvent = eventEngine.getNextEvent(freshState);
    setCurrentEvent(firstEvent);
    setScreen('PLAYING');
    gameplayStart();
  };

  const handleReturnHome = () => {
    setIsAbandonConfirmOpen(false);
    eventEngine.reset();
    setScreen('START');
    setCurrentEvent(null);
    setFeedback(null);
    setPreviousTurnState(null);
    setPreviousEvent(null);
    gameplayStop();
  };

  const handleSelectChoice = (choice: EventChoice) => {
    if (isProcessingChoice || !currentEvent) return;
    setIsProcessingChoice(true);
    setPreviousTurnState({ ...gameState });
    setPreviousEvent(currentEvent);

    const effects = choice.effects;
    const salaryResult = calculateJobSalary(gameState.job, gameState);
    const annualSalary = salaryResult.salary || 0;
    let totalMoneyDelta = (effects.money || 0) + annualSalary;

    let updatedFlags = [...gameState.flags];
    if (effects.addFlags) {
      effects.addFlags.forEach(f => {
        if (!updatedFlags.includes(f)) updatedFlags.push(f);
      });
    }
    if (effects.removeFlags) {
      updatedFlags = updatedFlags.filter(f => !effects.removeFlags!.includes(f));
    }

    if (totalMoneyDelta > 0) sounds.playCash();
    else if ((effects.stress ?? 0) > 15 || (effects.health ?? 0) < -8) sounds.playDanger();
    else sounds.playPositive();

    const deltas: TurnFeedback['deltas'] = [];
    if (annualSalary > 0) {
      deltas.push({
        label: { en: `Salary (${salaryResult.tierLabel.en})`, zh: `年薪 (${salaryResult.tierLabel.zh})` },
        value: `+$` + annualSalary.toLocaleString(),
        positive: true
      });
    }
    if (effects.money) {
      deltas.push({
        label: { en: 'Event Cash', zh: '抉擇收支' },
        value: effects.money > 0 ? `+$` + effects.money.toLocaleString() : `-$` + Math.abs(effects.money).toLocaleString(),
        positive: effects.money > 0
      });
    }
    if (effects.health) {
      deltas.push({
        label: { en: 'Health', zh: '健康' },
        value: effects.health > 0 ? `+${effects.health}%` : `${effects.health}%`,
        positive: effects.health > 0
      });
    }
    if (effects.happiness) {
      deltas.push({
        label: { en: 'Joy', zh: '快樂' },
        value: effects.happiness > 0 ? `+${effects.happiness}%` : `${effects.happiness}%`,
        positive: effects.happiness > 0
      });
    }
    if (effects.stress) {
      deltas.push({
        label: { en: 'Stress', zh: '壓力' },
        value: effects.stress > 0 ? `+${effects.stress}%` : `${effects.stress}%`,
        positive: effects.stress < 0
      });
    }
    if (effects.fame) {
      deltas.push({
        label: { en: 'Fame', zh: '聲望' },
        value: effects.fame > 0 ? `+${effects.fame}%` : `${effects.fame}%`,
        positive: effects.fame > 0
      });
    }

    let enSummary = deltas.map(d => `${d.value} ${d.label.en}`).join(' · ');
    let zhSummary = deltas.map(d => `${d.value} ${d.label.zh}`).join(' · ');
    if (effects.addFlags && effects.addFlags.length > 0) {
      const traitStr = effects.addFlags.join(', ');
      enSummary = enSummary ? `${enSummary} · [${traitStr}]` : `[${traitStr}]`;
      zhSummary = zhSummary ? `${zhSummary} · [${traitStr}]` : `[${traitStr}]`;
    }

    const newHistoryEntry: LifeLogEntry = {
      age: gameState.age,
      eventText: currentEvent?.text || { en: 'Routine day', zh: '平常的一天' },
      choiceText: choice.text,
      effectsSummary: { en: enSummary || 'Routine year', zh: zhSummary || '平穩度過的一年' },
      event: currentEvent ? { ...currentEvent } : undefined,
      snapshot: {
        age: gameState.age,
        money: gameState.money,
        health: gameState.health,
        happiness: gameState.happiness,
        stress: gameState.stress,
        fame: gameState.fame,
        job: gameState.job,
        relationship: gameState.relationship,
        flags: gameState.flags,
        peakMoney: gameState.peakMoney,
        decisionsCount: gameState.decisionsCount
      }
    };

    setFeedback({ choiceText: choice.text, deltas });

    setGameState(prev => {
      const nextMoney = prev.money + totalMoneyDelta;
      const nextHealth = Math.max(0, Math.min(100, prev.health + (effects.health || 0)));
      const nextHappiness = Math.max(0, Math.min(100, prev.happiness + (effects.happiness || 0)));
      const nextStress = Math.max(0, Math.min(100, prev.stress + (effects.stress || 0)));
      const nextFame = Math.max(0, Math.min(100, prev.fame + (effects.fame || 0)));
      const nextAge = prev.age + 1;

      const nextState: GameState = {
        ...prev,
        age: nextAge,
        money: nextMoney,
        health: nextHealth,
        happiness: nextHappiness,
        stress: nextStress,
        fame: nextFame,
        job: effects.setJob || prev.job,
        relationship: effects.setRelationship || prev.relationship,
        flags: updatedFlags,
        history: [...prev.history, newHistoryEntry],
        peakMoney: Math.max(prev.peakMoney, nextMoney),
        decisionsCount: prev.decisionsCount + 1
      };

      if (nextHealth <= 0 || nextStress >= 100 || nextAge > 100) {
        const deathReason = determineDeathReason(nextState);
        const finalState = { ...nextState, isAlive: false, deathReason };
        setTimeout(() => {
          setGameState(finalState);
          setScreen('END');
          gameplayStop();
          setIsProcessingChoice(false);
        }, 400);
        return finalState;
      }

      const nextEvent = eventEngine.getNextEvent(nextState);
      setTimeout(() => {
        setCurrentEvent(nextEvent);
        setIsProcessingChoice(false);
      }, 300);
      return nextState;
    });
  };

  const handleOpenRegretAd = () => setShowRegretAd(true);
  const handleRegretConfirm = () => {
    setShowRegretAd(false);
    if (previousTurnState && previousEvent) {
      if (currentEvent && currentEvent.id) eventEngine.removeUsedEvent(currentEvent.id);
      setGameState(previousTurnState);
      setCurrentEvent(previousEvent);
      setFeedback(null);
      setPreviousTurnState(null);
      setPreviousEvent(null);
    }
  };

  const handleRevive = () => {
    setShowReviveAd(false);
    const revivedState = {
      ...gameState,
      health: 50,
      stress: Math.min(gameState.stress, 60),
      isAlive: true,
      hasRevived: true,
      deathReason: null
    };
    setGameState(revivedState);
    const nextEvent = eventEngine.getNextEvent(revivedState);
    setCurrentEvent(nextEvent);
    setScreen('PLAYING');
    setFeedback(null);
    gameplayStart();
  };

  const handleInspectPastRun = (run: PastRun) => setInspectedPastRun(run);

  if (screen === 'START') {
    return (
      <StartScreen
        language={language}
        theme={theme}
        onStart={handleStart}
        onToggleLanguage={handleToggleLanguage}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        pastRuns={pastRuns}
        onInspectPastRun={handleInspectPastRun}
        onOpenTrophyRoom={() => setIsTrophyRoomOpen(true)}
        unlockedCount={unlockedMedalIds.length}
      />
    );
  }

  if (screen === 'END') {
    return (
      <EndScreen
        state={gameState}
        language={language}
        theme={theme}
        onRestart={handleStart}
        onHome={handleReturnHome}
        onRevive={() => setShowReviveAd(true)}
        onOpenRegret={() => setShowRegretAd(true)}
        canRegret={previousTurnState !== null}
        epitaph={generateEpitaph(gameState, language)}
      />
    );
  }

  return (
    <div className={`min-h-[100dvh] flex flex-col ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0b0e14]'}`}>
      <div id="screen-game" className="flex-1 flex flex-col justify-between min-h-[100dvh] max-w-lg mx-auto w-full">
        <StatusHUD
          state={gameState}
          language={language}
          onToggleLanguage={handleToggleLanguage}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenLog={() => { setInspectedPastRun(null); setIsLogOpen(true); }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onToggleFlagsDrawer={() => { setInspectedPastRun(null); setIsLogOpen(true); }}
          onReturnHome={() => setIsAbandonConfirmOpen(true)}
          feedback={feedback}
          canRegret={previousTurnState !== null}
          onRegretClick={handleOpenRegretAd}
        />

        {currentEvent ? (
          <EventCard
            event={currentEvent}
            language={language}
            theme={theme}
            currentAge={gameState.age}
            feedback={feedback}
            canRegret={previousTurnState !== null}
            onRegretClick={handleOpenRegretAd}
            onSelectChoice={handleSelectChoice}
            disabled={isProcessingChoice}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} font-mono-numbers text-sm`}>
              {language === 'zh' ? '正在搜尋下一段人生事件...' : 'Searching next life event...'}
            </p>
          </div>
        )}
      </div>

      <LifeLogDrawer
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        history={inspectedPastRun?.history || gameState.history}
        language={language}
        theme={theme}
      />
      <AbandonModal
        isOpen={isAbandonConfirmOpen}
        onClose={() => setIsAbandonConfirmOpen(false)}
        onConfirm={handleReturnHome}
        language={language}
        theme={theme}
      />
      <MockAdModal
        isOpen={showRegretAd}
        onClose={() => setShowRegretAd(false)}
        onComplete={handleRegretConfirm}
        language={language}
        title={language === 'zh' ? '後悔選擇' : 'Regret Choice'}
      />
      <MockAdModal
        isOpen={showReviveAd}
        onClose={() => setShowReviveAd(false)}
        onComplete={handleRevive}
        language={language}
        title={language === 'zh' ? '復活' : 'Revive'}
      />
      <TrophyRoomModal
        isOpen={isTrophyRoomOpen}
        onClose={() => setIsTrophyRoomOpen(false)}
        unlockedMedalIds={unlockedMedalIds}
        language={language}
        theme={theme}
      />
    </div>
  );
}
