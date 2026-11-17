
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FaHospital } from "react-icons/fa";

import { resetPasswordSchema } from "../../utils/validationSchemas";

export default function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    // Demo only. A real reset requires a verified,
    // single-use token from the backend.
    const users = JSON.parse(
      localStorage.getItem("hospital_registered_users") || "[]"
    );

    const updatedUsers = users.map((user) => ({
      ...user,
      // Do not update a password without a verified reset token.
    }));

    localStorage.setItem(
      "hospital_registered_users",
      JSON.stringify(updatedUsers)
    );

    toast.info(
      "Password reset requires a verified email link. Backend integration is pending."
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
            Reset Password
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            New Password
          </label>

          <input
            type="password"
            {...register("password")}
            placeholder="Enter new password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>

          <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">
            Confirm New Password
          </label>

          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            Reset Password
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
