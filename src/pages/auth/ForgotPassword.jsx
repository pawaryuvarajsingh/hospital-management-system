
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FaHospital } from "react-icons/fa";

import { forgotPasswordSchema } from "../../utils/validationSchemas";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    const users = JSON.parse(
      localStorage.getItem("hospital_registered_users") || "[]"
    );

    const userExists = users.some(
      (user) => user.email === data.email
    );

    if (!userExists) {
      toast.error("No registered account found with this email.");
      return;
    }

    // Demo only: a real reset must use a server-generated,
    // single-use, expiring token delivered through email.
    toast.info(
      "Account found. Email-based password reset will be connected later."
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-700">
            <FaHospital size={32} />
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Forgot Password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your registered email address to begin
            the password recovery process.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter your registered email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            Submit
          </button>
        </form>

        <Link
          to="/login"
          className="mt-7 block text-center text-sm font-semibold text-blue-600"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
