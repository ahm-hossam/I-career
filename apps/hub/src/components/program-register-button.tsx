'use client';

import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';

export function ProgramRegisterButton({ slug }: { slug: string }) {
  const { user } = useAuth();
  const { open } = useAuthModal();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'applied' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function handleClick() {
    if (!user) {
      open('login');
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`/api/programs/${slug}/apply`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.message ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('applied');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  if (status === 'applied') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-6 py-3 text-sm font-bold text-brand-700">
        <Check size={16} />
        Applied
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
        Register
      </button>
      {status === 'error' && message && <p className="text-sm font-medium text-status-coral">{message}</p>}
    </div>
  );
}
