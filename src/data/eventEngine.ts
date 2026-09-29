import { GameEvent, GameState } from '../types/game';
import { ALL_EVENTS, getProceduralFallbackEvent } from './events';

export class EventEngine {
  private usedEventIds: Set<string> = new Set();
  private weirdCooldownTurns: number = 0;

  public reset() {
    this.usedEventIds.clear();
    this.weirdCooldownTurns = 0;
  }

  public removeUsedEvent(id: string) {
    this.usedEventIds.delete(id);
  }

  public restoreEventsForHistory(remainingHistory: { event?: GameEvent }[]) {
    this.usedEventIds.clear();
    this.weirdCooldownTurns = 0;
    remainingHistory.forEach(h => {
      if (h.event && h.event.id) {
        this.usedEventIds.add(h.event.id);
      }
    });

    // Check if any recent event was weird to restore cooldown
    for (let i = remainingHistory.length - 1; i >= 0; i--) {
      const ev = remainingHistory[i]?.event;
      if (ev && this.isWeirdOrChainEvent(ev)) {
        const turnsAgo = (remainingHistory.length - 1) - i;
        if (turnsAgo < 2) {
          this.weirdCooldownTurns = 2 - turnsAgo;
        }
        break;
      }
    }
  }

  public isWeirdOrChainEvent(ev: GameEvent): boolean {
    return (
      ev.category === 'WEIRD' ||
      ev.category === 'CHAIN' ||
      ev.category === 'SECRET' ||
      ev.id.startsWith('flag_') ||
      ev.id.startsWith('fun_')
    );
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

    const groundedCandidates = candidateEvents.filter(e => !this.isWeirdOrChainEvent(e));
    const weirdCandidates = candidateEvents.filter(e => this.isWeirdOrChainEvent(e));

    let chosen: GameEvent;

    // Requirement 3: Event Pacing (70% Grounded Life / 30% Weird) & Weird Cooldown:
    // If weird cooldown is active, enforce picking from grounded candidates for the next 2-3 years
    if (this.weirdCooldownTurns > 0) {
      if (groundedCandidates.length > 0) {
        chosen = this.pickWeighted(groundedCandidates);
      } else {
        chosen = this.pickWeighted(candidateEvents);
      }
      this.weirdCooldownTurns--;
    } else {
      // 70% Grounded Life (career, rent, dating, health) / 30% Weird
      const roll = Math.random();
      if (roll < 0.70) {
        if (groundedCandidates.length > 0) {
          chosen = this.pickWeighted(groundedCandidates);
        } else {
          chosen = this.pickWeighted(weirdCandidates.length > 0 ? weirdCandidates : candidateEvents);
        }
      } else {
        if (weirdCandidates.length > 0) {
          chosen = this.pickWeighted(weirdCandidates);
        } else {
          chosen = this.pickWeighted(groundedCandidates.length > 0 ? groundedCandidates : candidateEvents);
        }
      }

      // If a WEIRD / CHAIN / SECRET / fun event was chosen, activate 2-3 years cooldown
      if (this.isWeirdOrChainEvent(chosen)) {
        this.weirdCooldownTurns = Math.random() < 0.5 ? 2 : 3;
      }
    }

    this.usedEventIds.add(chosen.id);
    return chosen;
  }

  private pickWeighted(events: GameEvent[]): GameEvent {
    if (events.length === 1) return events[0];

    const weightedPool: GameEvent[] = [];
    for (const ev of events) {
      const isChainOrRequiresFlags = 
        ev.category === 'CHAIN' || 
        (ev.conditions?.flags && ev.conditions.flags.length > 0);

      const weight = isChainOrRequiresFlags ? 2 : 1;
      for (let i = 0; i < weight; i++) {
        weightedPool.push(ev);
      }
    }

    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
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
