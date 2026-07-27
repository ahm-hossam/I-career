'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Accessibility, Check, ClipboardList, Search, X } from 'lucide-react';
import type { ApplicationListItem, ApplicationStatus, PublicProgram } from '@i-career/types';
import { cn } from '@i-career/utils';
import { ExportButton } from '@/components/export-button';
import { updateApplication } from '@/app/applications/actions';

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

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

export function ApplicationsView({
  applications,
  programs,
}: {
  applications: ApplicationListItem[];
  programs: PublicProgram[];
}) {
  const router = useRouter();
  const [programFilter, setProgramFilter] = useState<'ALL' | string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ApplicationStatus>('ALL');
  const [search, setSearch] = useState('');
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications
      .filter((a) => programFilter === 'ALL' || a.program.slug === programFilter)
      .filter((a) => statusFilter === 'ALL' || a.status === statusFilter)
      .filter(
        (a) =>
          !q ||
          `${a.applicant.firstName} ${a.applicant.lastName}`.toLowerCase().includes(q) ||
          a.applicant.email.toLowerCase().includes(q),
      );
  }, [applications, programFilter, statusFilter, search]);

  const exportRows = useMemo(
    () =>
      filtered.map((a) => ({
        'First Name': a.applicant.firstName,
        'Last Name': a.applicant.lastName,
        Email: a.applicant.email,
        Phone: a.applicant.phone,
        University: a.applicant.university,
        Faculty: a.applicant.faculty,
        'Has Disability': a.applicant.hasDisability ? 'Yes' : 'No',
        'Account Status': a.applicant.archived ? 'Archived' : 'Active',
        Program: a.program.title,
        Status: a.status,
        'Decided By': a.decidedBy ?? '',
        'Rejection Reason': a.rejectionReason ?? '',
        'Referral Code': a.referral?.code ?? '',
        'Referral Label': a.referral?.label ?? '',
        'Applied At': a.createdAt,
        'Attended At': a.attendedAt ?? '',
      })),
    [filtered],
  );

  async function handleAction(id: string, patch: { status?: 'ACCEPTED' | 'REJECTED'; attended?: boolean }) {
    setPendingId(id);
    try {
      await updateApplication(id, patch);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Applications</h1>
        <p className="mt-1 text-ink-faint">Every program application across all programs, in one place</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className={cn(inputClass, 'w-auto bg-surface ps-9')}
          />
        </div>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className={cn(inputClass, 'w-auto bg-surface')}
        >
          <option value="ALL">All programs</option>
          {programs.map((p) => (
            <option key={p.id} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'ALL' | ApplicationStatus)}
          className={cn(inputClass, 'w-auto bg-surface')}
        >
          <option value="ALL">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <ExportButton filename="applications.csv" rows={exportRows} />
      </div>

      <div className="mt-6 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <ClipboardList size={28} className="text-ink-faint" />
            <p className="text-sm text-ink-faint">
              {applications.length === 0 ? 'No applications yet.' : 'No applications match this filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-2.5 text-start font-bold">Applicant</th>
                  <th className="px-3 py-2.5 text-start font-bold">Program</th>
                  <th className="px-3 py-2.5 text-start font-bold">Referral</th>
                  <th className="px-3 py-2.5 text-start font-bold">Applied</th>
                  <th className="px-3 py-2.5 text-start font-bold">Status</th>
                  <th className="px-3 py-2.5 text-start font-bold">Attended</th>
                  <th className="px-3 py-2.5 text-start font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="border-t border-border-subtle transition-colors hover:bg-ink/[0.025] dark:hover:bg-white/[0.03]"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 font-semibold text-ink dark:text-white">
                        <Link
                          href={`/applicants/users/${row.applicant.id}`}
                          className="hover:text-brand-600 hover:underline dark:hover:text-brand-300"
                        >
                          {row.applicant.firstName} {row.applicant.lastName}
                        </Link>
                        {row.applicant.hasDisability && (
                          <span
                            title={`Disability: ${row.applicant.disabilityDetails ?? 'Yes'}`}
                            className="inline-flex shrink-0 text-brand-600"
                          >
                            <Accessibility size={14} />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-ink-faint">{row.applicant.email}</div>
                    </td>
                    <td className="px-3 py-3">
                      <Link
                        href={`/programs/${row.program.slug}/applicants`}
                        className="font-semibold text-brand-600 hover:underline"
                      >
                        {row.program.title}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-ink-faint">
                      {row.referral ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink/[0.04] px-2 py-1 text-xs font-semibold text-ink-soft dark:text-white/80">
                          {row.referral.label ?? row.referral.code}
                        </span>
                      ) : (
                        'Organic'
                      )}
                    </td>
                    <td className="px-3 py-3 text-ink-faint">
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
                        new Date(row.createdAt),
                      )}
                    </td>
                    <td className="max-w-[200px] px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                            STATUS_STYLES[row.status],
                          )}
                        >
                          <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[row.status])} />
                          {row.status[0] + row.status.slice(1).toLowerCase()}
                        </span>
                        {row.decidedBy === 'AUTO' && (
                          <span
                            title="Automatically decided by acceptance criteria"
                            className="inline-flex items-center rounded-full bg-ink/[0.06] px-2 py-0.5 text-[10px] font-bold text-ink-soft dark:text-white/70"
                          >
                            Auto
                          </span>
                        )}
                      </div>
                      {row.status === 'REJECTED' && row.rejectionReason && (
                        <p className="mt-1 truncate text-[11px] text-ink-faint" title={row.rejectionReason}>
                          {row.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      {row.status === 'ACCEPTED' ? (
                        <button
                          type="button"
                          disabled={pendingId === row.id}
                          onClick={() => handleAction(row.id, { attended: !row.attendedAt })}
                          className={cn(
                            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors disabled:opacity-60',
                            row.attendedAt
                              ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300'
                              : 'bg-ink/[0.04] text-ink-soft hover:bg-ink/[0.08] dark:text-white/70',
                          )}
                        >
                          {row.attendedAt && <Check size={12} />}
                          {row.attendedAt ? 'Attended' : 'Mark attended'}
                        </button>
                      ) : (
                        <span className="text-xs text-ink-faint">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {row.status !== 'ACCEPTED' && (
                          <button
                            type="button"
                            disabled={pendingId === row.id}
                            onClick={() => handleAction(row.id, { status: 'ACCEPTED' })}
                            className="flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
                          >
                            <Check size={12} />
                            {row.status === 'REJECTED' ? 'Override: Accept' : 'Accept'}
                          </button>
                        )}
                        {row.status !== 'REJECTED' && (
                          <button
                            type="button"
                            disabled={pendingId === row.id}
                            onClick={() => handleAction(row.id, { status: 'REJECTED' })}
                            className="flex items-center gap-1 rounded-full border border-status-coral/30 px-3 py-1.5 text-xs font-bold text-status-coral transition-colors hover:bg-status-coral/[0.08] disabled:opacity-60"
                          >
                            <X size={12} />
                            {row.status === 'ACCEPTED' ? 'Override: Reject' : 'Reject'}
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
