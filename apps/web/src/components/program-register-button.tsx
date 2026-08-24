'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Clock, Info, Loader2, X } from 'lucide-react';
import type { MyApplicationStatus, PublicProgramForm } from '@i-career/types';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import { ApplyFormModal } from '@/components/apply-form-modal';
import { trackLead } from '@/lib/facebook-pixel';
import { useLocale } from '@/lib/i18n/locale-context';

export function ProgramRegisterButton({
  slug,
  form,
  initialApplication,
}: {
  slug: string;
  form: PublicProgramForm | null;
  initialApplication: MyApplicationStatus | null;
}) {
  const { user } = useAuth();
  const { open } = useAuthModal();
  const router = useRouter();
  const { t } = useLocale();
  const [modalOpen, setModalOpen] = useState(false);
  const [application, setApplication] = useState<MyApplicationStatus | null>(initialApplication);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [reasonOpen, setReasonOpen] = useState(false);
  const reasonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reasonOpen) return;
    const onClick = (e: MouseEvent) => {
      if (reasonRef.current && !reasonRef.current.contains(e.target as Node)) setReasonOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [reasonOpen]);

  async function submitApplication(answers?: Record<string, string | string[]>) {
    setStatus('submitting');
    try {
      const res = await fetch(`/api/programs/${slug}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.message ?? t('programRegister.somethingWentWrongRetry'));
        return;
      }
      setStatus('idle');
      setModalOpen(false);
      setApplication({
        id: 'pending',
        status: data.status ?? 'PENDING',
        rejectionReason: data.rejectionReason ?? null,
        attendedAt: null,
        createdAt: new Date().toISOString(),
      });
      trackLead();
      router.refresh();
    } catch {
      setStatus('error');
      setMessage(t('programRegister.somethingWentWrongRetry'));
    }
  }

  function handleClick() {
    if (!user) {
      // A "Register" click from a guest most likely means they don't have an account
      // yet — send them to sign up rather than log in.
      open('signup');
      return;
    }
    if (form) {
      setModalOpen(true);
      return;
    }
    void submitApplication();
  }

  if (application) {
    if (application.status === 'ACCEPTED' && application.attendedAt) {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-6 py-3 text-sm font-bold text-brand-700">
          <Check size={16} />
          {t('programRegister.attended')}
        </span>
      );
    }
    if (application.status === 'ACCEPTED') {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-6 py-3 text-sm font-bold text-brand-700">
          <Check size={16} />
          {t('programRegister.accepted')}
        </span>
      );
    }
    if (application.status === 'REJECTED') {
      return (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-ink/[0.06] px-6 py-3 text-sm font-bold text-ink-soft">
            <X size={16} />
            {t('programRegister.notSelected')}
          </span>
          {application.rejectionReason && (
            <div ref={reasonRef} className="relative">
              <button
                type="button"
                onClick={() => setReasonOpen((v) => !v)}
                aria-label={t('programRegister.whyNotSelected')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink-faint transition-colors hover:bg-ink/[0.04] hover:text-ink"
              >
                <Info size={15} />
              </button>
              <AnimatePresence>
                {reasonOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute end-0 top-[calc(100%+8px)] z-20 w-64 rounded-xl border border-ink/[0.06] bg-white p-3.5 shadow-xl"
                  >
                    <p className="text-xs font-semibold text-ink">{t('programRegister.whyNotSelected')}</p>
                    <p className="mt-1 text-xs leading-snug text-ink-soft">{application.rejectionReason}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-6 py-3 text-sm font-bold text-ink">
        <Clock size={16} />
        {t('programRegister.applicationUnderReview')}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' && <Loader2 size={16} className="animate-spin" />}
        {t('programRegister.register')}
      </button>
      {status === 'error' && message && <p className="text-sm font-medium text-status-coral">{message}</p>}
      {modalOpen && form && (
        <ApplyFormModal
          fields={form.fields}
          submitting={status === 'submitting'}
          error={status === 'error' ? message : null}
          onClose={() => setModalOpen(false)}
          onSubmit={(answers) => void submitApplication(answers)}
        />
      )}
    </div>
  );
}
