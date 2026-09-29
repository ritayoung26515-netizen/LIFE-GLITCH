import { GameEvent, GameState } from '../types/game';
import { ALL_EVENTS, getProceduralFallbackEvent } from './events';

const WEIRD_CATEGORIES = new Set(['WEIRD', 'CHAIN']);

export class EventEngine {
  private usedEventIds: Set<string> = new Set();
  /** Ages at which a weird/chain event last fired — enforces 2–3 year grounded cooldown */
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

    // Weird cooldown: for 2–3 years after a WEIRD/CHAIN, force grounded events only
    const inWeirdCooldown =
      this.lastWeirdAge !== null &&
      state.age - this.lastWeirdAge <= 2;

    const grounded = candidateEvents.filter(e => !WEIRD_CATEGORIES.has(e.category));
    const weird = candidateEvents.filter(e => WEIRD_CATEGORIES.has(e.category));

    let pool: GameEvent[] = [];

    if (inWeirdCooldown && grounded.length > 0) {
      pool = grounded;
    } else {
      // 70% grounded / 30% weird preference when both available
      const roll = Math.random();
      if (roll < 0.7 && grounded.length > 0) {
        pool = grounded;
      } else if (weird.length > 0) {
        pool = weird;
      } else {
        pool = grounded.length > 0 ? grounded : candidateEvents;
      }
    }

    // Slight weight boost for CHAIN / flag-gated events inside the chosen pool
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
      }

      return true;
    });
  }
}

export const eventEngine = new EventEngine();
