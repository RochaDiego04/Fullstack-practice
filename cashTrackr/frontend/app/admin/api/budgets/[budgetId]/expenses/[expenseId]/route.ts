import { verifyUserSession } from "@/src/auth/dal";
import getToken from "@/src/auth/token";

// REST API so we can fetch data on a client component
export async function GET(
  request: Request,
  { params }: { params: Promise<{ budgetId: string; expenseId: string }> },
) {
  await verifyUserSession();
  const token = await getToken();
  const { budgetId, expenseId } = await params;
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;
  let req: Response;
  try {
    req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof TypeError && error.cause) {
      throw new Error(
        `Could not reach the API at ${url} — is the backend server running? (${error.cause})`,
      );
    }
    throw error;
  }

  const json = await req.json();

  if (!req.ok) {
    return Response.json(json.error, { status: 403 });
  }

  return Response.json(json);
}
