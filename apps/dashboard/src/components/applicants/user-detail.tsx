'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Archive, ArchiveRestore, ArrowLeft, CalendarCheck2, ClipboardList, ShieldCheck, Trash2 } from 'lucide-react';
import type { UserDetail } from '@i-career/types';
import { cn } from '@i-career/utils';
import { useLocale } from '@/lib/i18n/locale-context';
import { deleteUser, setUserArchived } from '@/app/applicants/actions';

const STATUS_STYLES = {
  PENDING: 'bg-accent-500/10 text-accent-500',
  ACCEPTED: 'bg-brand-500/10 text-brand-700 dark:text-brand-300',
  REJECTED: 'bg-status-coral/10 text-status-coral',
} as const;

const STATUS_DOT = {
  PENDING: 'bg-accent-500',
  ACCEPTED: 'bg-brand-500',
  REJECTED: 'bg-status-coral',
} as const;

function initialsFrom(firstName: string, lastName: string) {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function UserDetailView({ user }: { user: UserDetail }) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
      new Date(iso),
    );

  const total = user.applications.length;
  const accepted = user.applications.filter((a) => a.status === 'ACCEPTED').length;
  const attended = user.applications.filter((a) => a.attendedAt !== null).length;

  async function handleToggleArchived() {
    setPending(true);
    try {
      await setUserArchived(user.id, !user.archived);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  async function handleRemove() {
    if (!confirm(t('applicants.removeUserConfirm', { name: `${user.firstName} ${user.lastName}` }))) return;
    setPending(true);
    try {
      await deleteUser(user.id);
      router.push('/applicants?tab=users');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 overflow-hidden">
        <div className="absolute -top-32 start-1/4 h-72 w-72 animate-drift rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -top-20 end-1/4 h-64 w-64 animate-drift rounded-full bg-accent-300/10 blur-3xl [animation-delay:2.5s]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <button
          type="button"
          onClick={() => router.push('/applicants?tab=users')}
          className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink dark:text-white/70 dark:hover:text-white"
        >
          <ArrowLeft size={15} className="rtl:rotate-180" />
          {t('applicants.backToUsers')}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 flex flex-col gap-4 rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white">
              {initialsFrom(user.firstName, user.lastName)}
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-ink dark:text-white sm:text-2xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="mt-0.5 text-sm text-ink-faint">{user.email}</p>
              <span
                className={cn(
                  'mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                  user.archived ? 'bg-status-coral/10 text-status-coral' : 'bg-brand-500/10 text-brand-700 dark:text-brand-300',
                )}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', user.archived ? 'bg-status-coral' : 'bg-brand-500')} />
                {user.archived ? t('applicants.statusArchived') : t('applicants.statusActive')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={handleToggleArchived}
              className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3.5 py-2 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
            >
              {user.archived ? <ArchiveRestore size={14} /> : <Archive size={14} />}
              {user.archived ? t('applicants.unarchive') : t('applicants.archive')}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={handleRemove}
              className="flex items-center gap-1.5 rounded-full border border-status-coral/30 px-3.5 py-2 text-xs font-semibold text-status-coral transition-colors hover:bg-status-coral/[0.08] disabled:opacity-60"
            >
              <Trash2 size={14} />
              {t('applicants.removeUser')}
            </button>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t('applicants.columnApplications'), value: total, icon: ClipboardList },
            { label: t('applicants.statAccepted'), value: accepted, icon: ShieldCheck },
            { label: t('applicants.columnAttended'), value: attended, icon: CalendarCheck2 },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-2xl border border-border-subtle bg-surface p-5 shadow-sm">
                <div className="flex items-center gap-2 text-ink-faint">
                  <Icon size={15} />
                  <span className="text-xs font-bold uppercase tracking-wide">{stat.label}</span>
                </div>
                <p className="mt-2 text-2xl font-extrabold text-ink dark:text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-3xl border border-border-subtle bg-surface p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-faint">{t('applicants.profileDetails')}</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.columnPhone')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.columnNationality')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.nationality}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.governorate')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.governorate}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.columnUniversity')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.university}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.columnFaculty')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.faculty}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.columnGradYear')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.graduationYear}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.studentStatus')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{user.studentStatus}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-ink-faint">{t('applicants.columnRegistered')}</dt>
              <dd className="mt-0.5 text-sm text-ink dark:text-white/90">{formatDate(user.createdAt)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink-faint">{t('applicants.programHistory')}</h2>

          {user.applications.length === 0 ? (
            <p className="mt-4 py-6 text-center text-sm text-ink-faint">{t('applicants.noApplications')}</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                    <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnProgram')}</th>
                    <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnApplied')}</th>
                    <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnStatus')}</th>
                    <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnAttended')}</th>
                  </tr>
                </thead>
                <tbody>
                  {user.applications.map((app, i) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="border-t border-border-subtle"
                    >
                      <td className="px-3 py-3 font-semibold text-ink dark:text-white">{app.program.title}</td>
                      <td className="px-3 py-3 text-ink-faint">{formatDate(app.createdAt)}</td>
                      <td className="px-3 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                            STATUS_STYLES[app.status],
                          )}
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[app.status])} />
                          {app.status[0] + app.status.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-ink-faint">{app.attendedAt ? formatDate(app.attendedAt) : '—'}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
