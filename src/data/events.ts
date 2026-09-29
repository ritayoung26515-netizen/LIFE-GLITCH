import { GameEvent } from '../types/game';
import chunk1 from './eventsChunk1.json';
import chunk2 from './eventsChunk2.json';
import chunk3 from './eventsChunk3.json';
import chunk4 from './eventsChunk4.json';
import chunk5 from './eventsChunk5.json';
import chunk6 from './eventsChunk6.json';
import chunk7 from './eventsChunk7.json';
import chunk8 from './eventsChunk8.json';

// Consolidate all 227 events from final database
export const ALL_EVENTS: GameEvent[] = [
  ...(chunk1 as unknown as GameEvent[]),
  ...(chunk2 as unknown as GameEvent[]),
  ...(chunk3 as unknown as GameEvent[]),
  ...(chunk4 as unknown as GameEvent[]),
  ...(chunk5 as unknown as GameEvent[]),
  ...(chunk6 as unknown as GameEvent[]),
  ...(chunk7 as unknown as GameEvent[]),
  ...(chunk8 as unknown as GameEvent[])
];

export function getProceduralFallbackEvent(currentAge: number): GameEvent {
  const genericEvents: GameEvent[] = [
    {
      id: `gen_routine_${currentAge}_1`,
      category: 'HEALTH',
      minAge: 18,
      maxAge: 100,
      text: {
        en: 'A sudden heatwave hits the city. Your air conditioner sounds like an angry jet engine and breathes lukewarm dust.',
        zh: '热浪突袭这座城市。你的空调发出愤怒喷气机般的噪音，吐出温热的灰尘。'
      },
      choices: [
        {
          text: { en: 'Call emergency repairs for $450.', zh: '花 450 美元叫紧急维修。' },
          effects: { money: -450, health: 3, happiness: 5, stress: -8 }
        },
        {
          text: { en: 'Hug a frozen bag of peas and endure.', zh: '抱着一袋冷冻豌豆硬撑。' },
          effects: { money: 0, health: -4, happiness: -5, stress: 10 }
        }
      ]
    },
    {
      id: `gen_routine_${currentAge}_2`,
      category: 'MONEY',
      minAge: 18,
      maxAge: 100,
      text: {
        en: 'A surprise tax rebate check of $1,200 arrives in your mailbox.',
        zh: '一封装有 1,200 美元退税支票的信寄到了。'
      },
      choices: [
        {
          text: { en: 'Gamble it on high-volatility tokens.', zh: '拿去高波动代币全押。' },
          effects: { money: 2500, happiness: 10, stress: 12, fame: 2 }
        },
        {
          text: { en: 'Deposit into emergency savings.', zh: '存入紧急备用金。' },
          effects: { money: 1200, happiness: 4, stress: -6 }
        }
      ]
    },
    {
      id: `gen_routine_${currentAge}_3`,
      category: 'SOCIAL',
      minAge: 18,
      maxAge: 100,
      text: {
        en: 'A childhood friend texts asking for thoughts on consciousness and a $50 loan.',
        zh: '儿时玩伴突然发消息，探讨意识本质，顺便借 50 美元。'
      },
      choices: [
        {
          text: { en: 'Lend the money and open a philosophical can of worms.', zh: '借钱，并打开哲学话题的潘多拉盒。' },
          effects: { money: -50, happiness: 6, stress: 2 }
        },
        {
          text: { en: 'Reply with a vague emoji and pretend offline.', zh: '回一个模糊表情，假装离线。' },
          effects: { happiness: -2, stress: -3 }
        }
      ]
    }
  ];
  return genericEvents[currentAge % genericEvents.length];
}
