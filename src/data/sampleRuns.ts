import { PastRun, LifeLogEntry, GameEvent, EventChoice, SavedStateSnapshot } from '../types/game';
import { ALL_EVENTS } from './events';
import { getTraitLabel } from '../utils/traits';

function getEventById(id: string): GameEvent | undefined {
  return ALL_EVENTS.find(e => e.id === id);
}

function getEventForAge(age: number, usedIds: Set<string>): GameEvent {
  // First attempt: match age range and unused
  const unusedMatch = ALL_EVENTS.find(
    e => e.minAge <= age && e.maxAge >= age && !usedIds.has(e.id)
  );
  if (unusedMatch) {
    usedIds.add(unusedMatch.id);
    return unusedMatch;
  }

  // Second attempt: any match within age range
  const anyMatch = ALL_EVENTS.find(e => e.minAge <= age && e.maxAge >= age);
  if (anyMatch) {
    return anyMatch;
  }

  // Fallback to cycling through the database
  return ALL_EVENTS[age % ALL_EVENTS.length];
}

function formatEffectsSummary(choice: EventChoice): { en: string; zh: string } {
  const partsEn: string[] = [];
  const partsZh: string[] = [];
  const eff = choice.effects;

  if (eff.money) {
    const s = eff.money > 0 ? `+$${eff.money.toLocaleString()}` : `-$${Math.abs(eff.money).toLocaleString()}`;
    partsEn.push(`${s} Money`);
    partsZh.push(`${s} 資產`);
  }
  if (eff.health) {
    const s = eff.health > 0 ? `+${eff.health}%` : `${eff.health}%`;
    partsEn.push(`${s} Health`);
    partsZh.push(`${s} 健康`);
  }
  if (eff.happiness) {
    const s = eff.happiness > 0 ? `+${eff.happiness}%` : `${eff.happiness}%`;
    partsEn.push(`${s} Joy`);
    partsZh.push(`${s} 快樂`);
  }
  if (eff.stress) {
    const s = eff.stress > 0 ? `+${eff.stress}%` : `${eff.stress}%`;
    partsEn.push(`${s} Stress`);
    partsZh.push(`${s} 壓力`);
  }
  if (eff.fame) {
    const s = eff.fame > 0 ? `+${eff.fame}%` : `${eff.fame}%`;
    partsEn.push(`${s} Fame`);
    partsZh.push(`${s} 聲望`);
  }
  if (eff.addFlags && eff.addFlags.length > 0) {
    const enFlags = eff.addFlags.map(f => getTraitLabel(f, 'en')).join(', ');
    const zhFlags = eff.addFlags.map(f => getTraitLabel(f, 'zh')).join(', ');
    partsEn.push(`[${enFlags}]`);
    partsZh.push(`[${zhFlags}]`);
  }

  return {
    en: partsEn.length > 0 ? partsEn.join(' · ') : 'Standard year of life',
    zh: partsZh.length > 0 ? partsZh.join(' · ') : '平穩度過的一年'
  };
}

function createSnapshotForAge(
  age: number,
  run: PastRun,
  accumulatedFlags: string[]
): SavedStateSnapshot {
  const minAge = 18;
  const maxAge = Math.max(18, run.age);
  const ratio = maxAge === minAge ? 0 : Math.min(1, Math.max(0, (age - minAge) / (maxAge - minAge)));

  const money = Math.round(1000 + (run.money - 1000) * ratio);
  const targetHealth = run.health ?? 75;
  const health = Math.round(80 + (targetHealth - 80) * ratio);
  const targetHappiness = run.happiness ?? 65;
  const happiness = Math.round(60 + (targetHappiness - 60) * ratio);
  const targetStress = run.stress ?? 30;
  const stress = Math.round(20 + (targetStress - 20) * ratio);
  const targetFame = run.fame ?? 20;
  const fame = Math.round(0 + (targetFame - 0) * ratio);

  return {
    age,
    money: Math.max(0, money),
    health: Math.max(5, Math.min(100, health)),
    happiness: Math.max(5, Math.min(100, happiness)),
    stress: Math.max(0, Math.min(95, stress)),
    fame: Math.max(0, fame),
    job: ratio > 0.5 ? run.job : { en: 'Junior Worker', zh: '基層職員' },
    relationship: ratio > 0.35 ? { en: 'In a Relationship', zh: '穩定交往中' } : { en: 'Single', zh: '單身' },
    flags: [...accumulatedFlags],
    peakMoney: Math.max(1000, money),
    decisionsCount: Math.max(0, age - minAge)
  };
}

const e18 = getEventById('norm_first_job') || ALL_EVENTS[0];
const e22 = getEventById('norm_car_loan') || ALL_EVENTS[1];
const e26 = getEventById('norm_weekend_overtime') || ALL_EVENTS[2];
const e30 = getEventById('life_startup_gamble') || ALL_EVENTS[3];

