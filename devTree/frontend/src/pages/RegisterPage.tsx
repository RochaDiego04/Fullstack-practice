import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

type RegisterForm = {
  name: string;
  email: string;
  handle: string;
  password: string;
  password_confirmation: string;
};

const registerFormValues = {
  name: "",
  email: "",
  handle: "",
  password: "",
  password_confirmation: "",
};

export default function RegisterPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: registerFormValues });

  function handleRegister() {
    console.log("From handleRegister");
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create Account</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("name", { required: "Please fill the name field" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", { required: "Please fill the email field" })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("handle", {
              required: "Please fill the handle field",
            })}
          />
          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "Please fill the password field",
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repetir Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password_confirmation", {
              required: "Please confirm your password",
            })}
          />
          {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Crear Cuenta"
        />
      </form>

      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block"
          to="/auth/register"
        >
          Already have an account? Log in
        </Link>
      </nav>
    </>
  );
}
