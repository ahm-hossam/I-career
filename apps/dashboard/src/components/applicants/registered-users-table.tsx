'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PublicUser } from '@i-career/types';
import { useLocale } from '@/lib/i18n/locale-context';

const PAGE_SIZE = 5;

function initialsFrom(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function RegisteredUsersTable({ users }: { users: PublicUser[] }) {
  const { t, locale } = useLocale();
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));

  const rows = useMemo(() => users.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [users, page]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
      new Date(iso),
    );

  if (users.length === 0) {
    return (
      <div className="rounded-3xl border border-border-subtle bg-surface p-8 text-center text-sm text-ink-faint shadow-sm">
        {t('applicants.noUsers')}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnName')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnEmail')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnPhone')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnNationality')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnUniversity')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnFaculty')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnGradYear')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnRegistered')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
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
                <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.email}</td>
                <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.phone}</td>
                <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.nationality}</td>
                <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.university}</td>
                <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.faculty}</td>
                <td className="px-3 py-3 text-ink-faint">{row.graduationYear}</td>
                <td className="px-3 py-3 text-ink-faint">{formatDate(row.createdAt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
        <span className="text-xs text-ink-faint">{t('applicants.pageOf', { current: page + 1, total: totalPages })}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="flex items-center gap-1 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:cursor-not-allowed disabled:opacity-40 dark:text-white/75"
          >
            <ChevronLeft size={14} className="rtl:rotate-180" />
            {t('applicants.previous')}
          </button>
          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="flex items-center gap-1 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:cursor-not-allowed disabled:opacity-40 dark:text-white/75"
          >
            {t('applicants.next')}
            <ChevronRight size={14} className="rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
