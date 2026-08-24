'use client';

import Image from 'next/image';
import type { PublicServiceProject } from '@i-career/types';
import { useLocale } from '@/lib/i18n/locale-context';

export function ServiceProjectsSection({ projects }: { projects: PublicServiceProject[] }) {
  const { t } = useLocale();
  if (projects.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-lg font-bold text-ink">{t('serviceProjects.previousProjects')}</h2>
      <p className="mt-1 text-sm text-ink-faint">{t('serviceProjects.provenSuccessRecords')}</p>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
        {projects.map((project) => {
          const card = (
            <div className="flex h-full w-64 shrink-0 flex-col rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-10 w-24">
                <Image src={project.logoUrl} alt={project.name} fill className="object-contain object-left" />
              </div>
              <h3 className="mt-3 font-bold text-ink">{project.name}</h3>
              {project.description && (
                <p className="mt-1 line-clamp-3 text-xs text-ink-soft">{project.description}</p>
              )}
            </div>
          );

          return project.linkUrl ? (
            <a key={project.id} href={project.linkUrl} target="_blank" rel="noreferrer">
              {card}
            </a>
          ) : (
            <div key={project.id}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}
