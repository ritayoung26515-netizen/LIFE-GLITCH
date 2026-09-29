import { GameEvent } from '../types/game';
import allEvents from './eventsAll.json';

/** Full event database (227 events) — replace eventsAll.json to update content */
export const ALL_EVENTS: GameEvent[] = allEvents as unknown as GameEvent[];

export function getProceduralFallbackEvent(currentAge: number): GameEvent {
  return {
    id: `gen_routine_${currentAge}`,
    category: 'HEALTH',
    minAge: 18,
    maxAge: 100,
    text: {
      en: 'A quiet year passes. Nothing remarkable happens, which is itself remarkable.',
      zh: '平淡的一年过去了。什么大事都没发生，这本身就很了不起。'
    },
    choices: [
      {
        text: { en: 'Embrace the ordinary.', zh: '拥抱平淡。' },
        effects: { happiness: 3, stress: -3 }
      },
      {
        text: { en: 'Force a mid-year crisis for content.', zh: '硬给自己制造年中危机。' },
        effects: { happiness: -2, stress: 5, fame: 1 }
      }
    ]
  };
}
