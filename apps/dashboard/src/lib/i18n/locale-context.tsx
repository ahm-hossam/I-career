'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import en from './dictionaries/en';
import ar from './dictionaries/ar';
import { dirOf, type Dictionary, type Locale } from './types';

const dictionaries: Record<Locale, Dictionary> = { en, ar };

const COOKIE_KEY = 'icareer-locale';

type TranslateFn = (path: string, vars?: Record<string, string | number>) => string;

interface LocaleContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  t: TranslateFn;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getByPath(dict: Dictionary, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key];
    return undefined;
  }, dict);
}

function applyDom(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = dirOf(locale);
}

export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      document.cookie = `${COOKIE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Cookies can be unavailable (private mode, restrictive policies) — locale still
      // updates for the current session, it just won't persist across visits.
    }
    applyDom(next);
  }, []);

  useEffect(() => {
    applyDom(locale);
  }, [locale]);

  const t = useCallback<TranslateFn>(
    (path, vars) => {
      const raw = getByPath(dictionaries[locale], path);
      let str = typeof raw === 'string' ? raw : path;
      if (vars) {
        for (const [key, value] of Object.entries(vars)) {
          str = str.replaceAll(`{${key}}`, String(value));
        }
      }
      return str;
    },
    [locale],
  );

  const value = useMemo<LocaleContextValue>(() => ({ locale, dir: dirOf(locale), setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
