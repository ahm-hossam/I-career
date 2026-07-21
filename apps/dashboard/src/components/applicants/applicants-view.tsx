'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { UserRound, KeyRound } from 'lucide-react';
import type { PasswordResetRequestSummary, PublicUser } from '@i-career/types';
import { cn } from '@i-career/utils';
import { useLocale } from '@/lib/i18n/locale-context';
import { RegisteredUsersTable } from './registered-users-table';
import { ResetRequestsTable } from './reset-requests-table';

const TABS = [
  { key: 'users' as const, icon: UserRound },
  { key: 'requests' as const, icon: KeyRound },
];

export function ApplicantsView({
  users,
  requests,
}: {
  users: PublicUser[];
  requests: PasswordResetRequestSummary[];
}) {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'requests' ? 'requests' : 'users';
  const [active, setActive] = useState<'users' | 'requests'>(initialTab);
  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
        <div className="absolute -top-32 start-1/4 h-72 w-72 animate-drift rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -top-20 end-1/4 h-64 w-64 animate-drift rounded-full bg-accent-300/10 blur-3xl [animation-delay:2.5s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">{t('applicants.title')}</h1>
          <p className="mt-1 text-ink-faint">{t('applicants.subtitle')}</p>
        </motion.div>

        <div className="relative mt-6 inline-flex gap-1.5 rounded-2xl border border-border-subtle bg-surface p-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={cn(
                  'relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors',
                  isActive ? 'text-white' : 'text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="applicants-tab-active"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-brand-500"
                  />
                )}
                <Icon size={15} className="relative" />
                <span className="relative">{t(`applicants.tab${tab.key === 'users' ? 'Users' : 'Requests'}`)}</span>
                {tab.key === 'requests' && pendingCount > 0 && (
                  <span
                    className={cn(
                      'relative flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold',
                      isActive ? 'bg-white/25 text-white' : 'bg-accent-500/15 text-accent-500',
                    )}
                  >
                    {pendingCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {active === 'users' ? (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <RegisteredUsersTable users={users} />
              </motion.div>
            ) : (
              <motion.div
                key="requests"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <ResetRequestsTable requests={requests} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
