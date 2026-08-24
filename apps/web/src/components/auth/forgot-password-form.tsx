'use client';

import { useState } from 'react';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import { useLocale } from '@/lib/i18n/locale-context';

const inputClass =
  'rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500';

export function ForgotPasswordForm() {
  const { open } = useAuthModal();
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-ink-soft">{t('auth.forgotSuccessMessage')}</p>
        <button
          type="button"
          onClick={() => open('login')}
          className="self-start text-sm font-semibold text-brand-600 hover:underline"
        >
          {t('auth.forgotBackToLogin')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-ink-soft">{t('auth.forgotEnterEmail')}</p>

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
        {t('auth.emailAddress')}
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t('auth.submitting') : t('auth.forgotSubmitRequest')}
      </button>

      <p className="text-center text-sm text-ink-soft">
        {t('auth.forgotRememberedPassword')}{' '}
        <button type="button" onClick={() => open('login')} className="font-semibold text-brand-600 hover:underline">
          {t('auth.logInLink')}
        </button>
      </p>
    </form>
  );
}
