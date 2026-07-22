export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';

  const apiRes = await fetch(`${process.env.API_URL}/employer-auth/companies?q=${encodeURIComponent(q)}`);
  const data = await apiRes.json();
  return Response.json(data, { status: apiRes.status });
}
