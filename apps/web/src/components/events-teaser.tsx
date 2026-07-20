'use client';

import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { EVENTS_TEASER } from '@/data/home';

export function EventsTeaser() {
  const { featured } = EVENTS_TEASER;

  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-24">
      <span className="pointer-events-none absolute -bottom-10 right-[-4%] select-none font-sans text-[16rem] font-extrabold leading-none text-white/[0.04]">
        car
      </span>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-[32px]">{EVENTS_TEASER.heading}</h2>
            <p className="mt-2 max-w-md text-white/70">{EVENTS_TEASER.subhead}</p>
          </div>
          <a
            href="/events"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {EVENTS_TEASER.cta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur"
        >
          <span className="inline-block rounded-full bg-status-coral/15 px-3 py-1 text-xs font-semibold text-status-coral">
            {featured.mode}
          </span>
          <h3 className="mt-3 text-xl font-bold text-white">{featured.title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {featured.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              {featured.location}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
              {featured.tag}
            </span>
          </div>
          <a
            href="/events"
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300"
          >
            {featured.cta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
