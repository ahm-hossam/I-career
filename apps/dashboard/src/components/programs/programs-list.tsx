'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Pencil } from 'lucide-react';
import type { PublicProgram } from '@i-career/types';

export function ProgramsList({ programs }: { programs: PublicProgram[] }) {
  if (programs.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border-subtle bg-surface/60 p-10 text-center text-sm text-ink-faint">
        No programs yet — create the first one.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program, i) => (
        <motion.div
          key={program.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-sm"
        >
          <div className="relative aspect-[16/9] w-full bg-ink/[0.04] dark:bg-white/5">
            <Image src={program.logoUrl} alt={program.title} fill className="object-cover" />
          </div>
          <div className="p-4">
            <p className="font-bold text-ink dark:text-white">{program.title}</p>
            <p className="mt-0.5 truncate font-mono text-xs text-ink-faint">/{program.slug}</p>
            <p className="mt-2 text-xs text-ink-faint">
              Updated {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(program.updatedAt))}
            </p>
            <Link
              href={`/programs/${program.slug}`}
              className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-border-subtle px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] dark:text-white/80"
            >
              <Pencil size={13} />
              Edit
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
