'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ProgramCard } from '@/components/program-card';
import { PROGRAMS_TEASER } from '@/data/home';
import { PROGRAMS } from '@/data/programs';

export function ProgramsTeaser() {
  const featured = PROGRAMS.slice(0, 3);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-ink sm:text-[32px]">{PROGRAMS_TEASER.heading}</h2>
            <p className="mt-2 max-w-md text-ink-soft">{PROGRAMS_TEASER.subhead}</p>
          </div>
          <a
            href="/programs"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.04]"
          >
            {PROGRAMS_TEASER.cta}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
