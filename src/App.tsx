/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameState, GameEvent, EventChoice, TurnFeedback, PastRun, Language, LifeLogEntry } from './types/game';
import { eventEngine } from './data/eventEngine';
import { determineDeathReason, generateEpitaph } from './utils/epitaph';
import { sounds } from './utils/audio';

import { StatusHUD } from './components/StatusHUD';
import { EventCard } from './components/EventCard';
import { StartScreen } from './components/StartScreen';
import { EndScreen } from './components/EndScreen';
import { LifeLogDrawer } from './components/LifeLogDrawer';
import { MockAdModal } from './components/MockAdModal';
import { AbandonModal } from './components/AbandonModal';
import { DEFAULT_PAST_RUNS, ensurePastRunHistory } from './data/sampleRuns';
import { gameplayStart, gameplayStop, requestRewardedAd } from './utils/crazyGames';

type AppScreen = 'START' | 'PLAYING' | 'GAME_OVER';

const INITIAL_STATE: GameState = {
  age: 18,
  money: 1000,
  health: 80,
  happiness: 60,
  stress: 30,
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
  
  // Anti-Spam Button Debounce (400ms lock)
  const [isProcessingChoice, setIsProcessingChoice] = useState(false);

  // Regret / Undo Choice feature (Rewind state, unlimited rewinds)
  const [previousTurnState, setPreviousTurnState] = useState<GameState | null>(null);
  const [previousEvent, setPreviousEvent] = useState<GameEvent | null>(null);
  const [forkTargetEntry, setForkTargetEntry] = useState<LifeLogEntry | null>(null);

  // Modals & Drawers
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isAbandonConfirmOpen, setIsAbandonConfirmOpen] = useState(false);
  const [adMode, setAdMode] = useState<'REVIVE' | 'REGRET' | 'FORK'>('REVIVE');
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [totalRuns, setTotalRuns] = useState<number>(0);
  const [pastRuns, setPastRuns] = useState<PastRun[]>([]);
  const [inspectedPastRun, setInspectedPastRun] = useState<PastRun | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'zh' ? 'zh-TW' : 'en';
    }
  }, [language]);

  // Load localStorage on mount
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('life_glitch_lang') as Language;
      if (savedLang === 'en' || savedLang === 'zh') {
        setLanguage(savedLang);
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

  const handleToggleMute = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
  };

  // Start new life
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

  // Abandon current life and return cleanly to Start Screen (#screen-start)
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

  // Process player choice with strict +1 age increment & 400ms anti-spam debounce
  const handleSelectChoice = (choice: EventChoice) => {
    if (isProcessingChoice) return;
    setIsProcessingChoice(true);
    setTimeout(() => {
      setIsProcessingChoice(false);
    }, 400);

    const effects = choice.effects;
    const prev = gameState;

    // Save previous snapshot for Regret / Rewind Ad
    setPreviousTurnState({ ...prev });
    setPreviousEvent(currentEvent);

    // FIX 1: Age MUST strictly increment by exactly +1 per valid choice (NEVER minAge)
    const newAge = prev.age + 1;
    const newMoney = prev.money + (effects.money ?? 0);
    const newHealth = Math.max(0, Math.min(100, prev.health + (effects.health ?? 0)));
    const newHappiness = Math.max(0, Math.min(100, prev.happiness + (effects.happiness ?? 0)));
    const newStress = Math.max(0, Math.min(100, prev.stress + (effects.stress ?? 0)));
    const newFame = Math.max(0, Math.min(100, prev.fame + (effects.fame ?? 0)));

    // Job and Relationship updates
    const newJob = effects.setJob || prev.job;
    const newRelationship = effects.setRelationship || prev.relationship;

    // Flags handling
    let updatedFlags = [...prev.flags];
    if (effects.addFlags) {
      effects.addFlags.forEach(f => {
        if (!updatedFlags.includes(f)) updatedFlags.push(f);
      });
    }
    if (effects.removeFlags) {
      updatedFlags = updatedFlags.filter(f => !effects.removeFlags!.includes(f));
    }

    // Audio cues
    if ((effects.money ?? 0) > 0) {
      sounds.playCash();
    } else if ((effects.stress ?? 0) > 15 || (effects.health ?? 0) < -8) {
      sounds.playDanger();
    } else {
      sounds.playPositive();
    }

    // Build changes summary for feedback and life log
    const deltas: TurnFeedback['deltas'] = [];
    if (effects.money) {
      deltas.push({
        label: { en: 'Money', zh: '資產' },
        value: effects.money > 0 ? `+$${effects.money.toLocaleString()}` : `-$${Math.abs(effects.money).toLocaleString()}`,
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

    const enSummary = deltas.map(d => `${d.value} ${d.label.en}`).join(' · ');
    const zhSummary = deltas.map(d => `${d.value} ${d.label.zh}`).join(' · ');

    const newHistoryEntry: LifeLogEntry = {
      age: prev.age,
      eventText: currentEvent?.text || { en: 'Routine day', zh: '平常的一天' },
      choiceText: choice.text,
      effectsSummary: {
        en: enSummary,
        zh: zhSummary
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

    // Check Game Over conditions:
    // Health <= 0 (Physical collapse)
    // Stress >= 100 (Burnout / Mental breakdown)
    // Age >= 100 (Retirement completion)
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

  // Complete Rewarded Ad (Revive, Regret, or Fork Life)
  // modeOverride avoids stale closure when real CrazyGames ad finishes async
  const handleAdCompleted = (modeOverride?: 'REVIVE' | 'REGRET' | 'FORK') => {
    const effectiveMode = modeOverride ?? adMode;
    setIsAdOpen(false);

    if (effectiveMode === 'FORK') {
      if (!forkTargetEntry || !forkTargetEntry.snapshot || !forkTargetEntry.event) return;
      sounds.playRevive();

      const snap = forkTargetEntry.snapshot;
      const targetAge = snap.age;

      // Slice history up to before this checkpoint (support both current game and inspected past runs)
      const sourceHistory = inspectedPastRun?.timeline ?? inspectedPastRun?.history ?? gameState.history;
      const entryIndex = sourceHistory.findIndex(h => h.age === targetAge);
      const slicedHistory = entryIndex !== -1 
        ? sourceHistory.slice(0, entryIndex) 
        : [];

      // Restore event engine pool with only history prior to this checkpoint
      eventEngine.restoreEventsForHistory(slicedHistory);

      // Restore the player's saved state at that exact age (before that year's choice was made)
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

      // Load that exact event again on #screen-game
      setCurrentEvent(forkTargetEntry.event);
      setPreviousTurnState(null);
      setPreviousEvent(null);
      setForkTargetEntry(null);
      setInspectedPastRun(null);

      // Close the timeline and game over screen
      setIsLogOpen(false);
      setScreen('PLAYING');
      gameplayStart();

      // Show toast: "Timeline branched! You have rewound to Age X."
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

      // Return any freshly generated currentEvent back to the unused pool
      if (currentEvent && currentEvent.id) {
        eventEngine.removeUsedEvent(currentEvent.id);
      }

      // Restore exact previous stats and flags
      const restoredState = { ...previousTurnState };
      setGameState(restoredState);

      // Re-render the exact same event so the player can pick the other option
      if (previousEvent) {
        setCurrentEvent(previousEvent);
      }

      // Reset snapshot for this turn until next choice is made
      setPreviousTurnState(null);
      setPreviousEvent(null);

      // Brief toast: "Time reversed! Pick again wisely."
      setFeedback({
        choiceText: {
          en: 'Time reversed! Pick again wisely.',
          zh: '時光倒流！這次請明智選擇。'
        },
        deltas: []
      });

      // Switch back to PLAYING screen in case rewound from Game Over
      setScreen('PLAYING');
      gameplayStart();
      return;
    }

    // Default: Revive Player
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

  /** Dual-mode rewarded ad: real CrazyGames SDK when available, else mock modal. */
  const requestAdOrMock = (mode: 'REVIVE' | 'REGRET' | 'FORK') => {
    setAdMode(mode);
    gameplayStop();

    const usedRealAd = requestRewardedAd({
      adFinished: () => {
        handleAdCompleted(mode);
      },
      adError: () => {
        // SDK failed → fall back to mock so the player is never stuck
        setIsAdOpen(true);
      },
    });

    if (!usedRealAd) {
      setIsAdOpen(true);
    }
  };

  // Open Regret Rewind Ad (Unlimited across life)
  const handleOpenRegretAd = () => {
    if (!previousTurnState) return;
    requestAdOrMock('REGRET');
  };

  // Open Revive Ad on Game Over
  const handleOpenReviveAd = () => {
    requestAdOrMock('REVIVE');
  };

  // Open Fork Life Rewarded Ad from Timeline
  const handleForkTimeline = (entry: LifeLogEntry) => {
    if (!entry.snapshot || !entry.event) return;
    setForkTargetEntry(entry);
    requestAdOrMock('FORK');
  };

  // Record game over
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
    } catch {
      // storage error fallback
    }

    setScreen('GAME_OVER');
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-100 flex flex-col justify-between relative selection:bg-[#00e676] selection:text-black">
      {/* Main Content Router */}
      <main className="flex-1 flex flex-col justify-center w-full z-10">
        {screen === 'START' && (
          <StartScreen
            totalRuns={totalRuns}
            pastRuns={pastRuns}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onStartGame={handleStartGame}
            onInspectPastRun={handleInspectPastRun}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        )}

        {screen === 'PLAYING' && (
          <div id="screen-game" className="flex-1 flex flex-col justify-start min-h-screen max-w-lg mx-auto w-full">
            <StatusHUD
              state={gameState}
              language={language}
              onToggleLanguage={handleToggleLanguage}
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
                currentAge={gameState.age}
                feedback={feedback}
                canRegret={previousTurnState !== null}
                onRegretClick={handleOpenRegretAd}
                onSelectChoice={handleSelectChoice}
                disabled={isProcessingChoice}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-400">
                {language === 'zh' ? '正在搜尋下一段人生事件...' : 'Searching next life event in the simulation...'}
              </div>
            )}
          </div>
        )}

        {screen === 'GAME_OVER' && (
          <EndScreen
            state={gameState}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onRestart={handleStartGame}
            onOpenAdRevive={handleOpenReviveAd}
            canRewindFatal={previousTurnState !== null}
            onRewindFatalChoice={handleOpenRegretAd}
            onOpenHistory={() => {
              setInspectedPastRun(null);
              setIsLogOpen(true);
            }}
            onReturnHome={handleConfirmAbandonLife}
          />
        )}
      </main>

      {/* Life Log & Discovered Traits Drawer */}
      <LifeLogDrawer
        isOpen={isLogOpen}
        onClose={() => {
          setIsLogOpen(false);
          setInspectedPastRun(null);
        }}
        language={language}
        timeline={inspectedPastRun ? (inspectedPastRun.timeline || inspectedPastRun.history || []) : gameState.history}
        history={inspectedPastRun ? (inspectedPastRun.history || inspectedPastRun.timeline || []) : gameState.history}
        flags={inspectedPastRun ? (inspectedPastRun.flags || []) : gameState.flags}
        pastRun={inspectedPastRun}
        onForkTimeline={handleForkTimeline}
      />

      {/* Mock Rewarded Ad Modal (Handles Revive, Regret, and Fork Life) */}
      <MockAdModal
        isOpen={isAdOpen}
        language={language}
        mode={adMode}
        targetAge={forkTargetEntry?.age}
        onClose={() => setIsAdOpen(false)}
        onAdCompleted={handleAdCompleted}
      />

      {/* Confirm Abandon Life & Return Home Modal */}
      <AbandonModal
        isOpen={isAbandonConfirmOpen}
        language={language}
        onConfirm={handleConfirmAbandonLife}
        onCancel={() => setIsAbandonConfirmOpen(false)}
      />
    </div>
  );
}
