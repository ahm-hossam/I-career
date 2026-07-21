'use server';

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
