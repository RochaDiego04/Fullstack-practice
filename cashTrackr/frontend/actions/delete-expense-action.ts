"use server";

import getToken from "@/src/auth/token";
import { Budget, ErrorSchema, Expense, SuccessSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";

type BudgetAndExpenseId = {
  budgetId: Budget["id"];
  expenseId: Expense["id"];
};

export async function deleteExpense(
  { budgetId, expenseId }: BudgetAndExpenseId,
  _prevState: ActionStateType,
) {
  const token = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
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
    const errors = ErrorSchema.parse(json);
    return { errors, success: "" };
  }

  const { message } = SuccessSchema.parse(json);

  return {
    errors: [],
    success: message,
  };
}
