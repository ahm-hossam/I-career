import Link from 'next/link';
import { Plus } from 'lucide-react';
import { fetchPrograms } from '@/lib/api';
import { ProgramsList } from '@/components/programs/programs-list';

export default async function ProgramsPage() {
  const programs = await fetchPrograms();

  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
        <div className="absolute -top-32 start-1/4 h-72 w-72 animate-drift rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -top-20 end-1/4 h-64 w-64 animate-drift rounded-full bg-accent-300/10 blur-3xl [animation-delay:2.5s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Programs</h1>
            <p className="mt-1 text-ink-faint">Manage the programs shown on iCareer Hub</p>
          </div>
          <Link
            href="/programs/new"
            className="flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600"
          >
            <Plus size={16} />
            New Program
          </Link>
        </div>

        <div className="mt-6">
          <ProgramsList programs={programs} />
        </div>
      </div>
    </div>
  );
}
