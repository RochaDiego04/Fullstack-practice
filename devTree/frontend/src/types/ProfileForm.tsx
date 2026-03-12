import type { User } from "./User";

export type ProfileForm = Pick<User, "handle" | "description">;
