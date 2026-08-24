import en from './dictionaries/en';
import ar from './dictionaries/ar';
import type { Dictionary, Locale } from './types';

export const dictionaries: Record<Locale, Dictionary> = { en, ar };

function getByPath(dict: Dictionary, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, dict);
}

export function translate(locale: Locale, path: string, vars?: Record<string, string | number>): string {
  const raw = getByPath(dictionaries[locale], path);
  let str = typeof raw === 'string' ? raw : path;
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      str = str.replaceAll(`{${key}}`, String(value));
    }
  }
  return str;
}
