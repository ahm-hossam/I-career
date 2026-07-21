'use client';

import { motion } from 'motion/react';
import type { PublicUser } from '@i-career/types';
import { ActivityFeed } from '@/components/activity-feed';
import { KpiCard } from '@/components/kpi-card';
import { RecentRegistrations } from '@/components/recent-registrations';
import { SignupsChart } from '@/components/signups-chart';
import type { ActivityItem, ChartPoint, KpiDatum } from '@/lib/overview-data';
import { useLocale } from '@/lib/i18n/locale-context';

interface OverviewViewProps {
  kpis: KpiDatum[];
  chartData: ChartPoint[];
  recentUsers: PublicUser[];
  activityItems: ActivityItem[];
}

export function OverviewView({ kpis, chartData, recentUsers, activityItems }: OverviewViewProps) {
  const { t } = useLocale();

  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
        <div className="absolute -top-32 start-1/4 h-72 w-72 animate-drift rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -top-20 end-1/4 h-64 w-64 animate-drift rounded-full bg-accent-300/10 blur-3xl [animation-delay:2.5s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">{t('overview.title')}</h1>
          <p className="mt-1 text-ink-faint">{t('overview.subtitle')}</p>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((datum, i) => (
            <KpiCard key={datum.key} datum={datum} index={i} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <SignupsChart data={chartData} />
          </div>
          <ActivityFeed items={activityItems} />
        </div>

        <div className="mt-6">
          <RecentRegistrations users={recentUsers} />
        </div>
      </div>
    </div>
  );
}
