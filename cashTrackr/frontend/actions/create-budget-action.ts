"use server";

import { DraftBudgetSchema, ErrorSchema, SuccessSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";
import { cookies } from "next/headers";

export async function createBudget(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get("name"),
    amount: formData.get("amount"),
  });

  if (!budget.success) {
    return {
      errors: budget.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = (await cookies()).get("CASHTRACKR_TOKEN")?.value;
  const url = `${process.env.API_URL}/budgets`;

  const { name, amount } = budget.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        amount,
      }),
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
    const errors = ErrorSchema.parse(json);
    return { errors, success: "" };
  }

  const { message } = SuccessSchema.parse(json);

  return {
    errors: [],
    success: message,
  };
}