const RAW_DEFAULT_PAST_RUNS: PastRun[] = [
  {
    id: 'run_meme_informant',
    age: 34,
    money: 42500,
    health: 0,
    happiness: 72,
    stress: 100,
    fame: 58,
    job: { en: 'Crypto Shitposter', zh: '加密貨幣迷因操盤手' },
    epitaph: { en: 'The Meme Informant', zh: '迷因爆料專家' },
    deathReason: {
      en: 'Fatal cardiac surge from 96-hour non-stop memecoin trading session.',
      zh: '因連續 96 小時盯盤炒作迷因幣導致心律過載離世。'
    },
    date: '2026/09/27',
    flags: ['startup_alumni', 'night_owl', 'viral_hit', 'meme_lord'],
    history: [
      {
        age: 18,
        eventText: e18.text,
        choiceText: e18.choices[1].text,
        effectsSummary: {
          en: '+$3,000 Money · -5% Health · +10% Joy · +8% Stress · [startup_alumni]',
          zh: '+$3,000 資產 · -5% 健康 · +10% 快樂 · +8% 壓力 · [新創校友]'
        },
        event: e18,
        snapshot: {
          age: 18,
          money: 1000,
          health: 80,
          happiness: 60,
          stress: 20,
          fame: 0,
          job: { en: 'Unemployed', zh: '無業遊民' },
          relationship: { en: 'Single', zh: '單身' },
          flags: [],
          peakMoney: 1000,
          decisionsCount: 0
        }
      },
      {
        age: 22,
        eventText: e22.text,
        choiceText: e22.choices[0].text,
        effectsSummary: {
          en: '-$12,000 Money · +8% Joy · +15% Stress',
          zh: '-$12,000 資產 · +8% 快樂 · +15% 壓力'
        },
        event: e22,
        snapshot: {
          age: 22,
          money: 15000,
          health: 75,
          happiness: 68,
          stress: 35,
          fame: 10,
          job: { en: 'Startup Specialist', zh: '新創專員' },
          relationship: { en: 'Single', zh: '單身' },
          flags: ['startup_alumni'],
          peakMoney: 15000,
          decisionsCount: 4
        }
      },
      {
        age: 26,
        eventText: e26.text,
        choiceText: e26.choices[1].text,
        effectsSummary: {
          en: '+$0 Money · +5% Health · +12% Joy · -10% Stress · [night_owl]',
          zh: '+$0 資產 · +5% 健康 · +12% 快樂 · -10% 壓力 · [夜貓族]'
        },
        event: e26,
        snapshot: {
          age: 26,
          money: 22000,
          health: 70,
          happiness: 70,
          stress: 45,
          fame: 22,
          job: { en: 'Social Media Operative', zh: '社群作戰員' },
          relationship: { en: 'Single', zh: '單身' },
          flags: ['startup_alumni', 'night_owl'],
          peakMoney: 22000,
          decisionsCount: 8
        }
      },
      {
        age: 30,
        eventText: e30.text,
        choiceText: e30.choices[0].text,
        effectsSummary: {
          en: '+$45,000 Money · -15% Health · +18% Joy · +25% Stress · [viral_hit]',
          zh: '+$45,000 資產 · -15% 健康 · +18% 快樂 · +25% 壓力 · [迷因爆紅]'
        },
        event: e30,
        snapshot: {
          age: 30,
          money: 30000,
          health: 65,
          happiness: 65,
          stress: 60,
          fame: 38,
          job: { en: 'Crypto Shitposter', zh: '加密貨幣迷因操盤手' },
          relationship: { en: 'Single', zh: '單身' },
          flags: ['startup_alumni', 'night_owl', 'viral_hit'],
          peakMoney: 30000,
          decisionsCount: 12
        }
      }
    ]
  },
  {
    id: 'run_joyful_aristocrat',
    age: 64,
    money: 340000,
    health: 85,
    happiness: 92,
    stress: 15,
    fame: 45,
    job: { en: 'Leisure Consultant', zh: '悠閒生活顧問' },
    epitaph: { en: 'The Joyful Aristocrat', zh: '快活無憂貴族' },
    deathReason: {
      en: 'Choked on a rare vintage grape while laughing at a private yacht banquet.',
      zh: '在私人遊艇晚宴上品嚐罕見頂級葡萄大笑時意外嗆到，在無比歡樂中安詳離世。'
    },
    date: '2026/09/25',
    flags: ['wealthy_heir', 'zen_master', 'wine_enthusiast', 'peaceful_mind'],
    history: [
      {
        age: 18,
        eventText: e18.text,
        choiceText: e18.choices[0].text,
        effectsSummary: {
          en: '+$15,000 Money · -3% Health · -8% Joy · +12% Stress · [Bank Clerk]',
          zh: '+$15,000 資產 · -3% 健康 · -8% 快樂 · +12% 壓力 · [銀行行員]'
        },
        event: e18,
        snapshot: {
          age: 18,
          money: 1000,
          health: 80,
          happiness: 60,
          stress: 20,
          fame: 0,
          job: { en: 'Unemployed', zh: '無業遊民' },
          relationship: { en: 'Single', zh: '單身' },
          flags: [],
          peakMoney: 1000,
          decisionsCount: 0
        }
      },
      {
        age: 28,
        eventText: e22.text,
        choiceText: e22.choices[1].text,
        effectsSummary: {
          en: '-$3,500 Money · +6% Joy · -8% Stress · [zen_master]',
          zh: '-$3,500 資產 · +6% 快樂 · -8% 壓力 · [心態大師]'
        },
        event: e22,
        snapshot: {
          age: 28,
          money: 85000,
          health: 82,
          happiness: 78,
          stress: 25,
          fame: 15,
          job: { en: 'Senior Asset Auditor', zh: '資深資產審核員' },
          relationship: { en: 'Married', zh: '已婚' },
          flags: ['zen_master'],
          peakMoney: 85000,
          decisionsCount: 10
        }
      },
      {
        age: 45,
        eventText: e30.text,
        choiceText: e30.choices[1].text,
        effectsSummary: {
          en: '+$120,000 Money · +10% Health · +20% Joy · -25% Stress · [Leisure Consultant]',
          zh: '+$120,000 資產 · +10% 健康 · +20% 快樂 · -25% 壓力 · [悠閒顧問]'
        },
        event: e30,
        snapshot: {
          age: 45,
          money: 195000,
          health: 88,
          happiness: 85,
          stress: 18,
          fame: 32,
          job: { en: 'Leisure Consultant', zh: '悠閒生活顧問' },
          relationship: { en: 'Married', zh: '已婚' },
          flags: ['zen_master', 'wine_enthusiast'],
          peakMoney: 195000,
          decisionsCount: 22
        }
      }
    ]
  }
];

