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

type AppScreen = 'START' | 'PLAYING' | 'GAME_OVER';

const INITIAL_STATE: GameState = {
  age: 18,
  money: 1000,
  health: 80,
  happiness: 60,
  stress: 20,
  fame: 0,
  job: {
    en: 'Unemployed',
    zh: '無業遊民'
  },
  relationship: {
    en: 'Single',
    zh: '單身'
  },
  flags: [],
  hasRevived: false,
  isAlive: true,
  deathReason: null,
  history: [],
  peakMoney: 1000,
  decisionsCount: 0
};

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('START');
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);
  const [feedback, setFeedback] = useState<TurnFeedback | null>(null);
  const [language, setLanguage] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');
  
  const [isProcessingChoice, setIsProcessingChoice] = useState(false);

  const [previousTurnState, setPreviousTurnState] = useState<GameState | null>(null);
  const [previousEvent, setPreviousEvent] = useState<GameEvent | null>(null);
  const [forkTargetEntry, setForkTargetEntry] = useState<LifeLogEntry | null>(null);

  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isAbandonConfirmOpen, setIsAbandonConfirmOpen] = useState(false);
  const [adMode, setAdMode] = useState<'REVIVE' | 'REGRET' | 'FORK'>('REVIVE');
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [totalRuns, setTotalRuns] = useState<number>(0);
  const [pastRuns, setPastRuns] = useState<PastRun[]>([]);
  const [inspectedPastRun, setInspectedPastRun] = useState<PastRun | null>(null);
  const [isTrophyRoomOpen, setIsTrophyRoomOpen] = useState(false);
  const [unlockedMedalIds, setUnlockedMedalIds] = useState<string[]>(() => getUnlockedMedalIds());

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'zh' ? 'zh-TW' : 'en';
    }
  }, [language]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('life_glitch_lang') as Language;
      if (savedLang === 'en' || savedLang === 'zh') {
        setLanguage(savedLang);
      }

      const savedTheme = localStorage.getItem('life_glitch_theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      } else {
        setTheme('light');
      }

      const savedRuns = localStorage.getItem('life_glitch_total_runs');
      const savedHistory = localStorage.getItem('life_glitch_past_runs');
      
      let loadedPastRuns: PastRun[] = DEFAULT_PAST_RUNS;
      if (savedHistory) {
        try {
          const parsed: PastRun[] = JSON.parse(savedHistory) || [];
          if (parsed.length > 0) {
            loadedPastRuns = parsed.map(ensurePastRunHistory);
          }
        } catch {
          // ignore
        }
      }
      setPastRuns(loadedPastRuns);

      let effectiveTotal = loadedPastRuns.length;
      if (savedRuns !== null) {
        const parsedRuns = parseInt(savedRuns, 10);
        if (!isNaN(parsedRuns) && parsedRuns >= 0) {
          effectiveTotal = Math.max(parsedRuns, loadedPastRuns.length);
        }
      }
      setTotalRuns(effectiveTotal);
      localStorage.setItem('life_glitch_total_runs', String(effectiveTotal));

      // Synchronize all medals earned across all saved past runs
      const allPastFlags = loadedPastRuns.flatMap(r => r.flags || []);
      if (allPastFlags.length > 0) {
        const mergedMedals = saveUnlockedMedalIds(allPastFlags);
        setUnlockedMedalIds(mergedMedals);
      }
    } catch {
      setPastRuns(DEFAULT_PAST_RUNS);
      setTotalRuns(DEFAULT_PAST_RUNS.length);
    }
  }, []);

  const handleInspectPastRun = (run: PastRun) => {
    const verified = ensurePastRunHistory(run);
    setInspectedPastRun(verified);
    setIsLogOpen(true);
  };

  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'zh' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('life_glitch_lang', nextLang);
  };

  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    try {
      localStorage.setItem('life_glitch_theme', nextTheme);
    } catch {
      // ignore
    }
  };

  const handleToggleMute = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
  };

  const handleStartGame = () => {
    eventEngine.reset();
    const freshState: GameState = {
      ...INITIAL_STATE,
      flags: [],
      history: []
    };
    setGameState(freshState);
    setFeedback(null);
    setPreviousTurnState(null);
    setPreviousEvent(null);
    setForkTargetEntry(null);
    setIsProcessingChoice(false);

    const firstEvent = eventEngine.getNextEvent(freshState);
    setCurrentEvent(firstEvent);
    setScreen('PLAYING');
    gameplayStart();
  };

  const handleConfirmAbandonLife = () => {
    setIsAbandonConfirmOpen(false);
    eventEngine.reset();
    setGameState(INITIAL_STATE);
    setCurrentEvent(null);
    setFeedback(null);
    setPreviousTurnState(null);
    setPreviousEvent(null);
    setForkTargetEntry(null);
    setInspectedPastRun(null);
    setIsProcessingChoice(false);
    setIsLogOpen(false);
    setIsAdOpen(false);
    setScreen('START');
    gameplayStop();
  };

  const handleSelectChoice = (choice: EventChoice) => {
    if (isProcessingChoice) return;
    setIsProcessingChoice(true);
    setTimeout(() => {
      setIsProcessingChoice(false);
    }, 400);

    const effects = choice.effects;
    const prev = gameState;

    setPreviousTurnState({ ...prev });
    setPreviousEvent(currentEvent);

    const newAge = prev.age + 1;
    const newJob = effects.setJob || prev.job;
    const newRelationship = effects.setRelationship || prev.relationship;

    // Automatic Job Salary Inflow:
    // Every year when Age advances by +1, grant net annual savings based on current Job
    const salaryResult = calculateJobSalary(newJob, prev);
    const annualSalary = salaryResult.salary;
    const choiceMoneyDelta = effects.money ?? 0;
    const totalMoneyDelta = choiceMoneyDelta + annualSalary;

    const newMoney = prev.money + totalMoneyDelta;
    const newHealth = Math.max(0, Math.min(100, prev.health + (effects.health ?? 0)));
    const newHappiness = Math.max(0, Math.min(100, prev.happiness + (effects.happiness ?? 0)));
    // Natural annual stress decay (-3%) so players aren't locked in a one-way stress spiral
    const naturalStressDecay = -3;
    const newStress = Math.max(0, Math.min(100, prev.stress + (effects.stress ?? 0) + naturalStressDecay));
    const newFame = Math.max(0, Math.min(100, prev.fame + (effects.fame ?? 0)));

    let updatedFlags = [...prev.flags];
    if (effects.addFlags) {
      effects.addFlags.forEach(f => {
        if (!updatedFlags.includes(f)) updatedFlags.push(f);
      });
    }
    if (effects.removeFlags) {
      updatedFlags = updatedFlags.filter(f => !effects.removeFlags!.includes(f));
    }

    if (totalMoneyDelta > 0) {
      sounds.playCash();
    } else if ((effects.stress ?? 0) > 15 || (effects.health ?? 0) < -8) {
      sounds.playDanger();
    } else {
      sounds.playPositive();
    }

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
      age: prev.age,
      eventText: currentEvent?.text || { en: 'Routine day', zh: '平常的一天' },
      choiceText: choice.text,
      effectsSummary: {
        en: enSummary || 'Routine year',
        zh: zhSummary || '平穩度過的一年'
      },
      event: currentEvent ? { ...currentEvent } : undefined,
      snapshot: {
        age: prev.age,
        money: prev.money,
        health: prev.health,
        happiness: prev.happiness,
        stress: prev.stress,
        fame: prev.fame,
        job: { ...prev.job },
        relationship: { ...prev.relationship },
        flags: [...prev.flags],
        peakMoney: prev.peakMoney,
        decisionsCount: prev.decisionsCount
      }
    };

    const nextState: GameState = {
      ...prev,
      age: newAge,
      money: newMoney,
      health: newHealth,
      happiness: newHappiness,
      stress: newStress,
      fame: newFame,
      job: newJob,
      relationship: newRelationship,
      flags: updatedFlags,
      peakMoney: Math.max(prev.peakMoney, newMoney),
      decisionsCount: prev.decisionsCount + 1,
      history: [...prev.history, newHistoryEntry]
    };

    setFeedback({
      choiceText: choice.text,
      deltas
    });

    const isDead = (
      newHealth <= 0 ||
      newStress >= 100 ||
      newAge >= 100
    );

    if (isDead) {
      const deathReason = determineDeathReason(nextState);
      const finalState: GameState = {
        ...nextState,
        isAlive: false,
        deathReason
      };
      setGameState(finalState);
      sounds.playDeath();
      handleGameOver(finalState);
    } else {
      setGameState(nextState);
      const nextEvent = eventEngine.getNextEvent(nextState);
      setCurrentEvent(nextEvent);
    }
  };

  const handleAdCompleted = (modeOverride?: 'REVIVE' | 'REGRET' | 'FORK') => {
    const effectiveMode = modeOverride ?? adMode;
    setIsAdOpen(false);

    if (effectiveMode === 'FORK') {
      if (!forkTargetEntry || !forkTargetEntry.snapshot || !forkTargetEntry.event) return;
      sounds.playRevive();

      const snap = forkTargetEntry.snapshot;
      const targetAge = snap.age;

      const sourceHistory = inspectedPastRun?.timeline ?? inspectedPastRun?.history ?? gameState.history;
      const entryIndex = sourceHistory.findIndex(h => h.age === targetAge);
      const slicedHistory = entryIndex !== -1 
        ? sourceHistory.slice(0, entryIndex) 
        : [];

      eventEngine.restoreEventsForHistory(slicedHistory);

      const forkedState: GameState = {
        age: snap.age,
        money: snap.money,
        health: snap.health,
        happiness: snap.happiness,
        stress: snap.stress,
        fame: snap.fame,
        job: { ...snap.job },
        relationship: { ...snap.relationship },
        flags: [...snap.flags],
        peakMoney: Math.max(snap.money, snap.peakMoney || snap.money),
        decisionsCount: snap.decisionsCount || slicedHistory.length,
        isAlive: true,
        deathReason: null,
        hasRevived: false,
        history: slicedHistory
      };

      setGameState(forkedState);
      setCurrentEvent(forkTargetEntry.event);
      setPreviousTurnState(null);
      setPreviousEvent(null);
      setForkTargetEntry(null);
      setInspectedPastRun(null);
      setIsLogOpen(false);
      setScreen('PLAYING');
      gameplayStart();

      setFeedback({
        choiceText: {
          en: `Timeline branched! You have rewound to Age ${targetAge}.`,
          zh: `時間線已分叉！你已重返 ${targetAge} 歲。`
        },
        deltas: []
      });
      return;
    }

    if (effectiveMode === 'REGRET') {
      if (!previousTurnState) return;
      sounds.playRevive();

      if (currentEvent && currentEvent.id) {
        eventEngine.removeUsedEvent(currentEvent.id);
      }

      const restoredState = { ...previousTurnState };
      setGameState(restoredState);

      if (previousEvent) {
        setCurrentEvent(previousEvent);
      }

      setPreviousTurnState(null);
      setPreviousEvent(null);

      setFeedback({
        choiceText: {
          en: 'Time reversed! Pick again wisely.',
          zh: '時光倒流！這次請明智選擇。'
        },
        deltas: []
      });

      setScreen('PLAYING');
      gameplayStart();
      return;
    }

    sounds.playRevive();
    const revivedHealth = Math.min(100, Math.max(50, gameState.health + 50));
    const revivedStress = Math.max(10, gameState.stress - 30);

    const revivedState: GameState = {
      ...gameState,
      health: revivedHealth,
      stress: revivedStress,
      happiness: Math.max(gameState.happiness, 40),
      isAlive: true,
      hasRevived: true,
      deathReason: null
    };

    setGameState(revivedState);
    setFeedback({
      choiceText: {
        en: 'Revived by CrazyGames Nanotech Sponsor!',
        zh: '已透過 CrazyGames 贊助商奈米科技完成復活！'
      },
      deltas: [
        { label: { en: 'Health', zh: '健康' }, value: `+50%`, positive: true },
        { label: { en: 'Stress', zh: '壓力' }, value: `-30%`, positive: true }
      ]
    });

    const nextEvent = eventEngine.getNextEvent(revivedState);
    setCurrentEvent(nextEvent);
    setScreen('PLAYING');
    gameplayStart();
  };

  const requestAdOrMock = (mode: 'REVIVE' | 'REGRET' | 'FORK') => {
    setAdMode(mode);
    gameplayStop();

    const usedRealAd = requestRewardedAd({
      adFinished: () => {
        handleAdCompleted(mode);
      },
      adError: () => {
        setIsAdOpen(true);
      },
    });

    if (!usedRealAd) {
      setIsAdOpen(true);
    }
  };

  const handleOpenRegretAd = () => {
    if (!previousTurnState) return;
    requestAdOrMock('REGRET');
  };

  const handleOpenReviveAd = () => {
    requestAdOrMock('REVIVE');
  };

  const handleForkTimeline = (entry: LifeLogEntry) => {
    if (!entry.snapshot || !entry.event) return;
    setForkTargetEntry(entry);
    requestAdOrMock('FORK');
  };

  const handleGameOver = (finalState: GameState) => {
    gameplayStop();

    try {
      const storedRunsStr = localStorage.getItem('life_glitch_total_runs');
      const currentStoredTotal = storedRunsStr !== null ? parseInt(storedRunsStr, 10) : totalRuns;
      const newTotal = (isNaN(currentStoredTotal) || currentStoredTotal <= 0 ? totalRuns : currentStoredTotal) + 1;
      setTotalRuns(newTotal);
      localStorage.setItem('life_glitch_total_runs', String(newTotal));

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

      const updatedHistory = [...pastRuns, runRecord];
      const cappedHistory = updatedHistory.slice(-50);
      setPastRuns(cappedHistory);
      try {
        localStorage.setItem('life_glitch_past_runs', JSON.stringify(cappedHistory));
      } catch {
        localStorage.setItem('life_glitch_past_runs', JSON.stringify(cappedHistory.slice(-20)));
      }

      // Unlock and persist medals earned in this life run
      const newlyUnlocked = saveUnlockedMedalIds(finalState.flags);
      setUnlockedMedalIds(newlyUnlocked);
    } catch {
      // storage error fallback
    }

    setScreen('GAME_OVER');
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between relative transition-colors duration-150 ${
      theme === 'light'
        ? 'bg-[#f1f5f9] text-[#0f172a] selection:bg-[#059669] selection:text-white'
        : 'bg-[#0f1117] text-slate-100 selection:bg-[#00e676] selection:text-black'
    }`}>
      <main className="flex-1 flex flex-col justify-center w-full z-10">
        {screen === 'START' && (
          <StartScreen
            totalRuns={totalRuns}
            pastRuns={pastRuns}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onStartGame={handleStartGame}
            onInspectPastRun={handleInspectPastRun}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenTrophyRoom={() => setIsTrophyRoomOpen(true)}
            unlockedCount={unlockedMedalIds.length}
          />
        )}

        {screen === 'PLAYING' && (
          <div id="screen-game" className="flex-1 flex flex-col justify-between min-h-[100dvh] max-w-lg mx-auto w-full">
            <StatusHUD
              state={gameState}
              language={language}
              onToggleLanguage={handleToggleLanguage}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onOpenLog={() => {
                setInspectedPastRun(null);
                setIsLogOpen(true);
              }}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              onToggleFlagsDrawer={() => {
                setInspectedPastRun(null);
                setIsLogOpen(true);
              }}
              onReturnHome={() => setIsAbandonConfirmOpen(true)}
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
                  {language === 'zh' ? '正在搜尋下一段人生事件...' : 'Searching next life event in the simulation...'}
                </p>
              </div>
            )}
          </div>
        )}

        {screen === 'GAME_OVER' && (
          <EndScreen
            state={gameState}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onRestart={handleStartGame}
            onOpenAdRevive={handleOpenReviveAd}
            canRewindFatal={previousTurnState !== null}
            onRewindFatalChoice={handleOpenRegretAd}
            onOpenHistory={() => {
              setInspectedPastRun(null);
              setIsLogOpen(true);
            }}
            onReturnHome={() => setIsAbandonConfirmOpen(true)}
            onOpenTrophyRoom={() => setIsTrophyRoomOpen(true)}
            totalUnlockedCount={unlockedMedalIds.length}
          />
        )}
      </main>

      <LifeLogDrawer
        isOpen={isLogOpen}
        onClose={() => {
          setIsLogOpen(false);
          setInspectedPastRun(null);
        }}
        language={language}
        theme={theme}
        history={inspectedPastRun?.timeline ?? inspectedPastRun?.history ?? gameState.history}
        onForkTimeline={handleForkTimeline}
      />

      <MockAdModal
        isOpen={isAdOpen}
        mode={adMode}
        language={language}
        theme={theme}
        onAdCompleted={() => handleAdCompleted()}
        onClose={() => {
          setIsAdOpen(false);
          if (adMode === 'REVIVE') {
            // stay on game over
          } else {
            gameplayStart();
          }
        }}
      />

      <AbandonModal
        isOpen={isAbandonConfirmOpen}
        language={language}
        theme={theme}
        onConfirm={handleConfirmAbandonLife}
        onCancel={() => setIsAbandonConfirmOpen(false)}
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
