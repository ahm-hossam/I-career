'use server';

import { revalidatePath } from 'next/cache';
import type { ProgramInput, PublicProgram } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createProgram(input: ProgramInput): Promise<PublicProgram> {
  const res = await fetch(`${process.env.API_URL}/programs`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to create program');
  revalidatePath('/programs');
  return data;
}

export async function updateProgram(slug: string, input: ProgramInput): Promise<PublicProgram> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}`, {
    method: 'PUT',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update program');
  revalidatePath('/programs');
  return data;
}

export async function deleteProgram(slug: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/programs/${slug}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to delete program');
  }
  revalidatePath('/programs');
}

export async function uploadProgramImage(formData: FormData): Promise<{ url: string }> {
  const res = await fetch(`${process.env.API_URL}/uploads`, {
    method: 'POST',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Upload failed');
  return data;
}
