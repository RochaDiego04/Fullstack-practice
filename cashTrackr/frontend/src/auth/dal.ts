import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserSchema } from "../schemas";
import { cache } from "react";

export const getSession = cache(async () => {
  const token = (await cookies()).get("CASHTRACKR_TOKEN")?.value;

  if (!token) {
    return { user: null, isAuth: false as const };
  }

  const url = `${process.env.API_URL}/auth/user`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const session = await req.json();
  const result = UserSchema.safeParse(session);

  if (!result.success) {
    return { user: null, isAuth: false as const };
  }

  return {
    user: result.data,
    isAuth: true as const,
  };
});

export const verifyUserSession = cache(async () => {
  const session = await getSession();

  if (!session.isAuth) {
    redirect("/auth/login");
  }

  return session;
});
