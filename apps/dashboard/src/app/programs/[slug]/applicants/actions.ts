'use server';

import { revalidatePath } from 'next/cache';
import type { ApplicationStatus, PublicProgramApplication } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function updateApplicant(
  slug: string,
  applicationId: string,
  patch: { status?: ApplicationStatus; attended?: boolean },
): Promise<PublicProgramApplication> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}/applicants/${applicationId}`, {
    method: 'PATCH',
    headers: internalHeaders(),
    body: JSON.stringify(patch),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update applicant');
  revalidatePath(`/programs/${slug}/applicants`);
  return data;
}
