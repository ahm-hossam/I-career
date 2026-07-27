'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@i-career/utils';
import { useClickOutside } from '@/lib/use-click-outside';

export function CriteriaMultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false), open);

  const filteredOptions = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query],
  );

  function toggle(option: string) {
    onChange(selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option]);
  }

  return (
    <div ref={ref} className="relative">
      <label className="text-sm font-semibold text-ink dark:text-white/90">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-1.5 flex w-full items-center justify-between gap-2 rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-start text-sm text-ink-soft transition-colors hover:border-brand-500/30 dark:text-white/75"
      >
        <span className="truncate">{selected.length === 0 ? 'Any (no filter)' : `${selected.length} selected`}</span>
        <ChevronDown size={14} className={cn('shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-border-subtle bg-surface shadow-xl"
          >
            <div className="border-b border-border-subtle p-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-sm text-ink outline-none focus:border-brand-500 dark:text-white"
              />
            </div>
            <div className="max-h-56 overflow-y-auto p-1.5">
              {filteredOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-ink-soft hover:bg-ink/[0.04] dark:text-white/80"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggle(option)}
                    className="accent-brand-500"
                  />
                  {option}
                </label>
              ))}
              {filteredOptions.length === 0 && <p className="px-2.5 py-2 text-xs text-ink-faint">No matches</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selected.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {selected.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700"
            >
              {s}
              <button type="button" onClick={() => toggle(s)} aria-label={`Remove ${s}`}>
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
