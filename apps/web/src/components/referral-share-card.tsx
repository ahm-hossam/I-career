'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';

export function ReferralShareCard({ slug }: { slug: string }) {
  const { user } = useAuth();
  const { open } = useAuthModal();
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetch(`/api/programs/${slug}/referral-code`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data.code) {
          setLink(`${window.location.origin}/programs/${slug}?ref=${data.code}`);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, slug]);

  async function handleCopy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!user) {
    return (
      <div className="mt-6 flex flex-col gap-2.5 rounded-2xl border border-dashed border-ink/15 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <Share2 size={15} className="shrink-0 text-ink-faint" />
          <p className="text-xs text-ink-soft">
            <span className="font-semibold text-ink">Have a friend who&apos;d love this?</span> Sign up to get a
            referral link and track who you invite.
          </p>
        </div>
        <button
          type="button"
          onClick={() => open('signup')}
          className="shrink-0 rounded-full border border-ink/10 px-4 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] sm:self-auto"
        >
          Sign up
        </button>
      </div>
    );
  }

  if (!link) return null;

  return (
    <div className="mt-6 flex flex-col gap-2.5 rounded-2xl border border-dashed border-ink/15 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <Share2 size={15} className="shrink-0 text-ink-faint" />
        <p className="text-xs text-ink-soft">
          <span className="font-semibold text-ink">Your referral link</span> — invite a friend, tracked on your
          account.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={link}
          onFocus={(e) => e.target.select()}
          className="w-full min-w-0 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs text-ink-faint sm:w-56"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
