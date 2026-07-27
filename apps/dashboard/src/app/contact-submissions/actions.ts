'use server';

import { revalidatePath } from 'next/cache';
import type { ContactSubmissionListItem, ContactSubmissionStatus } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function updateContactSubmission(
  id: string,
  status: ContactSubmissionStatus,
): Promise<ContactSubmissionListItem> {
  const res = await fetch(`${process.env.API_URL}/contact-submissions/${id}`, {
    method: 'PATCH',
    headers: internalHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update submission');
  revalidatePath('/contact-submissions');
  return data;
}
