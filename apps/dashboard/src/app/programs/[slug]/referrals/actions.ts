'use server';

import { revalidatePath } from 'next/cache';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createCustomReferralCode(
  slug: string,
  input: { code: string; label: string },
): Promise<{ code: string }> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}/referral-codes`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to create code');
  revalidatePath(`/programs/${slug}/referrals`);
  return data;
}
