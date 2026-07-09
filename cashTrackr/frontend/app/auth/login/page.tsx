import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Cashtrackr - Log in",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Log in</h1>
      <p className="text-3xl font-bold">
        and take control of your{" "}
        <span className="text-amber-500">finances</span>
      </p>
      <LoginForm />
    </>
  );
}
