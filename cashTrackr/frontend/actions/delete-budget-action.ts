"use server";

import getToken from "@/src/auth/token";
import {
  ErrorSchema,
  PasswordValidationSchema,
  SuccessSchema,
} from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";
import { revalidatePath } from "next/cache";

export async function deleteBudget(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const budgetId = Number(formData.get("budgetId"));

  if (!Number.isInteger(budgetId) || budgetId <= 0) {
    return {
      errors: ["Invalid budget"],
      success: "",
    };
  }

  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get("password"),
  );

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = await getToken();
  const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`;

  const password = currentPassword.data;

  let checkPasswordReq: Response;
  try {
    checkPasswordReq = await fetch(checkPasswordUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password,
      }),
    });
  } catch (error) {
    if (error instanceof TypeError && error.cause) {
      throw new Error(
        `Could not reach the API at ${checkPasswordUrl} — is the backend server running? (${error.cause})`,
      );
    }
    throw error;
  }

  const checkPasswordJson = await checkPasswordReq.json();

  if (!checkPasswordReq.ok) {
    const errors = ErrorSchema.parse(checkPasswordJson);
    return { errors, success: "" };
  }

  const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`;

  let deleteBudgetReq: Response;
  try {
    deleteBudgetReq = await fetch(deleteBudgetUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof TypeError && error.cause) {
      throw new Error(
        `Could not reach the API at ${deleteBudgetUrl} — is the backend server running? (${error.cause})`,
      );
    }
    throw error;
  }

  const deleteBudgetJson = await deleteBudgetReq.json();

  if (!deleteBudgetReq.ok) {
    const errors = ErrorSchema.parse(deleteBudgetJson);
    return { errors, success: "" };
  }

  const { message } = SuccessSchema.parse(deleteBudgetJson);

  return {
    errors: [],
    success: message,
  };
}
