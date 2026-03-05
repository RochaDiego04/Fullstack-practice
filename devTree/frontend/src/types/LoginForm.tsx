import type { User } from "./User";

export type LoginForm = Pick<User, "email"> & {
  password: string;
};
