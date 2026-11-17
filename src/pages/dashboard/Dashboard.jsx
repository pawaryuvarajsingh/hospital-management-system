
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-800">
            Hospital Dashboard
          </h1>

          <p className="mt-3 text-slate-600">
            Welcome, {user?.firstName || user?.username}!
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Your authentication is working.
          </p>

          <button
            onClick={logout}
            className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
