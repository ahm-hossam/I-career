'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import { useLocale } from '@/lib/i18n/locale-context';

const inputClass =
  'rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500';

export function LoginForm() {
  const { setUser } = useAuth();
  const { open, close } = useAuthModal();
  const router = useRouter();
  const { t } = useLocale();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? t('auth.invalidCredentials'));
        return;
      }
      setUser(data.user);
      close();
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
        {t('auth.password')}
        <div className="relative">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${inputClass} w-full pe-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
            className="absolute inset-y-0 end-3 flex items-center text-ink-faint hover:text-ink"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      <button
        type="button"
        onClick={() => open('forgot')}
        className="self-start text-sm font-semibold text-brand-600 hover:underline"
      >
        {t('auth.forgotPassword')}
      </button>

      {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t('auth.loggingIn') : t('auth.logIn')}
      </button>

      <p className="text-center text-sm text-ink-soft">
        {t('auth.dontHaveAccount')}{' '}
        <button type="button" onClick={() => open('signup')} className="font-semibold text-brand-600 hover:underline">
          {t('auth.signUpLink')}
        </button>
      </p>
    </form>
  );
}
