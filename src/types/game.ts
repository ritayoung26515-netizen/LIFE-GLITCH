export type Language = 'en' | 'zh';
export type Theme = 'light' | 'dark';

export type EventCategory = 
  | 'WORK' 
  | 'SOCIAL' 
  | 'MONEY' 
  | 'LOVE' 
  | 'HEALTH' 
  | 'WEIRD' 
  | 'CHAIN';

export interface LocalizedString {
  en: string;
  zh: string;
}

export interface EventConditions {
  flags?: string[];
  minMoney?: number;
  minStress?: number;
  /** Player must be unemployed / student / joke job */
  requiresUnemployed?: boolean;
  /** Player must NOT be unemployed / joke job */
  requiresEmployed?: boolean;
  /** Minimum job tier (ENTRY < CORPORATE < SENIOR < EXECUTIVE) */
  minJobTier?: 'ENTRY' | 'CORPORATE' | 'SENIOR' | 'EXECUTIVE';
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

export interface TurnDelta {
  label: LocalizedString;
  value: string;
  positive: boolean;
}

export interface TurnFeedback {
  choiceText: LocalizedString;
  deltas: TurnDelta[];
}

export interface PastRun {
  id?: string;
  age: number;
  money: number;
  health?: number;
  happiness?: number;
  stress?: number;
  fame?: number;
  job: LocalizedString;
  epitaph: LocalizedString;
  deathReason: LocalizedString;
  date: string;
  flags?: string[];
  history?: LifeLogEntry[];
  timeline?: LifeLogEntry[];
}
