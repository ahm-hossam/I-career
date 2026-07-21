'use client';

import { motion } from 'motion/react';
import { KeyRound, UserPlus, type LucideIcon } from 'lucide-react';
import type { ActivityItem, ActivityKind } from '@/lib/overview-data';
import { useLocale } from '@/lib/i18n/locale-context';

const KIND_ICON: Record<ActivityKind, LucideIcon> = {
  registration: UserPlus,
  resetRequest: KeyRound,
};

const KIND_COLOR: Record<ActivityKind, string> = {
  registration: 'bg-brand-500/10 text-brand-600 dark:text-brand-300',
  resetRequest: 'bg-accent-500/10 text-accent-500',
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const { t } = useLocale();

  return (
    <div className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <h2 className="text-base font-bold text-ink dark:text-white">{t('overview.activityTitle')}</h2>
      <p className="mt-0.5 text-sm text-ink-faint">{t('overview.activitySubtitle')}</p>

      {items.length === 0 ? (
        <p className="mt-6 py-6 text-center text-sm text-ink-faint">{t('overview.noActivityYet')}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-1">
          {items.map((item, i) => {
            const Icon = KIND_ICON[item.kind];
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-ink/[0.03] dark:hover:bg-white/[0.03]"
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${KIND_COLOR[item.kind]}`}>
                  <Icon size={14} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-ink dark:text-white/90">
                    <span className="font-semibold">{item.actor}</span> {item.detail}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-faint">{item.time}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
