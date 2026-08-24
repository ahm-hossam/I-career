'use client';

import { motion } from 'motion/react';
import { cn } from '@i-career/utils';
import { useLocale } from '@/lib/i18n/locale-context';
import type { Locale } from '@/lib/i18n/types';

const LANGS: { locale: Locale; label: string }[] = [
  { locale: 'en', label: 'EN' },
  { locale: 'ar', label: 'AR' },
];

export function LanguageSwitcher({ inverted = false }: { inverted?: boolean }) {
  const { t, locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        'relative flex items-center gap-0.5 rounded-full border p-1',
        inverted ? 'border-white/15 bg-white/10' : 'border-ink/10 bg-ink/[0.03]',
      )}
    >
      {LANGS.map((lang) => (
        <button
          key={lang.locale}
          type="button"
          onClick={() => setLocale(lang.locale)}
          aria-label={`${t('header.languageLabel')}: ${lang.label}`}
          className={cn(
            'relative rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
            locale === lang.locale
              ? 'text-white'
              : inverted
                ? 'text-white/60 hover:text-white'
                : 'text-ink-faint hover:text-ink',
          )}
        >
          {locale === lang.locale && (
            <motion.span
              layoutId="lang-pill"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute inset-0 rounded-full bg-brand-500"
            />
          )}
          <span className="relative">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
