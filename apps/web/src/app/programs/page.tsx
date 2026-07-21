'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
import { cn } from '@i-career/utils';
import { NetworkField } from '@/components/network-field';
import { ProgramCard } from '@/components/program-card';
import { PROGRAMS, PROGRAMS_PAGE, PROGRAM_TYPE_FILTERS, SORT_OPTIONS } from '@/data/programs';

export default function ProgramsPage() {
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Newest to Oldest');
  const [typeFilter, setTypeFilter] = useState<(typeof PROGRAM_TYPE_FILTERS)[number] | null>(null);

  const visible = useMemo(() => {
    let list = [...PROGRAMS];
    if (typeFilter) {
      list = list.filter((p) => p.mode === typeFilter);
    }
    if (sort === 'Oldest to Newest') list = list.reverse();
    if (sort === 'A to Z') list = list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'Z to A') list = list.sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [sort, typeFilter]);

  return (
    <div>
      <section className="relative -mt-[80px] overflow-hidden bg-white pt-[144px] pb-10 sm:pt-[160px]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(79,186,116,0.1),transparent)]" />
        <NetworkField variant="brand" />

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: [0, -10, 0], rotate: [-6, -2, -6] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.4 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
          }}
          className="pointer-events-none absolute right-[8%] top-16 hidden items-center gap-1.5 rounded-full border border-brand-500/20 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-lg backdrop-blur-sm lg:flex"
        >
          <GraduationCap size={13} />
          {PROGRAMS.length} Programs
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-white/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur-sm">
              <Sparkles size={12} />
              {PROGRAMS_PAGE.heading}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-balance text-ink sm:text-4xl">{PROGRAMS_PAGE.title}</h1>
            <p className="mt-4 text-ink-soft">{PROGRAMS_PAGE.subhead}</p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter(null)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              typeFilter === null
                ? 'border-brand-500 bg-brand-500 text-white'
                : 'border-ink/10 text-ink-soft hover:bg-ink/[0.04]',
            )}
          >
            All
          </button>
          {PROGRAM_TYPE_FILTERS.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                typeFilter === type
                  ? 'border-brand-500 bg-brand-500 text-white'
                  : 'border-ink/10 text-ink-soft hover:bg-ink/[0.04]',
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <label className="relative inline-flex items-center">
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof SORT_OPTIONS)[number])}
            className="appearance-none rounded-full border border-ink/10 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-ink shadow-sm outline-none transition-colors focus:border-brand-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3.5 text-ink-faint" />
        </label>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((program, i) => (
          <ProgramCard key={program.slug} program={program} index={i} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-ink-soft">No programs match this filter yet — check back soon.</p>
      )}

      <div className="mt-14 flex items-center justify-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
          1
        </span>
        <button
          type="button"
          disabled
          className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink-faint disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
      </div>
    </div>
  );
}
