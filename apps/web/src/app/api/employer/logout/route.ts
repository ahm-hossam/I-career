import { cookies } from 'next/headers';
import { EMPLOYER_SESSION_COOKIE } from '@/lib/auth/employer-session';

export async function POST() {
  (await cookies()).delete(EMPLOYER_SESSION_COOKIE);
  return Response.json({ ok: true });
}
