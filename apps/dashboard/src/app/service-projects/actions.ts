'use server';

import { revalidatePath } from 'next/cache';
import type { PublicServiceProject, ServiceProjectInput } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createServiceProject(input: ServiceProjectInput): Promise<PublicServiceProject> {
  const res = await fetch(`${process.env.API_URL}/service-projects`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to add project');
  revalidatePath('/service-projects');
  revalidatePath('/');
  return data;
}

export async function updateServiceProject(
  id: string,
  input: Partial<ServiceProjectInput>,
): Promise<PublicServiceProject> {
  const res = await fetch(`${process.env.API_URL}/service-projects/${id}`, {
    method: 'PATCH',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update project');
  revalidatePath('/service-projects');
  revalidatePath('/');
  return data;
}

export async function deleteServiceProject(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/service-projects/${id}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to remove project');
  }
  revalidatePath('/service-projects');
  revalidatePath('/');
}

export async function uploadServiceProjectLogo(formData: FormData): Promise<{ url: string }> {
  const res = await fetch(`${process.env.API_URL}/uploads`, {
    method: 'POST',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Upload failed');
  return data;
}
