export type Language = 'en' | 'zh';

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
  minMoney?: number;
  maxMoney?: number;
  minHealth?: number;
  maxHealth?: number;
  minHappiness?: number;
  maxHappiness?: number;
  minStress?: number;
  maxStress?: number;
  minFame?: number;
  maxFame?: number;
  requiredFlags?: string[];
  forbiddenFlags?: string[];
  requiredJob?: string[];
  requiredRelationship?: string[];
}

export interface EventEffects {
  money?: number;
  health?: number;
  happiness?: number;
  stress?: number;
  fame?: number;
  addFlags?: string[];
  removeFlags?: string[];
  setJob?: LocalizedString;
  setRelationship?: LocalizedString;
  nextEventId?: string;
}

export interface EventChoice {
  text: LocalizedString;
  effects: EventEffects;
}

export interface GameEvent {
  id: string;
  category: EventCategory;
  minAge: number;
  maxAge: number;
  text: LocalizedString;
  choices: EventChoice[];
  conditions?: EventConditions;
  weight?: number;
}

export interface StatDelta {
  label: LocalizedString;
  value: string;
  positive: boolean;
}

export interface TurnFeedback {
  choiceText: LocalizedString;
  deltas: StatDelta[];
}

export interface LifeLogEntry {
  age: number;
  eventText: LocalizedString;
  choiceText: LocalizedString;
  category: EventCategory;
  effectsSummary: LocalizedString;
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
  decisionsCount: number;
  lifeLog: LifeLogEntry[];
  hasRevived: boolean;
  deathReason: LocalizedString | null;
  isAlive: boolean;
  regretsUsed: number;
  maxRegrets: number;
  previousStateSnapshot: GameState | null;
  currentEvent: GameEvent | null;
}

export interface PastRun {
  id: string;
  age: number;
  money: number;
  epitaph: LocalizedString;
  date: string;
  deathReason?: LocalizedString;
  job?: LocalizedString;
  flags?: string[];
  lifeLog?: LifeLogEntry[];
}
