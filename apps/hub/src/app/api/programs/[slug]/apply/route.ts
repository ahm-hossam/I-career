import { getHubSessionToken } from '@/lib/auth/session';

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const token = await getHubSessionToken();
  if (!token) {
    return Response.json({ message: 'You must be logged in to apply.' }, { status: 401 });
  }

  const apiRes = await fetch(`${process.env.API_URL}/programs/${slug}/apply`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await apiRes.json();
  return Response.json(data, { status: apiRes.status });
}
