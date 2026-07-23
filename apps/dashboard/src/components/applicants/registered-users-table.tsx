'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Archive, ArchiveRestore, ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react';
import type { UserListItem } from '@i-career/types';
import { cn } from '@i-career/utils';
import { useLocale } from '@/lib/i18n/locale-context';
import { deleteUser, setUserArchived } from '@/app/applicants/actions';

const PAGE_SIZE = 5;

function initialsFrom(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function RegisteredUsersTable({ users }: { users: UserListItem[] }) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));

  const rows = useMemo(() => users.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE), [users, page]);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
      new Date(iso),
    );

  async function handleToggleArchived(user: UserListItem) {
    setPendingId(user.id);
    try {
      await setUserArchived(user.id, !user.archived);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function handleRemove(user: UserListItem) {
    if (!confirm(t('applicants.removeUserConfirm', { name: `${user.firstName} ${user.lastName}` }))) return;
    setPendingId(user.id);
    try {
      await deleteUser(user.id);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

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
        <table className="w-full min-w-[1080px] border-collapse text-sm">
          <thead>
            <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnName')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnEmail')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnUniversity')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnGradYear')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnRegistered')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnApplications')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnAttended')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnStatus')}</th>
              <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnActions')}</th>
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
                <td className="px-3 py-3 text-ink-soft dark:text-white/75">{row.university}</td>
                <td className="px-3 py-3 text-ink-faint">{row.graduationYear}</td>
                <td className="px-3 py-3 text-ink-faint">{formatDate(row.createdAt)}</td>
                <td className="px-3 py-3 text-ink-faint">{row.applicationsCount}</td>
                <td className="px-3 py-3 text-ink-faint">{row.attendedCount}</td>
                <td className="px-3 py-3">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                      row.archived ? 'bg-status-coral/10 text-status-coral' : 'bg-brand-500/10 text-brand-700 dark:text-brand-300',
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', row.archived ? 'bg-status-coral' : 'bg-brand-500')} />
                    {row.archived ? t('applicants.statusArchived') : t('applicants.statusActive')}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/applicants/users/${row.id}`}
                      aria-label={t('applicants.viewProfile')}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.06] dark:text-white/70"
                    >
                      <Eye size={15} />
                    </Link>
                    <button
                      type="button"
                      disabled={pendingId === row.id}
                      onClick={() => handleToggleArchived(row)}
                      aria-label={row.archived ? t('applicants.unarchive') : t('applicants.archive')}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/[0.06] disabled:opacity-60 dark:text-white/70"
                    >
                      {row.archived ? <ArchiveRestore size={15} /> : <Archive size={15} />}
                    </button>
                    <button
                      type="button"
                      disabled={pendingId === row.id}
                      onClick={() => handleRemove(row)}
                      aria-label={t('applicants.removeUser')}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08] disabled:opacity-60"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
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
