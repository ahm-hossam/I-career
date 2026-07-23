import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import type { PublicProgram } from '@i-career/types';
import { ProgramCard } from './program-card';

export function ProgramsTeaser({ programs }: { programs: PublicProgram[] }) {
  if (programs.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold text-ink sm:text-[32px]">Programs</h2>
          <p className="mt-1 text-ink-soft">Check our programs</p>
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-ink/[0.06] bg-brand-50/40 py-24 text-center">
          <GraduationCap size={32} className="text-brand-500" />
          <p className="font-semibold text-ink-soft">No programs available right now</p>
          <p className="text-sm text-ink-faint">Check back soon — new programs are added regularly.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-ink sm:text-[32px]">Programs</h2>
          <p className="mt-1 text-ink-soft">Check our programs</p>
        </div>
        <Link
          href="/programs"
          className="hidden rounded-full border border-ink/10 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.04] sm:inline-flex"
        >
          More Programs
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, i) => (
          <ProgramCard key={program.id} program={program} index={i} />
        ))}
      </div>

      <Link
        href="/programs"
        className="mt-8 flex items-center justify-center rounded-full border border-ink/10 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.04] sm:hidden"
      >
        More Programs
      </Link>
    </section>
  );
}
