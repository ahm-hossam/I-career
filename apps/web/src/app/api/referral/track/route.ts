import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('ref');
  const slug = searchParams.get('slug');
  if (!code || !slug) {
    return Response.json({ ok: false }, { status: 400 });
  }

  await fetch(`${process.env.API_URL}/programs/${slug}/track-click`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  }).catch(() => {});

  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  };
  cookieStore.set(`referral_${slug}`, code, cookieOptions);
  cookieStore.set('referral_code', code, cookieOptions);

  return Response.json({ ok: true });
}
