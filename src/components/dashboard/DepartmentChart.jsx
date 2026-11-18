
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { departmentData } from "../../data/dashboardData";

const COLORS = [
  "#2563eb",
  "#0d9488",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
];

export default function DepartmentChart() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Department Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Patient distribution by department
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentData}
              dataKey="patients"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={100}
              innerRadius={55}
              paddingAngle={3}
            >
              {departmentData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={45}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
