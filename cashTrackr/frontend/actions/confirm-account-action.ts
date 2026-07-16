"use server";

import { ConfirmTokenSchema, ErrorSchema, SuccessSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";

export async function confirmAccount(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const confirmToken = ConfirmTokenSchema.safeParse({
    token: formData.get("token"),
  });

  // check for errors
  if (!confirmToken.success) {
    const errors = confirmToken.error.issues.map((error) => error.message);
    return { errors, success: "" };
  }

  const url = `${process.env.API_URL}/auth/confirm-account`;
  const { token } = confirmToken.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
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
