
import {
  FaEye,
  FaPenToSquare,
  FaTrash,
  FaCalendarCheck,
} from "react-icons/fa6";

export default function AppointmentTable({
  appointments = [],
  onView,
  onEdit,
  onDelete,
}) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-purple-100 text-purple-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // Generate a short appointment ID for display
  const getAppointmentId = (appointment) => {
    const id = Number(appointment.id);

    if (Number.isInteger(id) && id > 0 && id < 1000000000) {
      return `APT-${String(id).padStart(4, "0")}`;
    }

    // Give existing timestamp-based IDs a stable short display number
    const existingIndex = appointments.findIndex(
      (item) => item.id === appointment.id
    );

    return `APT-${String(existingIndex + 1).padStart(4, "0")}`;
  };

  // Avoid duplicate Dr. prefix
  const getDoctorName = (doctorName) => {
    const cleanName = (doctorName || "Unknown Doctor").replace(
      /^Dr\.\s*/i,
      ""
    );

    return `Dr. ${cleanName}`;
  };

  if (appointments.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
          <FaCalendarCheck className="text-3xl" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-800">
          No Appointments Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          No appointments match your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-bold text-slate-800">
            Appointment Directory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and view hospital appointments
          </p>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          {appointments.length} Records
        </span>
      </div>

      {/* Scrollable Table */}
      <div className="max-h-125 overflow-auto">
        <table className="w-full min-w-250 border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Appointment</th>
              <th className="px-5 py-4">Patient</th>
              <th className="px-5 py-4">Doctor</th>
              <th className="px-5 py-4">Date & Time</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="transition hover:bg-slate-50"
              >
                {/* Appointment ID */}
                <td className="px-5 py-4">
                  <p className="whitespace-nowrap text-sm font-semibold text-blue-600">
                    {getAppointmentId(appointment)}
                  </p>
                </td>

                {/* Patient */}
                <td className="px-5 py-4">
                  <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                    {appointment.patientName || "Unknown Patient"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    ID: #{appointment.patientId}
                  </p>
                </td>

                {/* Doctor */}
                <td className="px-5 py-4">
                  <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                    {getDoctorName(appointment.doctorName)}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {appointment.specialization || "General"}
                  </p>
                </td>

                {/* Date and Time */}
                <td className="px-5 py-4">
                  <p className="whitespace-nowrap text-sm font-medium text-slate-700">
                    {appointment.appointmentDate}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {appointment.appointmentTime}
                  </p>
                </td>

                {/* Type */}
                <td className="px-5 py-4">
                  <span className="whitespace-nowrap rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                    {appointment.appointmentType}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(appointment)}
                      title="View Appointment"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                    >
                      <FaEye />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(appointment)}
                      title="Edit Appointment"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                    >
                      <FaPenToSquare />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(appointment)}
                      title="Delete Appointment"
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3">
        <p className="text-xs text-slate-500">
          Showing {appointments.length} appointment records
        </p>

        <p className="text-xs font-medium text-slate-400">
          Hospital Management System
        </p>
      </div>
    </div>
  );
}
