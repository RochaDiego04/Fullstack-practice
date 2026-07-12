import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cashtrackr - Create account",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Create account</h1>
      <p className="text-3xl font-bold">
        and take control of your
        <span className="text-amber-500"> finances</span>
      </p>
      <RegisterForm />

      <nav className="mt-10 flex flex-col">
        <Link href="/auth/login" className="text-center text-gray-500">
          Do you have an account? Log in
        </Link>
      </nav>
    </>
  );
}
