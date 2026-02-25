import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Log In</h1>
      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to="/auth/register"
        >
          Don't have an account? Sign up
        </Link>
      </nav>
    </>
  );
}
