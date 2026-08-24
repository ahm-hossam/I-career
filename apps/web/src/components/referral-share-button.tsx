'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Share2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import { useLocale } from '@/lib/i18n/locale-context';

export function ReferralShareButton({ slug }: { slug: string }) {
  const { user } = useAuth();
  const { open: openAuthModal } = useAuthModal();
  const { t } = useLocale();
  const [link, setLink] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!popoverOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setPopoverOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [popoverOpen]);

  async function handleCopy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClick() {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setPopoverOpen((v) => !v);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-5 py-3 text-sm font-bold text-ink-soft transition-colors hover:bg-ink/[0.04]"
      >
        <Share2 size={16} />
        {t('referralShare.referAFriend')}
      </button>

      <AnimatePresence>
        {popoverOpen && user && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-[calc(100%+8px)] z-20 w-72 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-xl"
          >
            {link ? (
              <>
                <p className="text-xs font-semibold text-ink">{t('referralShare.yourReferralLink')}</p>
                <p className="mt-0.5 text-[11px] text-ink-faint">{t('referralShare.inviteFriendHint')}</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <input
                    readOnly
                    value={link}
                    onFocus={(e) => e.target.select()}
                    className="w-full min-w-0 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-xs text-ink-faint"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04]"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? t('referralShare.copied') : t('referralShare.copy')}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-xs text-ink-faint">{t('referralShare.generatingLink')}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
