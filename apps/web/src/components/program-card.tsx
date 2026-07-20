'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { ProgramItem } from '@/lib/content-types';
import { REGISTER_LABEL, VIEW_PROGRAM_LABEL } from '@/data/programs';

export function ProgramCard({ program, index = 0 }: { program: ProgramItem; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between rounded-2xl border border-ink/[0.07] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div>
        {program.mode && (
          <span className="mb-3 inline-block rounded-full bg-status-blue/10 px-3 py-1 text-xs font-semibold text-status-blue">
            {program.mode}
          </span>
        )}
        <h3 className="text-lg font-bold text-ink" dir="auto">
          {program.title}
        </h3>
        <p className="mt-2 text-sm text-ink-soft" dir="auto">
          {program.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          {REGISTER_LABEL}
        </button>
        <a
          href={`/programs/${program.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"
        >
          {VIEW_PROGRAM_LABEL}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}
