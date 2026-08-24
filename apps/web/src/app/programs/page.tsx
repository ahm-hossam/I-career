import { GraduationCap } from 'lucide-react';
import { PageHeaderBanner } from '@/components/page-header-banner';
import { ProgramCard } from '@/components/program-card';
import { fetchPrograms } from '@/lib/api';
import { getServerLocale } from '@/lib/i18n/server';
import { translate } from '@/lib/i18n/translate';

export default async function ProgramsPage() {
  const [programs, locale] = await Promise.all([fetchPrograms(), getServerLocale()]);
  const t = (path: string, vars?: Record<string, string | number>) => translate(locale, path, vars);

  return (
    <div>
      <PageHeaderBanner heading={t('programsPage.countHeading', { count: programs.length })} subhead={t('programsPage.subhead')} />

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        {programs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-ink/[0.06] bg-brand-50/40 py-24 text-center">
            <GraduationCap size={32} className="text-brand-500" />
            <p className="font-semibold text-ink-soft">{t('programsPage.noProgramsAvailable')}</p>
            <p className="text-sm text-ink-faint">{t('programsPage.checkBackSoon')}</p>
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
