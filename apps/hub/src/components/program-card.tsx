'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { PublicProgram } from '@i-career/types';

export function ProgramCard({ program, index = 0 }: { program: PublicProgram; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden rounded-3xl border border-ink/[0.06] bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <Link href={`/programs/${program.slug}`} className="relative block aspect-[15/9] w-full overflow-hidden bg-brand-50">
        <Image src={program.logoUrl} alt={program.title} fill className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/programs/${program.slug}`} className="font-bold text-ink hover:text-brand-700">
            {program.title}
          </Link>
          <Link
            href={`/programs/${program.slug}`}
            className="shrink-0 rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-600"
          >
            Register
          </Link>
        </div>
        <p className="line-clamp-1 text-sm font-semibold text-ink">{program.subtitleEn}</p>
        <p className="line-clamp-3 text-sm text-ink-soft">{program.aboutBody}</p>
      </div>
    </motion.div>
  );
}
