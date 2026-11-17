
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FaHospital, FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { loginSchema } from "../../utils/validationSchemas";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      await login(data);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Invalid username or password"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

        {/* Left Section */}
        <div className="hidden flex-col justify-center bg-blue-700 p-12 text-white md:flex">

          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-xl bg-white p-3 text-blue-700">
              <FaHospital size={30} />
            </div>

            <h1 className="text-2xl font-bold">
              MediCare HMS
            </h1>
          </div>

          <h2 className="text-4xl font-bold leading-tight">
            Welcome to Smart Hospital Management
          </h2>

          <p className="mt-6 text-lg leading-8 text-blue-100">
            Manage patients, doctors, appointments,
            medical records and hospital operations
            from one centralized platform.
          </p>

          <div className="mt-10 rounded-2xl bg-blue-600 p-5">
            <p className="font-semibold">
              Healthcare Management Platform
            </p>

            <p className="mt-2 text-sm text-blue-100">
              Secure access for administrators,
              doctors, receptionists and patients.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center p-8 sm:p-12">

          <div className="mb-8 text-center md:text-left">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-700 md:hidden">
              <FaHospital size={32} />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to access your hospital dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Username */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                {...register("username")}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-blue-700 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>

          </form>

          {/* Register */}
          <p className="mt-7 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Create Account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs text-slate-400">
            © 2026 MediCare Hospital Management System
          </p>

        </div>
      </div>
    </div>
  );
}
