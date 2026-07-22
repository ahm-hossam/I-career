export async function POST(req: Request) {
  const formData = await req.formData();

  const apiRes = await fetch(`${process.env.API_URL}/uploads`, {
    method: 'POST',
    body: formData,
  });

  const data = await apiRes.json();
  return Response.json(data, { status: apiRes.status });
}
