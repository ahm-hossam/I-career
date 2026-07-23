import { GraduationCap } from 'lucide-react';
import { PageHeaderBanner } from '@/components/page-header-banner';
import { ProgramCard } from '@/components/program-card';
import { fetchPrograms } from '@/lib/api';

export default async function ProgramsPage() {
  const programs = await fetchPrograms();

  return (
    <div>
      <PageHeaderBanner heading={`${programs.length} Programs`} subhead="Check our programs" />

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        {programs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-ink/[0.06] bg-brand-50/40 py-24 text-center">
            <GraduationCap size={32} className="text-brand-500" />
            <p className="font-semibold text-ink-soft">No programs available right now</p>
            <p className="text-sm text-ink-faint">Check back soon — new programs are added regularly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, i) => (
              <ProgramCard key={program.id} program={program} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
