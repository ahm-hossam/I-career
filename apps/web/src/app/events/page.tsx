'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { EventCard } from '@/components/event-card';
import { SORT_OPTIONS } from '@/lib/content-types';
import {
  EVENTS_PAGE,
  PAST_EVENTS,
  PREVIOUS_EVENTS_HEADING,
  UPCOMING_EVENTS,
  UPCOMING_EVENTS_HEADING,
  UPCOMING_EVENTS_SUBHEAD,
} from '@/data/events';

export default function EventsPage() {
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Newest to Oldest');

  const visible = useMemo(() => {
    let list = [...UPCOMING_EVENTS];
    if (sort === 'Oldest to Newest') list = list.reverse();
    if (sort === 'A to Z') list = list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'Z to A') list = list.sort((a, b) => b.title.localeCompare(a.title));
    return list;
  }, [sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="text-sm font-bold uppercase tracking-wide text-brand-600">{EVENTS_PAGE.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-balance text-ink sm:text-4xl">{EVENTS_PAGE.title}</h1>
      </motion.div>

      <div className="mt-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">{UPCOMING_EVENTS_HEADING}</h2>
          <p className="mt-1 text-sm text-ink-soft">{UPCOMING_EVENTS_SUBHEAD}</p>
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
        {visible.map((event, i) => (
          <EventCard key={event.slug} event={event} index={i} />
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2">
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

      <div className="mt-20">
        <h2 className="text-xl font-bold text-ink">{PREVIOUS_EVENTS_HEADING}</h2>
        <div className="mt-6 divide-y divide-ink/[0.07] rounded-2xl border border-ink/[0.07] bg-white shadow-sm">
          {PAST_EVENTS.map((event, i) => (
            <motion.div
              key={`${event.title}-${i}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-5 px-5 py-4 transition-colors hover:bg-brand-50/40"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <span className="text-lg font-bold leading-none">{event.day}</span>
                <span className="text-[11px] font-semibold uppercase leading-none">{event.month}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-ink">{event.title}</p>
                <p className="text-xs text-ink-faint">{event.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
