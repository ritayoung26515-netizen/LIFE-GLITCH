import type { Language, LocalizedString } from '../types/game';

/** Chinese UI check */
export function isChinese(lang: Language): boolean {
  return lang === 'zh';
}

/**
 * Resolve localized text.
 * - en → English
 * - zh → Chinese
 */
export function loc(
  s: LocalizedString | { en: string; zh: string; zhCN?: string } | undefined | null,
  lang: Language
): string {
  if (!s) return '';
  if (lang === 'en') return s.en ?? '';
  return s.zh ?? '';
}

/** Cycle: EN → 繁 → EN */
export function nextLanguage(lang: Language): Language {
  return lang === 'en' ? 'zh' : 'en';
}

/** Button label shown on the language toggle */
export function languageButtonLabel(lang: Language): string {
  return lang === 'en' ? '繁' : 'EN';
}

/** Short code for current language (shown as secondary hint) */
export function languageCode(lang: Language): string {
  return lang === 'en' ? 'EN' : '繁';
}

