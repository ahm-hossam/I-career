import { PageHeaderBanner } from '@/components/page-header-banner';
import { ProgramCard } from '@/components/program-card';
import { fetchPrograms } from '@/lib/api';

export default async function ProgramsPage() {
  const programs = await fetchPrograms();

  return (
    <div>
      <PageHeaderBanner heading={`${programs.length} Programs`} subhead="Check our programs" />

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <ProgramCard key={program.id} program={program} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
