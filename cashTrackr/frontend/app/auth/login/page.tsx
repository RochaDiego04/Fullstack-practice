import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cashtrackr - Log in",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Log in</h1>
      <p className="text-3xl font-bold">
        and take control of your
        <span className="text-amber-500"> finances</span>
      </p>
      <LoginForm />

      <nav className="mt-10 flex flex-col">
        <Link href="/auth/register" className="text-center text-gray-500">
          You dont have an account? Sign up
        </Link>
        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
}
