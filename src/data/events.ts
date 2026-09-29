import { GameEvent } from '../types/game';
import e01 from './e01.json';
import e02 from './e02.json';
import e03 from './e03.json';
import e04 from './e04.json';
import e05 from './e05.json';
import e06 from './e06.json';
import e07 from './e07.json';
import e08 from './e08.json';
import e09 from './e09.json';
import e10 from './e10.json';
import e11 from './e11.json';
import e12 from './e12.json';
import e13 from './e13.json';
import e14 from './e14.json';
import e15 from './e15.json';
import e16 from './e16.json';
import e17 from './e17.json';
import e18 from './e18.json';
import e19 from './e19.json';
import e20 from './e20.json';
import e21 from './e21.json';
import e22 from './e22.json';
import e23 from './e23.json';

export const ALL_EVENTS: GameEvent[] = [
  ...(e01 as unknown as GameEvent[]),
  ...(e02 as unknown as GameEvent[]),
  ...(e03 as unknown as GameEvent[]),
  ...(e04 as unknown as GameEvent[]),
  ...(e05 as unknown as GameEvent[]),
  ...(e06 as unknown as GameEvent[]),
  ...(e07 as unknown as GameEvent[]),
  ...(e08 as unknown as GameEvent[]),
  ...(e09 as unknown as GameEvent[]),
  ...(e10 as unknown as GameEvent[]),
  ...(e11 as unknown as GameEvent[]),
  ...(e12 as unknown as GameEvent[]),
  ...(e13 as unknown as GameEvent[]),
  ...(e14 as unknown as GameEvent[]),
  ...(e15 as unknown as GameEvent[]),
  ...(e16 as unknown as GameEvent[]),
  ...(e17 as unknown as GameEvent[]),
  ...(e18 as unknown as GameEvent[]),
  ...(e19 as unknown as GameEvent[]),
  ...(e20 as unknown as GameEvent[]),
  ...(e21 as unknown as GameEvent[]),
  ...(e22 as unknown as GameEvent[]),
  ...(e23 as unknown as GameEvent[])
];

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
