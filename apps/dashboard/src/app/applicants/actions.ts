'use server';

import { revalidatePath } from 'next/cache';

export async function resolveResetRequest(id: string): Promise<{ newPassword: string }> {
  const res = await fetch(`${process.env.API_URL}/password-reset-requests/${id}/resolve`, {
    method: 'POST',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    throw new Error('Failed to resolve reset request');
  }
  return res.json();
}

export async function setUserArchived(id: string, archived: boolean): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' },
    body: JSON.stringify({ archived }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to update user');
  }
  revalidatePath('/applicants');
  revalidatePath(`/applicants/users/${id}`);
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to remove user');
  }
  revalidatePath('/applicants');
}
