import { cookies } from 'next/headers';
import { HUB_SESSION_COOKIE } from '@/lib/auth/session';

export async function POST() {
  (await cookies()).delete(HUB_SESSION_COOKIE);
  return Response.json({ ok: true });
}
