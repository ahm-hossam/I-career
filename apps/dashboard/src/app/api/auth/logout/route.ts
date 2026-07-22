import { cookies } from 'next/headers';
import { DASHBOARD_SESSION_COOKIE } from '@/lib/auth/session';

export async function POST() {
  (await cookies()).delete(DASHBOARD_SESSION_COOKIE);
  return Response.json({ ok: true });
}
