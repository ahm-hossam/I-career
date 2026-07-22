import { cookies } from 'next/headers';
import { HUB_SESSION_COOKIE } from '@/lib/auth/session';

export async function POST(req: Request) {
  const body = await req.json();

  const apiRes = await fetch(`${process.env.API_URL}/hub-auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await apiRes.json();
  if (!apiRes.ok) {
    return Response.json(data, { status: apiRes.status });
  }

  const { user, token } = data;
  (await cookies()).set(HUB_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ user });
}
