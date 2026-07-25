"use server";

import {
  ErrorSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";
import { ActionStateType } from "../src/types/ActionStateStype";

export async function forgotPassword(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const forgotPassword = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!forgotPassword.success) {
    return {
      errors: forgotPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;
  const { email } = forgotPassword.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
