'use server';

import { revalidatePath } from 'next/cache';
import type { DashboardUserInput, PublicDashboardUser } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createDashboardUser(
  input: DashboardUserInput,
): Promise<{ user: PublicDashboardUser; password: string }> {
  const res = await fetch(`${process.env.API_URL}/dashboard-users`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to create user');
  revalidatePath('/team');
  return data;
}

export async function updateDashboardUser(
  id: string,
  patch: { name?: string; role?: string; active?: boolean },
): Promise<PublicDashboardUser> {
  const res = await fetch(`${process.env.API_URL}/dashboard-users/${id}`, {
    method: 'PATCH',
    headers: internalHeaders(),
    body: JSON.stringify(patch),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update user');
  revalidatePath('/team');
  return data;
}

export async function resetDashboardUserPassword(id: string): Promise<{ password: string }> {
  const res = await fetch(`${process.env.API_URL}/dashboard-users/${id}/reset-password`, {
    method: 'POST',
    headers: internalHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to reset password');
  return data;
}

export async function deleteDashboardUser(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/dashboard-users/${id}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to remove user');
  }
  revalidatePath('/team');
}
