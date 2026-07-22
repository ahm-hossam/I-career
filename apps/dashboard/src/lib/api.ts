import type { PasswordResetRequestSummary, PublicProgram, PublicUser } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN! };
}

export async function fetchUsers(): Promise<PublicUser[]> {
  const res = await fetch(`${process.env.API_URL}/users`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchResetRequests(): Promise<PasswordResetRequestSummary[]> {
  const res = await fetch(`${process.env.API_URL}/password-reset-requests`, { headers: internalHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchPrograms(): Promise<PublicProgram[]> {
  const res = await fetch(`${process.env.API_URL}/programs`, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items;
}

export async function fetchProgram(slug: string): Promise<PublicProgram | null> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.program;
}
