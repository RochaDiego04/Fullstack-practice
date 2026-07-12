import type { Metadata } from "next";
import ForgotPasswordForm from "../../../components/auth/ForgotPasswordForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cashtrackr - Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Forgot Password?</h1>
      <p className="text-3xl font-bold">
        here you can
        <span className="text-amber-500"> recover it</span>
      </p>
      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col">
        <Link href="/auth/login" className="text-center text-gray-500">
          Do you have an account? Log in
        </Link>
        <Link href="/auth/register" className="text-center text-gray-500">
          You dont have an account? Sign up
        </Link>
      </nav>
    </>
  );
}
