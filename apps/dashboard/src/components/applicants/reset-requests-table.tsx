'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, KeyRound } from 'lucide-react';
import type { PasswordResetRequestSummary } from '@i-career/types';
import { cn } from '@i-career/utils';
import { useLocale } from '@/lib/i18n/locale-context';
import { resolveResetRequest } from '@/app/applicants/actions';

const STATUS_STYLES = {
  PENDING: 'bg-accent-500/10 text-accent-500',
  RESOLVED: 'bg-brand-500/10 text-brand-700 dark:text-brand-300',
} as const;

const STATUS_DOT = {
  PENDING: 'bg-accent-500',
  RESOLVED: 'bg-brand-500',
} as const;

export function ResetRequestsTable({ requests }: { requests: PasswordResetRequestSummary[] }) {
  const { t, locale } = useLocale();
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<{ name: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const sorted = useMemo(
    () => [...requests].sort((a, b) => (a.status === b.status ? 0 : a.status === 'PENDING' ? -1 : 1)),
    [requests],
  );

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(iso));

  async function handleGenerate(request: PasswordResetRequestSummary) {
    setPendingId(request.id);
    try {
      const { newPassword } = await resolveResetRequest(request.id);
      setRevealed({ name: `${request.user.firstName} ${request.user.lastName}`, password: newPassword });
    } finally {
      setPendingId(null);
    }
  }

  function closeReveal() {
    setRevealed(null);
    setCopied(false);
    router.refresh();
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-3xl border border-border-subtle bg-surface p-8 text-center text-sm text-ink-faint shadow-sm">
        {t('applicants.noRequests')}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnName')}</th>
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnRequested')}</th>
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnStatus')}</th>
                <th className="px-3 py-2.5 text-start font-bold">{t('applicants.columnAction')}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="border-t border-border-subtle transition-colors hover:bg-ink/[0.025] dark:hover:bg-white/[0.03]"
                >
                  <td className="px-3 py-3">
                    <div className="font-semibold text-ink dark:text-white">
                      {row.user.firstName} {row.user.lastName}
                    </div>
                    <div className="text-xs text-ink-faint">{row.user.email}</div>
                  </td>
                  <td className="px-3 py-3 text-ink-faint">{formatDate(row.createdAt)}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                        STATUS_STYLES[row.status],
                      )}
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full', STATUS_DOT[row.status])} />
                      {t(`applicants.status${row.status === 'PENDING' ? 'Pending' : 'Resolved'}`)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {row.status === 'PENDING' && (
                      <button
                        type="button"
                        disabled={pendingId === row.id}
                        onClick={() => handleGenerate(row)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <KeyRound size={13} />
                        {pendingId === row.id ? t('applicants.generating') : t('applicants.generatePassword')}
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm rounded-2xl border border-border-subtle bg-surface p-6 shadow-2xl"
            >
              <h3 className="text-base font-bold text-ink dark:text-white">{t('applicants.newPasswordTitle')}</h3>
              <p className="mt-1 text-sm text-ink-faint">{revealed.name}</p>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-border-subtle bg-ink/[0.03] px-3 py-2.5 dark:bg-white/[0.04]">
                <code className="flex-1 truncate font-mono text-sm text-ink dark:text-white">{revealed.password}</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(revealed.password);
                    setCopied(true);
                  }}
                  className="flex shrink-0 items-center gap-1 rounded-full border border-border-subtle px-2.5 py-1 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] dark:text-white/75"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? t('applicants.copied') : t('applicants.copy')}
                </button>
              </div>

              <p className="mt-3 text-xs text-ink-faint">{t('applicants.newPasswordHint')}</p>

              <button
                type="button"
                onClick={closeReveal}
                className="mt-5 w-full rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                {t('applicants.done')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
