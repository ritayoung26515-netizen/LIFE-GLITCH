import { GameState, LocalizedString } from '../types/game';

export type JobTier = 'UNEMPLOYED' | 'ENTRY' | 'CORPORATE' | 'SENIOR' | 'EXECUTIVE' | 'RETIRED';

export interface JobSalaryResult {
  salary: number;
  tier: JobTier;
  tierLabel: LocalizedString;
  salaryFormatted: string;
}

/**
 * Calculates net annual savings & job salary inflow when Age advances by +1.
 *
 * Requirements:
 * - Unemployed / Student: +$0
 * - Entry-Level / Seasonal (e.g. Mascot, Data Entry, Intern): +$4,000 / year
 * - Corporate / Professional (e.g. Bank Clerk, Sales Manager): +$12,000 / year
 * - Senior / Management (e.g. Senior Manager, Strategy Lead): +$25,000 / year
 * - Founder / Executive (e.g. Startup CEO): Variable based on performance
 * - Retired (Pension): +$9,000 / year
 */
export function calculateJobSalary(job: LocalizedString, state: GameState): JobSalaryResult {
  const en = (job?.en || '').toLowerCase();
  const zh = job?.zh || '';

  // 1. Unemployed / Student / Non-working
  if (
    !en ||
    en.includes('unemployed') ||
    en.includes('student') ||
    en.includes('undergraduate') ||
    en.includes('gap-year') ||
    en.includes('patient in room') ||
    en.includes('ex-founder (bankrupt)') ||
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

  // 2. Founder / Executive: Variable based on performance & fame
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
      // Distressed founder working through debts
      return {
        salary: 8000,
        tier: 'EXECUTIVE',
        tierLabel: { en: 'Struggling Founder', zh: '負債初創者' },
        salaryFormatted: '+$8,000'
      };
    }
    // High performance if player has established fame or positive wealth
    const performanceBonus = Math.min(25000, Math.floor((state.fame || 0) * 250) + (state.money > 50000 ? 10000 : 0));
    const totalExec = 35000 + performanceBonus;
    return {
      salary: totalExec,
      tier: 'EXECUTIVE',
      tierLabel: { en: 'Founder / Executive', zh: '創始人 / 高階主管' },
      salaryFormatted: `+$${totalExec.toLocaleString()}`
    };
  }

  // 3. Senior / Management
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
      salary: 25000,
      tier: 'SENIOR',
      tierLabel: { en: 'Senior / Management', zh: '資深管理職' },
      salaryFormatted: '+$25,000'
    };
  }

  // 4. Entry-Level / Seasonal
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
      salary: 4000,
      tier: 'ENTRY',
      tierLabel: { en: 'Entry / Seasonal', zh: '基層 / 季節工' },
      salaryFormatted: '+$4,000'
    };
  }

  // 5. Retired (Pension)
  if (en.includes('retired') || zh.includes('退休')) {
    return {
      salary: 9000,
      tier: 'RETIRED',
      tierLabel: { en: 'Pension', zh: '退休年金' },
      salaryFormatted: '+$9,000'
    };
  }

  // 6. Corporate / Professional (Default standard job)
  return {
    salary: 12000,
    tier: 'CORPORATE',
    tierLabel: { en: 'Corporate / Professional', zh: '企業正職專業' },
    salaryFormatted: '+$12,000'
  };
}
