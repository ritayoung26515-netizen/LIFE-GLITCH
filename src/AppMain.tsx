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
import { gameplayStart, gameplayStop } from './utils/crazyGames';
import { getUnlockedMedalIds, saveUnlockedMedalIds } from './utils/traits';

const STORAGE_PAST_RUNS = 'life_glitch_past_runs';
const STORAGE_TOTAL_RUNS = 'life_glitch_total_runs';
const STORAGE_LANG = 'life_glitch_lang';
const STORAGE_THEME = 'life_glitch_theme';

/** Demo sample ids – never show as player history */
const SAMPLE_RUN_IDS = new Set([
  'run_meme_informant',
  'run_carefree_aristocrat',
]);

function loadPastRunsFromStorage(): PastRun[] {
  try {
    const saved = localStorage.getItem(STORAGE_PAST_RUNS);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r: PastRun) =>
        r &&
        r.id &&
        !SAMPLE_RUN_IDS.has(String(r.id)) &&
        !String(r.id).startsWith('run_meme') &&
        !String(r.id).startsWith('run_carefree')
    );
  } catch {
    return [];
  }
}

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
  const [pastRuns, setPastRuns] = useState<PastRun[]>([]);
  const [totalRuns, setTotalRuns] = useState(0);
  const [inspectedPastRun, setInspectedPastRun] = useState<PastRun | null>(null);
  const [unlockedMedalIds, setUnlockedMedalIds] = useState<string[]>(() => getUnlockedMedalIds());
  const [showRegretAd, setShowRegretAd] = useState(false);
  const [showReviveAd, setShowReviveAd] = useState(false);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_LANG) as Language | null;
      if (savedLang === 'en' || savedLang === 'zh') setLanguage(savedLang);

      const savedTheme = localStorage.getItem(STORAGE_THEME) as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);

      const loaded = loadPastRunsFromStorage();
      setPastRuns(loaded);

      const storedTotal = localStorage.getItem(STORAGE_TOTAL_RUNS);
      let effectiveTotal = loaded.length;
      if (storedTotal !== null) {
        const n = parseInt(storedTotal, 10);
        if (!isNaN(n) && n >= 0) effectiveTotal = Math.max(n, loaded.length);
      }
      if (loaded.length === 0) effectiveTotal = 0;
      setTotalRuns(effectiveTotal);

      const allFlags = loaded.flatMap(r => r.flags || []);
      if (allFlags.length > 0) {
        setUnlockedMedalIds(saveUnlockedMedalIds(allFlags));
      }
    } catch {
      setPastRuns([]);
      setTotalRuns(0);
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    sounds.setMuted(isMuted);
  }, [isMuted]);

  const handleToggleLanguage = () => {
    setLanguage(l => {
      const next = l === 'zh' ? 'en' : 'zh';
      try { localStorage.setItem(STORAGE_LANG, next); } catch {}
      return next;
    });
  };
  const handleToggleTheme = () => {
    setTheme(t => {
      const next = t === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(STORAGE_THEME, next); } catch {}
      return next;
    });
  };
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

  const handleGameOver = (finalState: GameState) => {
    gameplayStop();
    try {
      const epitaph = generateEpitaph(finalState);
      const runRecord: PastRun = {
        id: `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        age: finalState.age,
        money: finalState.money,
        health: finalState.health,
        happiness: finalState.happiness,
        stress: finalState.stress,
        fame: finalState.fame,
        job: finalState.job,
        epitaph: epitaph.title,
        deathReason: finalState.deathReason || { en: 'Unknown', zh: '未知原因' },
        flags: [...finalState.flags],
        history: [...finalState.history],
        timeline: [...finalState.history],
        date: new Date().toLocaleDateString()
      };

      const updatedHistory = [...pastRuns, runRecord].slice(-50);
      setPastRuns(updatedHistory);
      try {
        localStorage.setItem(STORAGE_PAST_RUNS, JSON.stringify(updatedHistory));
      } catch {
        try {
          localStorage.setItem(STORAGE_PAST_RUNS, JSON.stringify(updatedHistory.slice(-15)));
        } catch {}
      }

      const newTotal = Math.max(totalRuns, pastRuns.length) + 1;
      setTotalRuns(newTotal);
      try {
        localStorage.setItem(STORAGE_TOTAL_RUNS, String(newTotal));
      } catch {}

      const newlyUnlocked = saveUnlockedMedalIds(finalState.flags);
      setUnlockedMedalIds(newlyUnlocked);
    } catch {
      // ignore storage errors
    }
    setScreen('END');
  };

  const handleSelectChoice = (choice: EventChoice) => {
    if (isProcessingChoice || !currentEvent) return;
    setIsProcessingChoice(true);
    setPreviousTurnState({ ...gameState });
    setPreviousEvent(currentEvent);

    const effects = choice.effects;
    const salaryResult = calculateJobSalary(gameState.job, gameState);
    const annualSalary = salaryResult.salary || 0;
    const totalMoneyDelta = (effects.money || 0) + annualSalary;

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
      effectsSummary: {
        en: enSummary || 'Routine year',
        zh: zhSummary || '平穩度過的一年'
      },
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

    const nextMoney = gameState.money + totalMoneyDelta;
    const nextHealth = Math.max(0, Math.min(100, gameState.health + (effects.health || 0)));
    const nextHappiness = Math.max(0, Math.min(100, gameState.happiness + (effects.happiness || 0)));
    const nextStress = Math.max(0, Math.min(100, gameState.stress + (effects.stress || 0)));
    const nextFame = Math.max(0, Math.min(100, gameState.fame + (effects.fame || 0)));
    const nextAge = gameState.age + 1;

    const nextState: GameState = {
      ...gameState,
      age: nextAge,
      money: nextMoney,
      health: nextHealth,
      happiness: nextHappiness,
      stress: nextStress,
      fame: nextFame,
      job: effects.setJob || gameState.job,
      relationship: effects.setRelationship || gameState.relationship,
      flags: updatedFlags,
      history: [...gameState.history, newHistoryEntry],
      peakMoney: Math.max(gameState.peakMoney, nextMoney),
      decisionsCount: gameState.decisionsCount + 1
    };

    if (nextHealth <= 0 || nextStress >= 100 || nextAge > 100) {
      const deathReason = determineDeathReason(nextState);
      const finalState = { ...nextState, isAlive: false, deathReason };
      setGameState(finalState);
      setTimeout(() => {
        handleGameOver(finalState);
        setIsProcessingChoice(false);
      }, 350);
      return;
    }

    setGameState(nextState);
    const nextEvent = eventEngine.getNextEvent(nextState);
    setTimeout(() => {
      setCurrentEvent(nextEvent);
      setIsProcessingChoice(false);
    }, 280);
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
    const revivedState: GameState = {
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

  if (!storageReady) {
    return (
      <div className={`min-h-[100dvh] flex items-center justify-center ${theme === 'light' ? 'bg-slate-50' : 'bg-[#0b0e14]'}`}>
        <p className="text-sm opacity-60">…</p>
      </div>
    );
  }

  if (screen === 'START') {
    return (
      <StartScreen
        totalRuns={totalRuns}
        language={language}
        theme={theme}
        onStartGame={handleStart}
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
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onRestart={handleStart}
        onOpenAdRevive={() => setShowReviveAd(true)}
        canRewindFatal={previousTurnState !== null && !gameState.hasRevived}
        onRewindFatalChoice={handleOpenRegretAd}
        onOpenHistory={() => setIsLogOpen(true)}
        onReturnHome={handleReturnHome}
        onOpenTrophyRoom={() => setIsTrophyRoomOpen(true)}
        totalUnlockedCount={unlockedMedalIds.length}
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
        mode="REGRET"
      />
      <MockAdModal
        isOpen={showReviveAd}
        onClose={() => setShowReviveAd(false)}
        onComplete={handleRevive}
        language={language}
        mode="REVIVE"
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
