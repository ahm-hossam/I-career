'use client';

import { useMemo, useState } from 'react';
import { CalendarClock } from 'lucide-react';
import type { EventType, PublicEvent } from '@i-career/types';
import { cn } from '@i-career/utils';
import { PageHeaderBanner } from '@/components/page-header-banner';
import { useLocale } from '@/lib/i18n/locale-context';

const TYPE_KEYS: Record<EventType, string> = {
  INFO_SESSION: 'eventsPage.typeInfoSession',
  TRAINING: 'eventsPage.typeTraining',
  WORKSHOP: 'eventsPage.typeWorkshop',
  CAREER_DAY: 'eventsPage.typeCareerDay',
  RECRUITMENT_DAY: 'eventsPage.typeRecruitmentDay',
  EMPLOYER_CIRCLE: 'eventsPage.typeEmployerCircle',
  CAREER_ADVISING: 'eventsPage.typeCareerAdvising',
  CAREER_TALK: 'eventsPage.typeCareerTalk',
  EMPLOYMENT_FAIR: 'eventsPage.typeEmploymentFair',
  MENTORSHIP_CIRCLE: 'eventsPage.typeMentorshipCircle',
  CAREER_WEEK: 'eventsPage.typeCareerWeek',
  OTHER: 'eventsPage.typeOther',
};

const TYPES = Object.keys(TYPE_KEYS) as EventType[];

export function EventsView({ events }: { events: PublicEvent[] }) {
  const [activeType, setActiveType] = useState<EventType | null>(null);
  const { t } = useLocale();

  const filtered = useMemo(
    () => (activeType ? events.filter((e) => e.type === activeType) : events),
    [events, activeType],
  );

  return (
    <div>
      <PageHeaderBanner heading={t('eventsPage.heading')} subhead={t('eventsPage.subhead')} />

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
      <div className="flex flex-col gap-8 sm:flex-row">
        <aside className="shrink-0 sm:w-56">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">{t('eventsPage.type')}</p>
            {activeType && (
              <button type="button" onClick={() => setActiveType(null)} className="text-xs font-semibold text-brand-600 hover:underline">
                {t('eventsPage.clearFilters')}
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 sm:flex-col">
            {TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType((prev) => (prev === type ? null : type))}
                className={cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:rounded-lg sm:text-start',
                  activeType === type ? 'bg-brand-500 text-white' : 'bg-ink/[0.04] text-ink-soft hover:bg-ink/[0.08]',
                )}
              >
                {t(TYPE_KEYS[type])}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-ink/[0.06] bg-brand-50/40 py-24 text-center">
              <CalendarClock size={32} className="text-brand-500" />
              <p className="font-semibold text-ink-soft">{t('eventsPage.noResultsFound')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filtered.map((event) => (
                <div key={event.id} className="rounded-3xl border border-ink/[0.06] bg-white p-5 shadow-sm">
                  <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-bold text-brand-700">
                    {t(TYPE_KEYS[event.type])}
                  </span>
                  <h3 className="mt-3 font-bold text-ink">{event.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{event.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
