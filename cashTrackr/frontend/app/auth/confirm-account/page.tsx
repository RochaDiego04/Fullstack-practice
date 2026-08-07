import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cashtrackr - Confirm your account",
};

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        Confirm your account
      </h1>
      <p className="text-3xl font-bold">
        Enter the code that you received
        <span className="text-amber-500"> on your email</span>
      </p>

      <ConfirmAccountForm />

      <nav className="mt-10 flex flex-col">
        <Link href="/auth/login" className="text-center text-gray-500">
          Already have an account? Log in
        </Link>
      </nav>
    </>
  );
}
