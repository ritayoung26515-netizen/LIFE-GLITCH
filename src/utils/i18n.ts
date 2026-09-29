import type { Language, LocalizedString } from '../types/game';

/** Traditional Chinese (繁) and Simplified Chinese (簡) both count as Chinese UI. */
export function isChinese(lang: Language): boolean {
  return lang === 'zh' || lang === 'zh-CN';
}

/**
 * Resolve localized text.
 * - en → English
 * - zh → Traditional Chinese (繁)
 * - zh-CN → Simplified Chinese (簡); falls back to Traditional if zhCN missing
 */
export function loc(
  s: LocalizedString | { en: string; zh: string; zhCN?: string } | undefined | null,
  lang: Language
): string {
  if (!s) return '';
  if (lang === 'en') return s.en ?? '';
  if (lang === 'zh-CN') return (s as LocalizedString).zhCN ?? s.zh ?? '';
  return s.zh ?? '';
}

/** Cycle: EN → 繁 → 簡 → EN */
export function nextLanguage(lang: Language): Language {
  if (lang === 'en') return 'zh';
  if (lang === 'zh') return 'zh-CN';
  return 'en';
}

/** Button label shown on the language toggle */
export function languageButtonLabel(lang: Language): string {
  if (lang === 'en') return '繁';
  if (lang === 'zh') return '簡';
  return 'EN';
}

/** Short code for current language (shown as secondary hint) */
export function languageCode(lang: Language): string {
  if (lang === 'en') return 'EN';
  if (lang === 'zh') return '繁';
  return '簡';
}
