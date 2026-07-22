import { cookies } from 'next/headers';
import { getHubSessionToken } from '@/lib/auth/hub-session';

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = await getHubSessionToken();
  if (!token) {
    return Response.json({ message: 'You must be logged in to apply.' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const referralCookie = (await cookies()).get(`referral_${slug}`)?.value;

  const apiRes = await fetch(`${process.env.API_URL}/programs/${slug}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...body, referralCode: body.referralCode ?? referralCookie }),
  });

  const data = await apiRes.json();
  return Response.json(data, { status: apiRes.status });
}
