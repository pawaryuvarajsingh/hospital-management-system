
export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  color,
  trend,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div className={`rounded-2xl p-4 ${color}`}>
          {Icon && <Icon size={25} />}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2">
        <p className="text-xs text-slate-500">
          {description}
        </p>

        {trend && (
          <span className="whitespace-nowrap rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
