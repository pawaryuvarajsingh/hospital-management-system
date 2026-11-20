
import {
  FaXmark,
  FaCalendarDays,
  FaClock,
  FaUser,
  FaUserDoctor,
  FaClipboardList,
  FaNotesMedical,
} from "react-icons/fa6";

export default function AppointmentDetails({
  appointment,
  onClose,
}) {
  if (!appointment) return null;

  const statusStyles = {
    Scheduled: "bg-blue-100 text-blue-700",
    Confirmed: "bg-green-100 text-green-700",
    Completed: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const details = [
    {
      label: "Patient Name",
      value: appointment.patientName,
      icon: <FaUser />,
    },
    {
      label: "Doctor Name",
      value: `Dr. ${appointment.doctorName || "Unknown Doctor"}`,
      icon: <FaUserDoctor />,
    },
    {
      label: "Appointment Date",
      value: appointment.appointmentDate,
      icon: <FaCalendarDays />,
    },
    {
      label: "Appointment Time",
      value: appointment.appointmentTime,
      icon: <FaClock />,
    },
    {
      label: "Appointment Type",
      value: appointment.appointmentType,
      icon: <FaClipboardList />,
    },
    {
      label: "Specialization",
      value: appointment.specialization || "General",
      icon: null,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Appointment Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete appointment information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
          >
            <FaXmark />
          </button>
        </div>

        <div className="p-6">

          {/* Appointment Summary */}
          <div className="rounded-2xl bg-blue-50 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
              <FaCalendarDays />
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-800">
              APT-{String(appointment.id).padStart(4, "0")}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Hospital Appointment
            </p>

            <span
              className={`mt-4 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold ${
                statusStyles[appointment.status] ||
                "bg-slate-100 text-slate-600"
              }`}
            >
              {appointment.status}
            </span>
          </div>

          {/* Details */}
          <h3 className="mb-4 mt-7 text-base font-bold text-slate-800">
            Appointment Information
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  {item.icon && (
                    <span className="text-blue-600">
                      {item.icon}
                    </span>
                  )}

                  {item.label}
                </div>

                <p className="mt-2 wrap-break-word text-sm font-semibold text-slate-800">
                  {item.value || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          {/* Reason */}
          <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <FaNotesMedical className="text-blue-600" />
              Appointment Reason
            </div>

            <p className="mt-2 wrap-break-word text-sm text-slate-700">
              {appointment.reason || "No reason provided"}
            </p>
          </div>

          {/* Notes */}
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h4 className="text-xs font-semibold text-slate-500">
              Additional Notes
            </h4>

            <p className="mt-2 wrap-break-word text-sm text-slate-700">
              {appointment.notes || "No additional notes"}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
