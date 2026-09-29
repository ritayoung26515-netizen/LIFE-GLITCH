/** en = English · zh = Traditional Chinese (繁) · zh-CN = Simplified Chinese (簡) */
export type Language = 'en' | 'zh' | 'zh-CN';

export type EventCategory = 
  | 'WORK' 
  | 'SOCIAL' 
  | 'MONEY' 
  | 'LOVE' 
  | 'HEALTH' 
  | 'WEIRD' 
  | 'CHAIN';

/**
 * Localized copy.
 * - en: English
 * - zh: Traditional Chinese (繁) — required
 * - zhCN: Simplified Chinese (簡) — optional; game falls back to zh if missing
 */
export interface LocalizedString {
  en: string;
  zh: string;
  zhCN?: string;
}

export interface EventConditions {
  flags?: string[];
  minMoney?: number;
  minStress?: number;
}

export interface ChoiceEffects {
  money?: number;
  health?: number;
  happiness?: number;
  stress?: number;
  fame?: number;
  addFlags?: string[];
  removeFlags?: string[];
  setJob?: LocalizedString;
  setRelationship?: LocalizedString;
}

export interface EventChoice {
  text: LocalizedString;
  effects: ChoiceEffects;
}

export interface GameEvent {
  id: string;
  category: EventCategory | string;
  minAge: number;
  maxAge: number;
  conditions?: EventConditions;
  text: LocalizedString;
  choices: [EventChoice, EventChoice];
}

export interface SavedStateSnapshot {
  age: number;
  money: number;
  health: number;
  happiness: number;
  stress: number;
  fame: number;
  job: LocalizedString;
  relationship: LocalizedString;
  flags: string[];
  peakMoney: number;
  decisionsCount: number;
}

export interface LifeLogEntry {
  age: number;
  eventText: LocalizedString;
  choiceText: LocalizedString;
  effectsSummary: {
    en: string;
    zh: string;
  };
  event?: GameEvent;
  snapshot?: SavedStateSnapshot;
}

export interface GameState {
  age: number;
  money: number;
  health: number;
  happiness: number;
  stress: number;
  fame: number;
  job: LocalizedString;
  relationship: LocalizedString;
  flags: string[];
  hasRevived: boolean;
  isAlive: boolean;
  deathReason: LocalizedString | null;
  history: LifeLogEntry[];
  peakMoney: number;
  decisionsCount: number;
}

export interface TurnFeedback {
  choiceText: LocalizedString;
  deltas: {
    label: LocalizedString;
    value: string;
    positive: boolean;
  }[];
}

export interface PastRun {
  id: string;
  age: number;
  money: number;
  health: number;
  happiness: number;
  stress: number;
  fame: number;
  job: LocalizedString;
  epitaph: LocalizedString;
  deathReason: LocalizedString;
  flags: string[];
  history: LifeLogEntry[];
  timeline?: LifeLogEntry[];
  date: string;
}
