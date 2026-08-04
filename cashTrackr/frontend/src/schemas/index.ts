import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.email({
      message: "Invalid email address",
    }),
    name: z.string().min(1, { message: "Name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const ConfirmTokenSchema = z.object({
  token: z.string().regex(/^\d{6}$/, { message: "Token must be 6 digits" }),
});

export const SuccessSchema = z.object({
  message: z.string({ message: "Invalid incoming string message" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
});

export const PasswordValidationSchema = z
  .string()
  .min(1, { message: "Invalid password" });

export const NewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "El Nombre del gasto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

// The API returns { error } for business failures and { errors } only from
// handleInputErrors, which reports N field failures at once. Accept both and
// normalize to a list so callers never branch.
export const ErrorSchema = z
  .union([
    z.object({ error: z.string() }),
    z.object({ errors: z.array(z.string()) }),
  ])
  .transform((data) => ("error" in data ? [data.error] : data.errors));

export const LoginSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number(),
});

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema),
});

export const BudgetsAPIResponseSchema = z.array(
  BudgetAPIResponseSchema.omit({ expenses: true }),
); // when we get all the budgets, we dont care about specific expenses on each
// this only when we get an specific budget

export type User = z.infer<typeof UserSchema>;
export type Budget = z.infer<typeof BudgetAPIResponseSchema>;
export type DraftExpense = z.infer<typeof DraftExpenseSchema>;
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>;
