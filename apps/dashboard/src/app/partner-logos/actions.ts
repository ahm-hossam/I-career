'use server';

import { revalidatePath } from 'next/cache';
import type { PartnerLogoInput, PublicPartnerLogo } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createPartnerLogo(input: PartnerLogoInput): Promise<PublicPartnerLogo> {
  const res = await fetch(`${process.env.API_URL}/partner-logos`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to add logo');
  revalidatePath('/partner-logos');
  revalidatePath('/');
  return data;
}

export async function updatePartnerLogo(
  id: string,
  input: Partial<PartnerLogoInput>,
): Promise<PublicPartnerLogo> {
  const res = await fetch(`${process.env.API_URL}/partner-logos/${id}`, {
    method: 'PATCH',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update logo');
  revalidatePath('/partner-logos');
  revalidatePath('/');
  return data;
}

export async function deletePartnerLogo(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/partner-logos/${id}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to remove logo');
  }
  revalidatePath('/partner-logos');
  revalidatePath('/');
}

export async function uploadPartnerLogoImage(formData: FormData): Promise<{ url: string }> {
  const res = await fetch(`${process.env.API_URL}/uploads`, {
    method: 'POST',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Upload failed');
  return data;
}
