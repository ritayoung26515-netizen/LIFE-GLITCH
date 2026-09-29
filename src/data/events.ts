import { GameEvent } from '../types/game';
import part1 from './eventsPart1.json';
import part2 from './eventsPart2.json';
import part3 from './eventsPart3.json';
import part4 from './eventsPart4.json';

// Consolidate all 177 events from revised database
export const ALL_EVENTS: GameEvent[] = [
  ...(part1 as unknown as GameEvent[]),
  ...(part2 as unknown as GameEvent[]),
  ...(part3 as unknown as GameEvent[]),
  ...(part4 as unknown as GameEvent[])
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
        zh: '熱浪突襲這座城市。你的冷氣發出如暴怒噴射機般的噪音，並吐出溫熱的灰塵。'
      },
      choices: [
        {
          text: {
            en: 'Call emergency repairs for $450.',
            zh: '花 450 美金叫緊急維修。'
          },
          effects: { money: -450, health: 3, happiness: 5, stress: -8 }
        },
        {
          text: {
            en: 'Hug a frozen bag of peas and endure.',
            zh: '抱著一包冷凍豌豆硬撐。'
          },
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
        en: 'A surprise tax rebate check of $1,200 arrives in your mailbox. Your inner demon whispers about speculative memecoins.',
        zh: '一封裝有 1,200 美金意外退稅支票的信件寄達。你心中的小惡魔開始低語關於投機迷因幣的事。'
      },
      choices: [
        {
          text: {
            en: 'Gamble it on high-volatility tokens.',
            zh: '拿去高波動代幣全押賭一把。'
          },
          effects: { money: 2500, health: 0, happiness: 10, stress: 12, fame: 2 }
        },
        {
          text: {
            en: 'Deposit into a sensible emergency savings fund.',
            zh: '存入理智的緊急備用金帳戶。'
          },
          effects: { money: 1200, health: 0, happiness: 4, stress: -6, fame: 0 }
        }
      ]
    },
    {
      id: `gen_routine_${currentAge}_3`,
      category: 'SOCIAL',
      minAge: 18,
      maxAge: 100,
      text: {
        en: 'A childhood friend texts you out of nowhere asking for your thoughts on consciousness and a loan of $50.',
        zh: '兒時玩伴突然傳訊息給你，探討意識的本質，順便向你借 50 美金。'
      },
      choices: [
        {
          text: {
            en: 'Send the $50 and philosophize until 2 AM.',
            zh: '轉帳 50 美金並徹夜哲學長談至凌晨兩點。'
          },
          effects: { money: -50, health: -2, happiness: 8, stress: -3, fame: 0 }
        },
        {
          text: {
            en: 'Leave on "Read". Your energy is precious.',
            zh: '已讀不回。你的精力很寶貴。'
          },
          effects: { money: 0, health: 0, happiness: -2, stress: 0, fame: 0 }
        }
      ]
    }
  ];

  const pick = genericEvents[Math.floor(Math.random() * genericEvents.length)];
  return {
    ...pick,
    id: `${pick.id}_${Date.now()}`
  };
}
