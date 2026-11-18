
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaHospital,
  FaThLarge,
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaFlask,
  FaFileInvoiceDollar,
  FaCapsules,
  FaBell,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: FaThLarge },
  { name: "Patients", path: "/patients", icon: FaUsers },
  { name: "Doctors", path: "/doctors", icon: FaUserMd },
  { name: "Appointments", path: "/appointments", icon: FaCalendarCheck },
  { name: "Medical Records", path: "/medical-records", icon: FaFileMedical },
  { name: "Prescriptions", path: "/prescriptions", icon: FaPrescriptionBottleAlt },
  { name: "Laboratory", path: "/laboratory", icon: FaFlask },
  { name: "Billing", path: "/billing", icon: FaFileInvoiceDollar },
  { name: "Pharmacy", path: "/pharmacy", icon: FaCapsules },
  { name: "Notifications", path: "/notifications", icon: FaBell },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName =
    user?.firstName || user?.username || "User";

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
          <div className="rounded-xl bg-blue-600 p-3">
            <FaHospital size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold">MediCare HMS</h1>
            <p className="text-xs text-slate-400">
              Hospital Management
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-slate-400 lg:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-800 p-5">
          <p className="text-xs text-slate-500">
            Healthcare Management Platform
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Version 1.0.0
          </p>
        </div>
      </aside>

      {/* Main Section */}
      <div className="min-h-screen lg:ml-72">

        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm sm:px-8">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-slate-600 lg:hidden"
              aria-label="Open sidebar"
            >
              <FaBars size={22} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Hospital Administration
              </h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                Healthcare Management Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {displayName}
              </p>
              <p className="text-xs text-slate-500">
                {user?.role || "Hospital User"}
              </p>
            </div>

            <div className="rounded-full bg-blue-100 p-2 text-blue-700">
              <FaUserCircle size={28} />
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <FaSignOutAlt />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
