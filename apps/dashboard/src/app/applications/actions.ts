'use server';

import { revalidatePath } from 'next/cache';
import type { ApplicationListItem, ApplicationStatus } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function updateApplication(
  id: string,
  patch: { status?: ApplicationStatus; attended?: boolean },
): Promise<ApplicationListItem> {
  const res = await fetch(`${process.env.API_URL}/applications/${id}`, {
    method: 'PATCH',
    headers: internalHeaders(),
    body: JSON.stringify(patch),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update application');
  revalidatePath('/applications');
  return data;
}
