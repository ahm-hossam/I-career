'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Check, CheckCheck, Mail, MailOpen } from 'lucide-react';
import type { ContactSubmissionListItem, ContactSubmissionStatus } from '@i-career/types';
import { cn } from '@i-career/utils';
import { ExportButton } from '@/components/export-button';
import { updateContactSubmission } from '@/app/contact-submissions/actions';

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

const STATUS_STYLES = {
  NEW: 'bg-accent-500/10 text-accent-500',
  READ: 'bg-ink/[0.06] text-ink-soft dark:text-white/75',
  RESOLVED: 'bg-brand-500/10 text-brand-700 dark:text-brand-300',
} satisfies Record<ContactSubmissionStatus, string>;

const STATUS_DOT = {
  NEW: 'bg-accent-500',
  READ: 'bg-ink-faint',
  RESOLVED: 'bg-brand-500',
} satisfies Record<ContactSubmissionStatus, string>;

export function ContactSubmissionsView({ submissions }: { submissions: ContactSubmissionListItem[] }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<'ALL' | ContactSubmissionStatus>('ALL');
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(
    () => submissions.filter((s) => statusFilter === 'ALL' || s.status === statusFilter),
    [submissions, statusFilter],
  );

  const exportRows = useMemo(
    () =>
      filtered.map((s) => ({
        Name: s.name,
        Email: s.email,
        Message: s.message,
        Audience: s.audience ?? '',
        Service: s.service ?? '',
        Status: s.status,
        'Received At': s.createdAt,
      })),
    [filtered],
  );

  async function handleStatus(id: string, status: ContactSubmissionStatus) {
    setPendingId(id);
    try {
      await updateContactSubmission(id, status);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Contact Submissions</h1>
        <p className="mt-1 text-ink-faint">Messages submitted through the website&apos;s Contact Us form</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'ALL' | ContactSubmissionStatus)}
          className={cn(inputClass, 'w-auto bg-surface')}
        >
          <option value="ALL">All statuses</option>
          <option value="NEW">New</option>
          <option value="READ">Read</option>
          <option value="RESOLVED">Resolved</option>
        </select>
        <ExportButton filename="contact-submissions.csv" rows={exportRows} />
      </div>

      <div className="mt-6 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <Mail size={28} className="text-ink-faint" />
            <p className="text-sm text-ink-faint">
              {submissions.length === 0 ? 'No messages yet.' : 'No messages match this filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-sm">
              <thead>
                <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-2.5 text-start font-bold">From</th>
                  <th className="px-3 py-2.5 text-start font-bold">Who / Interested in</th>
                  <th className="px-3 py-2.5 text-start font-bold">Message</th>
                  <th className="px-3 py-2.5 text-start font-bold">Received</th>
                  <th className="px-3 py-2.5 text-start font-bold">Status</th>
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
                      <div className="font-semibold text-ink dark:text-white">{row.name}</div>
                      <div className="text-xs text-ink-faint">{row.email}</div>
                    </td>
                    <td className="px-3 py-3 text-ink-faint">
                      <div className="flex flex-col gap-1">
                        {row.audience && (
                          <span className="inline-flex w-fit items-center rounded-full bg-ink/[0.04] px-2 py-0.5 text-xs font-semibold text-ink-soft dark:text-white/80">
                            {row.audience}
                          </span>
                        )}
                        {row.service && <span className="text-xs">{row.service}</span>}
                        {!row.audience && !row.service && '—'}
                      </div>
                    </td>
                    <td className="max-w-xs px-3 py-3 text-ink-faint">
                      <p className="truncate" title={row.message}>
                        {row.message}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-ink-faint">
                      {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(
                        new Date(row.createdAt),
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                          STATUS_STYLES[row.status],
                        )}
                      >
                        <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[row.status])} />
                        {row.status[0] + row.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        {row.status === 'NEW' && (
                          <button
                            type="button"
                            disabled={pendingId === row.id}
                            onClick={() => handleStatus(row.id, 'READ')}
                            className="flex items-center gap-1 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-bold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
                          >
                            <MailOpen size={12} />
                            Mark read
                          </button>
                        )}
                        {row.status !== 'RESOLVED' && (
                          <button
                            type="button"
                            disabled={pendingId === row.id}
                            onClick={() => handleStatus(row.id, 'RESOLVED')}
                            className="flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
                          >
                            <Check size={12} />
                            Resolve
                          </button>
                        )}
                        {row.status === 'RESOLVED' && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-brand-600">
                            <CheckCheck size={13} />
                            Done
                          </span>
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
