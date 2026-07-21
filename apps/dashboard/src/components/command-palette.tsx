'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CornerDownLeft, Search } from 'lucide-react';
import { cn } from '@i-career/utils';
import { NAV_SECTIONS } from '@/data/nav';
import { useLocale } from '@/lib/i18n/locale-context';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { t } = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(
    () => NAV_SECTIONS.flatMap((section) => section.items.map((item) => ({ ...item, label: t(`nav.${item.key}`) }))),
    [t],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (event.key === 'Enter') {
        const item = filtered[activeIndex];
        if (item) {
          router.push(item.href);
          onClose();
        }
      }
    }

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, filtered, activeIndex, router, onClose]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setQuery('');
        setActiveIndex(0);
      }}
    >
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 pt-[15vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={t('commandPalette.title')}
          >
            <div className="flex items-center gap-2.5 border-b border-border-subtle px-4 py-3.5">
              <Search size={16} className="shrink-0 text-ink-faint" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder={t('commandPalette.placeholder')}
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint dark:text-white"
              />
              <kbd className="rounded-md border border-border-subtle px-1.5 py-0.5 font-mono text-[11px] text-ink-faint">esc</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              <p className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                {t('commandPalette.groupPages')}
              </p>
              {filtered.length === 0 && (
                <p className="px-2.5 py-6 text-center text-sm text-ink-faint">{t('common.noResults')}</p>
              )}
              <ul className="flex flex-col gap-0.5">
                {filtered.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm font-medium transition-colors',
                          index === activeIndex ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300' : 'text-ink-soft dark:text-white/80',
                        )}
                      >
                        <Icon size={16} className="shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {index === activeIndex && <CornerDownLeft size={14} className="shrink-0 text-ink-faint" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
