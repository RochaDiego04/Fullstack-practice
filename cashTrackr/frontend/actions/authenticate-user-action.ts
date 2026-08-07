"use server";

import { ErrorSchema, LoginSchema } from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function authenticate(
  _prevState: Pick<ActionStateType, "errors">,
  formData: FormData,
) {
  const loginCredentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const auth = LoginSchema.safeParse(loginCredentials);

  if (!auth.success) {
    return {
      errors: auth.error.issues.map((error) => error.message),
    };
  }

  const url = `${process.env.API_URL}/auth/login`;
  const { email, password } = auth.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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

  // set cookie if successfull login
  (await cookies()).set({
    name: "CASHTRACKR_TOKEN",
    value: json,
    httpOnly: true, // only server code can execute this
    path: "/",
  });

  redirect("/admin");
}
