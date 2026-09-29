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
    // 1. Filter events strictly matching current age and conditions
    let candidateEvents = this.filterEvents(state, state.age, state.age);

    // 2. Safety Fallback: Expand age criteria by ±3 years if no valid event matches
    if (candidateEvents.length === 0) {
      candidateEvents = this.filterEvents(state, state.age - 3, state.age + 3);
    }

    // 3. Further safety fallback: Expand to ±8 years
    if (candidateEvents.length === 0) {
      candidateEvents = this.filterEvents(state, state.age - 8, state.age + 8);
    }

    // 4. Procedural fallback to ensure never freezing the UI
    if (candidateEvents.length === 0) {
      return getProceduralFallbackEvent(state.age);
    }

    // Weighted selection:
    // If an event is a Chain Event or requires specific flags, give it 3x priority weight
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
      // Non-repeat rule: Each unique event can only trigger ONCE per life
      if (this.usedEventIds.has(e.id)) return false;

      // Check age bounds
      if (e.minAge > maxAllowedAge || e.maxAge < minAllowedAge) return false;

      // Check conditions
      if (e.conditions) {
        // Flags check
        if (e.conditions.flags && e.conditions.flags.length > 0) {
          const hasAllFlags = e.conditions.flags.every(f => state.flags.includes(f));
          if (!hasAllFlags) return false;
        }

        // Stress check
        if (e.conditions.minStress !== undefined && state.stress < e.conditions.minStress) {
          return false;
        }

        // Money check
        if (e.conditions.minMoney !== undefined && state.money < e.conditions.minMoney) {
          return false;
        }
      }

      return true;
    });
  }
}

export const eventEngine = new EventEngine();
