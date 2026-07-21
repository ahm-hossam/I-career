'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { PublicUser } from '@i-career/types';
import { useLocale } from '@/lib/i18n/locale-context';

function initialsFrom(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function RecentRegistrations({ users }: { users: PublicUser[] }) {
  const { t, locale } = useLocale();

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' }).format(new Date(iso));

  return (
    <div className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-ink dark:text-white">{t('overview.tableTitle')}</h2>
          <p className="mt-0.5 text-sm text-ink-faint">{t('overview.tableSubtitle')}</p>
        </div>
        <Link href="/applicants" className="text-sm font-semibold text-brand-600 hover:underline">
          {t('common.viewAll')}
        </Link>
      </div>

      {users.length === 0 ? (
        <p className="mt-6 py-6 text-center text-sm text-ink-faint">{t('applicants.noUsers')}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnName')}</th>
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnUniversity')}</th>
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnRegistered')}</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="border-t border-border-subtle transition-colors hover:bg-ink/[0.025] dark:hover:bg-white/[0.03]"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-[11px] font-bold text-white">
                        {initialsFrom(row.firstName, row.lastName)}
                      </span>
                      <span className="font-semibold text-ink dark:text-white">
                        {row.firstName} {row.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.university}</td>
                  <td className="px-3 py-3 text-ink-faint">{formatDate(row.createdAt)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
