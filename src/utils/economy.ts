import { GameState, LocalizedString } from '../types/game';

export type JobTier = 'UNEMPLOYED' | 'ENTRY' | 'CORPORATE' | 'SENIOR' | 'EXECUTIVE' | 'RETIRED' | 'JOKE';

export interface JobSalaryResult {
  salary: number;
  tier: JobTier;
  tierLabel: LocalizedString;
  salaryFormatted: string;
}

/**
 * Calculates net annual savings & job salary inflow when Age advances by +1.
 *
 * Strict tiers (realistic, lower inflation):
 * - Unemployed / Student / Joke jobs: +$0
 * - Entry / Junior / Seasonal: +$2,000 / year
 * - Corporate / Professional: +$5,000 / year
 * - Senior / Management: +$8,000 / year
 * - Executive / Founder (healthy): +$12,000 / year (capped)
 * - Retired (Pension): +$6,000 / year
 *
 * Joke identities (beach fisherman, cat king, silver knight, etc.) always $0.
 */
export function calculateJobSalary(job: LocalizedString, state: GameState): JobSalaryResult {
  const en = (job?.en || '').toLowerCase();
  const zh = job?.zh || '';

  // 0. Joke / lifestyle identities — always $0
  if (
    en.includes('beach') ||
    en.includes('fisherman') ||
    en.includes('cat') ||
    en.includes('knight') ||
    en.includes('honorary') ||
    en.includes('silver') ||
    en.includes('pigeon') ||
    en.includes('hobby') ||
    en.includes('full-time side hustler') ||
    zh.includes('海灘') ||
    zh.includes('釣客') ||
    zh.includes('貓奴') ||
    zh.includes('銀髮騎士') ||
    zh.includes('榮譽') ||
    zh.includes('鴿子') ||
    zh.includes('興趣')
  ) {
    return {
      salary: 0,
      tier: 'JOKE',
      tierLabel: { en: 'Lifestyle ($0/yr)', zh: '生活興趣 ($0/年)' },
      salaryFormatted: '$0'
    };
  }

  // 1. Unemployed / Student / Non-working
  if (
    !en ||
    en.includes('unemployed') ||
    en.includes('student') ||
    en.includes('undergraduate') ||
    en.includes('gap-year') ||
    en.includes('patient in room') ||
    en.includes('ex-founder (bankrupt)') ||
    en.includes('wanderer') ||
    zh.includes('無業') ||
    zh.includes('未就業') ||
    zh.includes('學生') ||
    zh.includes('大學生') ||
    zh.includes('流浪者') ||
    zh.includes('破產') ||
    zh.includes('404 病房')
  ) {
    return {
      salary: 0,
      tier: 'UNEMPLOYED',
      tierLabel: { en: 'Unemployed ($0/yr)', zh: '無業待機 ($0/年)' },
      salaryFormatted: '$0'
    };
  }

  // 2. Founder / Executive
  if (
    en.includes('ceo') ||
    en.includes('founder') ||
    en.includes('creator') ||
    en.includes('executive') ||
    en.includes('general') ||
    zh.includes('創辦人') ||
    zh.includes('創始人') ||
    zh.includes('執行長') ||
    zh.includes('高管') ||
    zh.includes('造物主') ||
    zh.includes('將軍')
  ) {
    if (state.flags.includes('vac_debt') || state.money < -10000) {
      return {
        salary: 4000,
        tier: 'EXECUTIVE',
        tierLabel: { en: 'Struggling Founder', zh: '負債初創者' },
        salaryFormatted: '+$4,000'
      };
    }
    const performanceBonus = Math.min(8000, Math.floor((state.fame || 0) * 80) + (state.money > 80000 ? 4000 : 0));
    const totalExec = 12000 + performanceBonus;
    return {
      salary: totalExec,
      tier: 'EXECUTIVE',
      tierLabel: { en: 'Founder / Executive', zh: '創始人 / 高階主管' },
      salaryFormatted: '+$' + totalExec.toLocaleString()
    };
  }

  // 3. Senior / Management / Director
  if (
    en.includes('senior') ||
    en.includes('strategy lead') ||
    en.includes('lead') ||
    en.includes('director') ||
    en.includes('principal') ||
    en.includes('head of') ||
    en.includes('vp') ||
    en.includes('architect') ||
    zh.includes('資深') ||
    zh.includes('主管') ||
    zh.includes('總監') ||
    zh.includes('策略主管') ||
    zh.includes('架構師') ||
    zh.includes('特聘') ||
    zh.includes('高級經理')
  ) {
    return {
      salary: 8000,
      tier: 'SENIOR',
      tierLabel: { en: 'Senior / Management', zh: '資深管理職' },
      salaryFormatted: '+$8,000'
    };
  }

  // 4. Entry-Level / Junior / Seasonal / Intern
  if (
    en.includes('mascot') ||
    en.includes('lifeguard') ||
    en.includes('intern') ||
    en.includes('data entry') ||
    en.includes('food truck') ||
    en.includes('victim') ||
    en.includes('seasonal') ||
    en.includes('contract') ||
    en.includes('clerk') ||
    en.includes('assistant') ||
    en.includes('barista') ||
    en.includes('courier') ||
    en.includes('junior') ||
    en.includes('entry') ||
    zh.includes('吉祥物') ||
    zh.includes('救生員') ||
    zh.includes('實習') ||
    zh.includes('錄入員') ||
    zh.includes('餐車') ||
    zh.includes('初級') ||
    zh.includes('店員') ||
    zh.includes('季節工') ||
    zh.includes('助理')
  ) {
    return {
      salary: 2000,
      tier: 'ENTRY',
      tierLabel: { en: 'Entry / Junior', zh: '基層 / 初級' },
      salaryFormatted: '+$2,000'
    };
  }

  // 5. Retired
  if (en.includes('retired') || zh.includes('退休')) {
    return {
      salary: 6000,
      tier: 'RETIRED',
      tierLabel: { en: 'Pension', zh: '退休年金' },
      salaryFormatted: '+$6,000'
    };
  }

  // 6. Corporate / Professional (default)
  return {
    salary: 5000,
    tier: 'CORPORATE',
    tierLabel: { en: 'Corporate / Professional', zh: '企業正職' },
    salaryFormatted: '+$5,000'
  };
}

/** Helper used by event engine for strict career gating */
export function getJobTier(job: LocalizedString, state: GameState): JobTier {
  return calculateJobSalary(job, state).tier;
}
