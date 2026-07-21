'use client';

import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@i-career/utils';
import type { UpcomingEventItem } from '@/lib/content-types';
import { VIEW_EVENT_LABEL } from '@/data/events';

const modeStyles: Record<UpcomingEventItem['mode'], string> = {
  Offline: 'bg-status-coral/10 text-status-coral',
  Online: 'bg-status-blue/10 text-status-blue',
  Hybrid: 'bg-accent-500/10 text-accent-500',
};

export function EventCard({
  event,
  index = 0,
  theme = 'light',
}: {
  event: UpcomingEventItem;
  index?: number;
  theme?: 'light' | 'dark';
}) {
  const dark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      className={cn(
        'flex flex-col justify-between rounded-2xl p-6 shadow-sm transition-shadow duration-300',
        dark
          ? 'border border-white/10 bg-white/[0.06] backdrop-blur hover:border-white/25 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_20px_40px_-15px_rgba(0,0,0,0.5)]'
          : 'border border-ink/[0.07] bg-white hover:border-brand-500/30 hover:shadow-[0_0_0_1px_rgba(79,186,116,0.15),0_20px_40px_-15px_rgba(21,26,30,0.25)]',
      )}
    >
      <div>
        <span className={cn('inline-block rounded-full px-3 py-1 text-xs font-semibold', modeStyles[event.mode])}>
          {event.mode}
        </span>
        <h3 className={cn('mt-3 text-lg font-bold', dark ? 'text-white' : 'text-ink')}>{event.title}</h3>
        <p className={cn('mt-2 text-sm', dark ? 'text-white/70' : 'text-ink-soft')}>{event.excerpt}</p>
        <p className={cn('mt-3 flex items-center gap-1.5 text-xs font-medium', dark ? 'text-white/60' : 'text-ink-faint')}>
          <Calendar size={14} />
          {event.startDate}
        </p>
      </div>

      <a
        href={`/events/${event.slug}`}
        className={cn(
          'group mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold',
          dark ? 'text-accent-300' : 'text-brand-600',
        )}
      >
        {VIEW_EVENT_LABEL}
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}
