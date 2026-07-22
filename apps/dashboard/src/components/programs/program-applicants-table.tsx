'use client';

import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import type { ProgramFormField, PublicProgramApplication } from '@i-career/types';
import { cn } from '@i-career/utils';
import { updateApplicant } from '@/app/programs/[slug]/applicants/actions';

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

export function ProgramApplicantsTable({
  slug,
  applicants,
  formFields,
}: {
  slug: string;
  applicants: PublicProgramApplication[];
  formFields: ProgramFormField[];
}) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const labelFor = (fieldId: string) => formFields.find((f) => f.id === fieldId)?.label ?? fieldId;

  const sorted = [...applicants].sort((a, b) => (a.status === b.status ? 0 : a.status === 'PENDING' ? -1 : 1));

  async function handleAction(id: string, patch: { status?: 'ACCEPTED' | 'REJECTED'; attended?: boolean }) {
    setPendingId(id);
    try {
      await updateApplicant(slug, id, patch);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (applicants.length === 0) {
    return (
      <div className="rounded-3xl border border-border-subtle bg-surface p-8 text-center text-sm text-ink-faint shadow-sm">
        No one has registered for this program yet.
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
              <th className="px-3 py-2.5 text-start font-bold">Applicant</th>
              <th className="px-3 py-2.5 text-start font-bold">Referral</th>
              <th className="px-3 py-2.5 text-start font-bold">Applied</th>
              <th className="px-3 py-2.5 text-start font-bold">Status</th>
              <th className="px-3 py-2.5 text-start font-bold">Attended</th>
              <th className="px-3 py-2.5 text-start font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <Fragment key={row.id}>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="border-t border-border-subtle transition-colors hover:bg-ink/[0.025] dark:hover:bg-white/[0.03]"
                >
                  <td className="px-3 py-3">
                    <div className="font-semibold text-ink dark:text-white">
                      {row.applicant.firstName} {row.applicant.lastName}
                    </div>
                    <div className="text-xs text-ink-faint">{row.applicant.email}</div>
                    {row.answers && Object.keys(row.answers).length > 0 && (
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                        className="mt-1 flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline"
                      >
                        {expanded === row.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {expanded === row.id ? 'Hide answers' : 'View answers'}
                      </button>
                    )}
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
                    {row.status === 'PENDING' && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={pendingId === row.id}
                          onClick={() => handleAction(row.id, { status: 'ACCEPTED' })}
                          className="flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
                        >
                          <Check size={12} />
                          Accept
                        </button>
                        <button
                          type="button"
                          disabled={pendingId === row.id}
                          onClick={() => handleAction(row.id, { status: 'REJECTED' })}
                          className="flex items-center gap-1 rounded-full border border-status-coral/30 px-3 py-1.5 text-xs font-bold text-status-coral transition-colors hover:bg-status-coral/[0.08] disabled:opacity-60"
                        >
                          <X size={12} />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
                {expanded === row.id && row.answers && (
                  <tr className="border-t border-border-subtle bg-ink/[0.02] dark:bg-white/[0.02]">
                    <td colSpan={6} className="px-3 py-3">
                      <dl className="grid gap-2 sm:grid-cols-2">
                        {Object.entries(row.answers).map(([fieldId, value]) => (
                          <div key={fieldId} className="text-xs">
                            <dt className="font-semibold text-ink-faint">{labelFor(fieldId)}</dt>
                            <dd className="text-ink dark:text-white/90">
                              {Array.isArray(value) ? value.join(', ') : value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
