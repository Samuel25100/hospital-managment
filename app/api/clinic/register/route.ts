
export async function POST(request: Request) {
  const data = await request.json();
  console.log(">>>>>Received clinic registration data:", data, "<<<<<<");
  // Process the registration data
  return new Response(JSON.stringify({ success: true }), { status: 201 });
}