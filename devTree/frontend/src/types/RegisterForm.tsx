import type { User } from "./User";

export type RegisterForm = Pick<User, "handle" | "name" | "email"> & {
  password: string;
  password_confirmation: string;
};
