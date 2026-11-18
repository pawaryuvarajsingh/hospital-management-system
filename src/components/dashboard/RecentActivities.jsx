
import {
  FaUserPlus,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaFlask,
} from "react-icons/fa";

import { recentActivities } from "../../data/dashboardData";

const activityIcons = {
  patient: FaUserPlus,
  appointment: FaCalendarCheck,
  billing: FaMoneyBillWave,
  laboratory: FaFlask,
};

const activityColors = {
  patient: "bg-blue-100 text-blue-600",
  appointment: "bg-purple-100 text-purple-600",
  billing: "bg-emerald-100 text-emerald-600",
  laboratory: "bg-orange-100 text-orange-600",
};

export default function RecentActivities() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Activities
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest hospital updates
        </p>
      </div>

      <div className="space-y-5">
        {recentActivities.map((activity) => {
          const Icon = activityIcons[activity.type];

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <div
                className={`rounded-xl p-3 ${
                  activityColors[activity.type]
                }`}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-slate-800">
                  {activity.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs font-medium text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
