"use server";

import getToken from "@/src/auth/token";
import {
  ErrorSchema,
  SuccessSchema,
  UpdatePasswordSchema,
} from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";

export async function updatePassword(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const userPassword = UpdatePasswordSchema.safeParse({
    current_password: formData.get("current_password"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  if (!userPassword.success) {
    const errors = userPassword.error.issues.map((issue) => issue.message);
    return { errors, success: "" };
  }

  const token = await getToken();
  const url = `${process.env.API_URL}/auth/update-password`;
  const { current_password, password } = userPassword.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        current_password: current_password,
        password: password,
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

  // TODO: Send email to users saying that its password got updated

  const { message } = SuccessSchema.parse(json);
  return { errors: [], success: message };
}
