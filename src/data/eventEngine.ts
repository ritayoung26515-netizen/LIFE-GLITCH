import { GameEvent, GameState } from '../types/game';
import { ALL_EVENTS, getProceduralFallbackEvent } from './events';
import { getJobTier, JobTier } from '../utils/economy';

const WEIRD_CATEGORIES = new Set(['WEIRD', 'CHAIN']);

const TIER_ORDER: Record<JobTier, number> = {
  UNEMPLOYED: 0,
  JOKE: 0,
  ENTRY: 1,
  CORPORATE: 2,
  SENIOR: 3,
  EXECUTIVE: 4,
  RETIRED: 2
};

export class EventEngine {
  private usedEventIds: Set<string> = new Set();
  private lastWeirdAge: number | null = null;

  public reset() {
    this.usedEventIds.clear();
    this.lastWeirdAge = null;
  }

  public removeUsedEvent(id: string) {
    this.usedEventIds.delete(id);
  }

  public restoreEventsForHistory(remainingHistory: { event?: GameEvent; age?: number }[]) {
    this.usedEventIds.clear();
    this.lastWeirdAge = null;
    remainingHistory.forEach(h => {
      if (h.event && h.event.id) {
        this.usedEventIds.add(h.event.id);
        if (WEIRD_CATEGORIES.has(h.event.category) && typeof h.age === 'number') {
          this.lastWeirdAge = h.age;
        }
      }
    });
  }

  public getNextEvent(state: GameState): GameEvent {
    let candidateEvents = this.filterEvents(state, state.age, state.age);

    if (candidateEvents.length === 0) {
      candidateEvents = this.filterEvents(state, state.age - 3, state.age + 3);
    }

    if (candidateEvents.length === 0) {
      candidateEvents = this.filterEvents(state, state.age - 8, state.age + 8);
    }

    if (candidateEvents.length === 0) {
      return getProceduralFallbackEvent(state.age);
    }

    const inWeirdCooldown =
      this.lastWeirdAge !== null &&
      state.age - this.lastWeirdAge <= 2;

    const grounded = candidateEvents.filter(e => !WEIRD_CATEGORIES.has(e.category));
    const weird = candidateEvents.filter(e => WEIRD_CATEGORIES.has(e.category));

    let pool: GameEvent[] = [];

    if (inWeirdCooldown && grounded.length > 0) {
      pool = grounded;
    } else {
      const roll = Math.random();
      if (roll < 0.7 && grounded.length > 0) {
        pool = grounded;
      } else if (weird.length > 0) {
        pool = weird;
      } else {
        pool = grounded.length > 0 ? grounded : candidateEvents;
      }
    }

    const weightedPool: GameEvent[] = [];
    for (const ev of pool) {
      const isSpecial =
        ev.category === 'CHAIN' ||
        (ev.conditions?.flags && ev.conditions.flags.length > 0);
      const weight = isSpecial ? 2 : 1;
      for (let i = 0; i < weight; i++) weightedPool.push(ev);
    }

    const chosen = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    this.usedEventIds.add(chosen.id);
    if (WEIRD_CATEGORIES.has(chosen.category)) {
      this.lastWeirdAge = state.age;
    }
    return chosen;
  }

  private filterEvents(state: GameState, minAllowedAge: number, maxAllowedAge: number): GameEvent[] {
    const currentTier = getJobTier(state.job, state);
    const currentTierRank = TIER_ORDER[currentTier] ?? 0;
    const isUnemployed = currentTier === 'UNEMPLOYED' || currentTier === 'JOKE';

    return ALL_EVENTS.filter(e => {
      if (this.usedEventIds.has(e.id)) return false;

      if (e.minAge > maxAllowedAge || e.maxAge < minAllowedAge) return false;

      if (e.conditions) {
        if (e.conditions.flags && e.conditions.flags.length > 0) {
          const hasAllFlags = e.conditions.flags.every(f => state.flags.includes(f));
          if (!hasAllFlags) return false;
        }

        if (e.conditions.minStress !== undefined && state.stress < e.conditions.minStress) {
          return false;
        }

        if (e.conditions.minMoney !== undefined && state.money < e.conditions.minMoney) {
          return false;
        }

        // Strict career ladder gating
        if (e.conditions.requiresUnemployed && !isUnemployed) {
          return false;
        }

        if (e.conditions.requiresEmployed && isUnemployed) {
          return false;
        }

        if (e.conditions.minJobTier) {
          const requiredRank = TIER_ORDER[e.conditions.minJobTier] ?? 0;
          if (currentTierRank < requiredRank) {
            return false;
          }
        }
      }

      return true;
    });
  }
}

export const eventEngine = new EventEngine();
