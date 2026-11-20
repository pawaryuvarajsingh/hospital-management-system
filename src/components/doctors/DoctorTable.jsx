
import {
  FaEye,
  FaPenToSquare,
  FaTrash,
  FaUserDoctor,
} from "react-icons/fa6";

export default function DoctorTable({
  doctors,
  onView,
  onEdit,
  onDelete,
}) {
  const getAvailabilityStyle = (availability) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-700";

      case "Unavailable":
        return "bg-red-100 text-red-700";

      case "On Leave":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getInitials = (doctor) => {
    return `${doctor.firstName?.charAt(0) || ""}${doctor.lastName?.charAt(0) || ""}`;
  };

  if (!doctors || doctors.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
          <FaUserDoctor className="text-3xl" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-800">
          No Doctors Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          No doctor records match your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Table Heading */}
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold text-slate-800">
            Doctor Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view registered doctors
          </p>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {doctors.length} Records
        </span>
      </div>

      {/* Scrollable Table */}
      <div className="max-h-125 overflow-auto">
        <table className="w-full min-w-212.5 border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Doctor</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Specialization</th>
              <th className="px-5 py-4">Experience</th>
              <th className="px-5 py-4">Availability</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="transition hover:bg-slate-50"
              >
                {/* Doctor Information */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {doctor.profileImage ? (
                      <img
                        src={doctor.profileImage}
                        alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                        className="h-12 w-12 shrink-0 rounded-full border-2 border-blue-100 object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-blue-100 bg-blue-50 text-sm font-bold text-blue-600">
                        {getInitials(doctor) || (
                          <FaUserDoctor className="text-lg" />
                        )}
                      </div>
                    )}

                    <div>
                      <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                        Dr. {doctor.firstName} {doctor.lastName}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        ID: #{doctor.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-5 py-4">
                  <p className="text-sm text-slate-700">
                    {doctor.email}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {doctor.phone}
                  </p>
                </td>

                {/* Specialization */}
                <td className="px-5 py-4">
                  <span className="whitespace-nowrap rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                    {doctor.specialization}
                  </span>
                </td>

                {/* Experience */}
                <td className="px-5 py-4">
                  <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                    {doctor.experience} Years
                  </p>
                </td>

                {/* Availability */}
                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getAvailabilityStyle(
                      doctor.availability
                    )}`}
                  >
                    {doctor.availability}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(doctor)}
                      title="View Doctor"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                    >
                      <FaEye />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(doctor)}
                      title="Edit Doctor"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                    >
                      <FaPenToSquare />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(doctor)}
                      title="Delete Doctor"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
        <p className="text-xs text-slate-500">
          Showing {doctors.length} doctor records
        </p>

        <p className="text-xs font-medium text-slate-400">
          Hospital Management System
        </p>
      </div>
    </div>
  );
}
