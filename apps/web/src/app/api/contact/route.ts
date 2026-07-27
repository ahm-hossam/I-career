export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const apiRes = await fetch(`${process.env.API_URL}/contact-submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await apiRes.json();
  return Response.json(data, { status: apiRes.status });
}
