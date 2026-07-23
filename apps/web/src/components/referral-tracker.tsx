'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export function ReferralTracker({ slug }: { slug?: string }) {
  const searchParams = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (!ref || fired.current) return;
    fired.current = true;
    const url = slug
      ? `/api/referral/track?ref=${encodeURIComponent(ref)}&slug=${encodeURIComponent(slug)}`
      : `/api/referral/track?ref=${encodeURIComponent(ref)}`;
    fetch(url).catch(() => {});
  }, [searchParams, slug]);

  return null;
}
