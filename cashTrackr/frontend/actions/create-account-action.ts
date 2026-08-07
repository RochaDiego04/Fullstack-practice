"use server";

import { ErrorSchema, RegisterSchema, SuccessSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";

export async function register(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const registerData = {
    email: formData.get("email"),
    name: formData.get("name"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  };

  const register = RegisterSchema.safeParse(registerData);

  // check for errors
  if (!register.success) {
    const errors = register.error.issues.map((error) => error.message);
    return { errors, success: "" };
  }

  const url = `${process.env.API_URL}/auth/create-account`;
  const { name, password, email } = register.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
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
  return { errors: [], success: message };
}