export function ensurePastRunHistory(run: PastRun): PastRun {
  const existingList: LifeLogEntry[] = 
    (run.timeline && run.timeline.length > 0)
      ? run.timeline
      : (run.history && run.history.length > 0)
        ? run.history
        : [];

  const existingByAge = new Map<number, LifeLogEntry>();
  existingList.forEach(entry => {
    if (typeof entry.age === 'number') {
      existingByAge.set(entry.age, entry);
    }
  });

  const usedEventIds = new Set<string>();
  existingList.forEach(e => {
    if (e.event?.id) usedEventIds.add(e.event.id);
  });

  const targetMaxAge = Math.max(18, run.age);
  const completeTimeline: LifeLogEntry[] = [];
  const accumulatedFlags: string[] = [...(run.flags ?? [])];

  for (let age = 18; age <= targetMaxAge; age++) {
    if (existingByAge.has(age)) {
      const entry = existingByAge.get(age)!;
      let event = entry.event;
      if (!event || !event.choices) {
        event = getEventForAge(age, usedEventIds);
      } else {
        usedEventIds.add(event.id);
      }

      let snapshot = entry.snapshot;
      if (!snapshot) {
        snapshot = createSnapshotForAge(age, run, accumulatedFlags);
      }

      const choiceText = entry.choiceText || (event.choices[0] ? event.choices[0].text : { en: 'Proceed', zh: '前進' });
      const effectsSummary = entry.effectsSummary || (event.choices[0] ? formatEffectsSummary(event.choices[0]) : { en: 'Standard year', zh: '平穩的一年' });

      completeTimeline.push({
        age,
        eventText: entry.eventText || event.text,
        choiceText,
        effectsSummary,
        event,
        snapshot
      });
    } else {
      const event = getEventForAge(age, usedEventIds);
      const choiceIndex = (age * 7) % event.choices.length;
      const choice = event.choices[choiceIndex] || event.choices[0];
      const snapshot = createSnapshotForAge(age, run, accumulatedFlags);
      const effectsSummary = formatEffectsSummary(choice);

      completeTimeline.push({
        age,
        eventText: event.text,
        choiceText: choice.text,
        effectsSummary,
        event,
        snapshot
      });
    }
  }

  // Ensure sorted ascending by age
  completeTimeline.sort((a, b) => a.age - b.age);

  return {
    ...run,
    history: completeTimeline,
    timeline: completeTimeline
  };
}

export const DEFAULT_PAST_RUNS: PastRun[] = RAW_DEFAULT_PAST_RUNS.map(ensurePastRunHistory);
