import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types/LoginForm";
import api from "../config/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";

const loginFormValues: LoginForm = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: loginFormValues });

  async function handleLogin(formData: LoginForm) {
    try {
      const { data } = await api.post("/auth/login", formData);
      toast.success(data);
      navigate("/admin");
      reset();
    } catch (error) {
      if (isAxiosError(error) && error) {
        console.error(error.response?.data.error);
        toast.error(error.response?.data.error);
      }
    }
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Log In</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Log In"
        />
      </form>
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
