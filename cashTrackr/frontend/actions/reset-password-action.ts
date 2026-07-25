"use server";

import { ErrorSchema, NewPasswordSchema, SuccessSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";

export async function resetPassword(
  token: string,
  _prevState: ActionStateType,
  formData: FormData,
) {
  const newPassword = NewPasswordSchema.safeParse({
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  // check for errors
  if (!newPassword.success) {
    const errors = newPassword.error.issues.map((issue) => issue.message);
    return { errors, success: "" };
  }

  const url = `${process.env.API_URL}/auth/reset-password/${token}`;
  const { password } = newPassword.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        password,
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
  return { errors: [], success: message };
}
