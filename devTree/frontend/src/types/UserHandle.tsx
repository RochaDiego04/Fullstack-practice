import type { User } from "./User";

export type UserHandle = Pick<
  User,
  "description" | "handle" | "image" | "links" | "name"
>;
