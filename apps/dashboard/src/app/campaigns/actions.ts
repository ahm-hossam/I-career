'use server';

import { revalidatePath } from 'next/cache';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createCampaign(input: {
  programSlug?: string;
  code: string;
  label: string;
  source: string;
  campaignName?: string;
}): Promise<{ code: string }> {
  const res = await fetch(`${process.env.API_URL}/campaigns`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to create campaign');
  revalidatePath('/campaigns');
  return data;
}

export async function deleteCampaign(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/campaigns/${id}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to remove campaign');
  }
  revalidatePath('/campaigns');
}
