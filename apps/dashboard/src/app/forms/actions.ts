'use server';

import { revalidatePath } from 'next/cache';
import type { ProgramFormInput, PublicProgramForm } from '@i-career/types';

function internalHeaders() {
  return { 'x-internal-token': process.env.INTERNAL_API_TOKEN!, 'Content-Type': 'application/json' };
}

export async function createProgramForm(input: ProgramFormInput): Promise<PublicProgramForm> {
  const res = await fetch(`${process.env.API_URL}/program-forms`, {
    method: 'POST',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to create form');
  revalidatePath('/forms');
  return data;
}

export async function updateProgramForm(id: string, input: ProgramFormInput): Promise<PublicProgramForm> {
  const res = await fetch(`${process.env.API_URL}/program-forms/${id}`, {
    method: 'PUT',
    headers: internalHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to update form');
  revalidatePath('/forms');
  return data;
}

export async function deleteProgramForm(id: string): Promise<void> {
  const res = await fetch(`${process.env.API_URL}/program-forms/${id}`, {
    method: 'DELETE',
    headers: { 'x-internal-token': process.env.INTERNAL_API_TOKEN! },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message ?? 'Failed to delete form');
  }
  revalidatePath('/forms');
}
