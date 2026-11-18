
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaBed,
  FaRupeeSign,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import StatCard from "../../components/dashboard/StatCard";
import AppointmentChart from "../../components/dashboard/AppointmentChart";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import RecentActivities from "../../components/dashboard/RecentActivities";

import { dashboardStats } from "../../data/dashboardData";
import { useAuth } from "../../context/AuthContext";

const statIcons = {
  patients: FaUsers,
  doctors: FaUserMd,
  appointments: FaCalendarCheck,
  beds: FaBed,
  revenue: FaRupeeSign,
  billing: FaFileInvoiceDollar,
};

export default function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.firstName || user?.username || "User";

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Hospital Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back, {displayName}! Here's your hospital overview.
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 px-5 py-3">
          <p className="text-xs font-medium text-blue-600">
            Dashboard Status
          </p>
          <p className="mt-1 font-bold text-blue-800">
            System Overview
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-800">
            Hospital Statistics
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Key performance indicators
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              trend={stat.trend}
              color={stat.color}
              icon={statIcons[stat.iconName]}
            />
          ))}
        </div>
      </section>

      {/* Analytics Charts */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-800">
            Hospital Analytics
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Monitor appointments and department performance
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <AppointmentChart />
          <DepartmentChart />
        </div>
      </section>

      {/* Recent Activities */}
      <section>
        <RecentActivities />
      </section>

    </div>
  );
}
