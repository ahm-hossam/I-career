import type en from './dictionaries/en';

export type Dictionary = typeof en;
export type Locale = 'en' | 'ar';

export const LOCALES: Locale[] = ['en', 'ar'];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE_KEY = 'icareer-locale';

export function dirOf(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'en' || value === 'ar';
}
