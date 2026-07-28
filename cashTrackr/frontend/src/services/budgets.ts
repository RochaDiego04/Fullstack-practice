import { cache } from "react";
import getToken from "../auth/token";
import { notFound } from "next/navigation";
import { BudgetAPIResponseSchema } from "../schemas";

export const getBudgetById = cache(async (budgetId: string) => {
  const token = await getToken();
  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!req.ok) {
    notFound();
  }

  const json = await req.json();
  return BudgetAPIResponseSchema.parse(json);
});
