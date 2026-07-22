'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, KeyRound, Plus, Trash2, UserPlus, X } from 'lucide-react';
import type { PublicDashboardUser } from '@i-career/types';
import { cn } from '@i-career/utils';
import { useLocale } from '@/lib/i18n/locale-context';
import {
  createDashboardUser,
  deleteDashboardUser,
  resetDashboardUserPassword,
  updateDashboardUser,
} from '@/app/team/actions';

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function PasswordRevealModal({
  title,
  subtitle,
  password,
  onClose,
}: {
  title: string;
  subtitle: string;
  password: string;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  return (
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
        <h3 className="text-base font-bold text-ink dark:text-white">{title}</h3>
        <p className="mt-1 text-sm text-ink-faint">{subtitle}</p>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border-subtle bg-ink/[0.03] px-3 py-2.5 dark:bg-white/[0.04]">
          <code className="flex-1 truncate font-mono text-sm text-ink dark:text-white">{password}</code>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(password);
              setCopied(true);
            }}
            className="flex shrink-0 items-center gap-1 rounded-full border border-border-subtle px-2.5 py-1 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] dark:text-white/75"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? t('team.copied') : t('team.copy')}
          </button>
        </div>

        <p className="mt-3 text-xs text-ink-faint">{t('team.revealHint')}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
        >
          {t('team.done')}
        </button>
      </motion.div>
    </motion.div>
  );
}

export function TeamView({ users }: { users: PublicDashboardUser[] }) {
  const { t } = useLocale();
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<{ title: string; subtitle: string; password: string } | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { user, password } = await createDashboardUser({ name, email, role: 'ADMIN' });
      setAddOpen(false);
      setName('');
      setEmail('');
      setRevealed({
        title: t('team.accountCreatedTitle'),
        subtitle: t('team.passwordFor', { name: user.name }),
        password,
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResetPassword(user: PublicDashboardUser) {
    if (!confirm(t('team.resetPasswordConfirm', { name: user.name }))) return;
    setPendingId(user.id);
    try {
      const { password } = await resetDashboardUserPassword(user.id);
      setRevealed({
        title: t('team.passwordResetTitle'),
        subtitle: t('team.newPasswordFor', { name: user.name }),
        password,
      });
    } finally {
      setPendingId(null);
    }
  }

  async function handleToggleActive(user: PublicDashboardUser) {
    setPendingId(user.id);
    try {
      await updateDashboardUser(user.id, { active: !user.active });
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  async function handleRemove(user: PublicDashboardUser) {
    if (!confirm(t('team.removeUserConfirm', { name: user.name }))) return;
    setPendingId(user.id);
    try {
      await deleteDashboardUser(user.id);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">{t('team.title')}</h1>
          <p className="mt-1 text-ink-faint">{t('team.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          <UserPlus size={16} />
          {t('team.addUser')}
        </button>
      </div>

      <div className="mt-6 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        {users.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-faint">{t('team.noUsers')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-2.5 text-start font-bold">{t('team.columnName')}</th>
                  <th className="px-3 py-2.5 text-start font-bold">{t('team.columnEmail')}</th>
                  <th className="px-3 py-2.5 text-start font-bold">{t('team.columnRole')}</th>
                  <th className="px-3 py-2.5 text-start font-bold">{t('team.columnStatus')}</th>
                  <th className="px-3 py-2.5 text-start font-bold">{t('team.columnActions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="border-t border-border-subtle transition-colors hover:bg-ink/[0.025] dark:hover:bg-white/[0.03]"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                          {user.name.slice(0, 1).toUpperCase()}
                        </span>
                        <span className="font-semibold text-ink dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-ink-faint">{user.email}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center rounded-full bg-ink/[0.04] px-2.5 py-1 text-xs font-bold text-ink-soft dark:bg-white/5 dark:text-white/80">
                        {t('team.roleAdmin')}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        disabled={pendingId === user.id}
                        onClick={() => handleToggleActive(user)}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition-colors disabled:opacity-60',
                          user.active
                            ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300'
                            : 'bg-status-coral/10 text-status-coral',
                        )}
                      >
                        <span className={cn('h-1.5 w-1.5 rounded-full', user.active ? 'bg-brand-500' : 'bg-status-coral')} />
                        {user.active ? t('team.statusActive') : t('team.statusInactive')}
                      </button>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={pendingId === user.id}
                          onClick={() => handleResetPassword(user)}
                          className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
                        >
                          <KeyRound size={13} />
                          {t('team.resetPassword')}
                        </button>
                        <button
                          type="button"
                          disabled={pendingId === user.id}
                          onClick={() => handleRemove(user)}
                          aria-label={t('team.removeUser')}
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
        )}
      </div>

      <AnimatePresence>
        {addOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            onClick={() => setAddOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-border-subtle bg-surface p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-ink dark:text-white">{t('team.addUserTitle')}</h3>
                <button
                  type="button"
                  onClick={() => setAddOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint hover:bg-ink/[0.05] hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
                  {t('team.columnName')}
                  <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
                  {t('team.columnEmail')}
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
                  {t('team.columnRole')}
                  <select disabled value="ADMIN" className={cn(inputClass, 'opacity-70')}>
                    <option value="ADMIN">{t('team.roleAdmin')}</option>
                  </select>
                </label>

                {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus size={15} />
                  {submitting ? t('team.creating') : t('team.createAccount')}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {revealed && (
          <PasswordRevealModal
            title={revealed.title}
            subtitle={revealed.subtitle}
            password={revealed.password}
            onClose={() => setRevealed(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
