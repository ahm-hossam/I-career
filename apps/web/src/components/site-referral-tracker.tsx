'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { ReferralTracker } from '@/components/referral-tracker';

const PROGRAM_DETAIL_PATH = /^\/programs\/[^/]+$/;

export function SiteReferralTracker() {
  const pathname = usePathname();
  // Program detail pages track clicks with full program context via their own ReferralTracker.
  if (PROGRAM_DETAIL_PATH.test(pathname)) return null;

  return (
    <Suspense fallback={null}>
      <ReferralTracker />
    </Suspense>
  );
}
