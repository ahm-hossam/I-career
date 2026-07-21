'use client';

import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, Building2, CalendarDays, GraduationCap, Users, type LucideIcon } from 'lucide-react';
import { cn } from '@i-career/utils';
import { Sparkline } from '@/components/sparkline';
import type { KpiDatum } from '@/lib/overview-data';
import { useLocale } from '@/lib/i18n/locale-context';

const ICONS: Record<KpiDatum['key'], LucideIcon> = {
  kpiApplicants: Users,
  kpiPrograms: GraduationCap,
  kpiEmployers: Building2,
  kpiEvents: CalendarDays,
};

export function KpiCard({ datum, index }: { datum: KpiDatum; index: number }) {
  const { t } = useLocale();
  const Icon = ICONS[datum.key];

  if (datum.value === null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        className="relative overflow-hidden rounded-3xl border border-dashed border-border-subtle bg-surface/60 p-5"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-ink-faint">{t(`overview.${datum.key}`)}</p>
            <p className="mt-2 text-3xl font-extrabold tabular-nums text-ink-faint">—</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-ink/[0.04] text-ink-faint dark:bg-white/5">
            <Icon size={18} />
          </span>
        </div>
        <p className="mt-4 text-[11px] text-ink-faint">{t('overview.noDataYet')}</p>
      </motion.div>
    );
  }

  const positive = (datum.trend ?? 0) >= 0;
  const trendColor = positive ? '#4fba74' : '#d64d4c';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="pointer-events-none absolute -top-10 end-[-2.5rem] h-32 w-32 rounded-full bg-brand-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-faint">{t(`overview.${datum.key}`)}</p>
          <p className="mt-2 text-3xl font-extrabold tabular-nums text-ink dark:text-white">{datum.value.toLocaleString()}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/15 to-accent-300/15 text-brand-600 dark:text-brand-300">
          <Icon size={18} />
        </span>
      </div>

      <div className="relative mt-4 flex items-end justify-between">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold',
            positive ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300' : 'bg-status-coral/10 text-status-coral',
          )}
        >
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {Math.abs(datum.trend ?? 0)}%
        </span>
        <Sparkline data={datum.spark} color={trendColor} />
      </div>
      <p className="relative mt-1.5 text-[11px] text-ink-faint">{t(positive ? 'overview.trendUp' : 'overview.trendDown')}</p>
    </motion.div>
  );
}
