import { GameEvent, GameState } from '../types/game';
import { ALL_EVENTS, getProceduralFallbackEvent } from './events';

export class EventEngine {
  private usedEventIds: Set<string> = new Set();

  public reset() {
    this.usedEventIds.clear();
  }

  public removeUsedEvent(id: string) {
    this.usedEventIds.delete(id);
  }

  public restoreEventsForHistory(remainingHistory: { event?: GameEvent }[]) {
    this.usedEventIds.clear();
    remainingHistory.forEach(h => {
      if (h.event && h.event.id) {
        this.usedEventIds.add(h.event.id);
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

    const weightedPool: GameEvent[] = [];
    for (const ev of candidateEvents) {
      const isChainOrRequiresFlags = 
        ev.category === 'CHAIN' || 
        (ev.conditions?.flags && ev.conditions.flags.length > 0);

      const weight = isChainOrRequiresFlags ? 3 : 1;
      for (let i = 0; i < weight; i++) {
        weightedPool.push(ev);
      }
    }

    const chosen = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    this.usedEventIds.add(chosen.id);
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
