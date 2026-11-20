
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Patients from "../pages/patients/Patients";
import Doctors from "../pages/doctors/Doctors";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-600">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}

function ComingSoon() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800">
        Module Coming Soon
      </h1>

      <p className="mt-3 text-slate-500">
        This hospital management module will be developed in upcoming modules.
      </p>

      <p className="mt-5 text-sm font-semibold text-blue-600">
        MediCare HMS
      </p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      {/* Guest Routes */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        }
      />

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Module 3 - Patient Management */}
          <Route
            path="/patients"
            element={<Patients />}
          />

          {/* Module 4 - Doctor Management */}
          <Route
            path="/doctors"
            element={<Doctors />}
          />

          {/* Upcoming Modules */}
          <Route
            path="*"
            element={<ComingSoon />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
