"use server";

import getToken from "@/src/auth/token";
import {
  ErrorSchema,
  ProfileFormSchema,
  SuccessSchema,
  UpdatePasswordSchema,
} from "@/src/schemas";
import { ActionStateType } from "@/src/types/ActionStateStype";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  _prevState: ActionStateType,
  formData: FormData,
) {
  const profile = ProfileFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!profile.success) {
    return {
      errors: profile.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = await getToken();
  const url = `${process.env.API_URL}/auth/update-profile`;
  const { name, email } = profile.data;

  let req: Response;
  try {
    req = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
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

  revalidatePath("/admin/profile/settings");

  const { message } = SuccessSchema.parse(json);
  return { errors: [], success: message };
}
