import type { Metadata } from "next";
import ForgotPasswordForm from "../../../components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Cashtrackr - Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Forgot Password?</h1>
      <p className="text-3xl font-bold">
        here you can
        <span className="text-amber-500">recover it</span>
      </p>
      <ForgotPasswordForm />
    </>
  );
}
