
import {
  FaXmark,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function DoctorDetails({ doctor, onClose }) {
  if (!doctor) return null;

  const details = [
    {
      label: "Email Address",
      value: doctor.email,
      icon: <FaEnvelope />,
    },
    {
      label: "Phone Number",
      value: doctor.phone,
      icon: <FaPhone />,
    },
    {
      label: "Specialization",
      value: doctor.specialization,
      icon: null,
    },
    {
      label: "Qualification",
      value: doctor.qualification,
      icon: null,
    },
    {
      label: "Experience",
      value: `${doctor.experience ?? 0} Years`,
      icon: null,
    },
    {
      label: "Address",
      value: doctor.address || "Not provided",
      icon: <FaLocationDot />,
    },
  ];

  const availabilityStyle = {
    Available: "bg-green-100 text-green-700",
    Unavailable: "bg-red-100 text-red-700",
    "On Leave": "bg-amber-100 text-amber-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Doctor Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Complete doctor information
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
          <div className="flex flex-col items-center rounded-2xl bg-blue-50 p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {doctor.firstName?.charAt(0)}
              {doctor.lastName?.charAt(0)}
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-800">
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>

            <p className="mt-1 text-sm font-medium text-blue-600">
              {doctor.specialization}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Doctor ID: #{doctor.id}
            </p>

            <span
              className={`mt-3 rounded-full px-4 py-1.5 text-xs font-semibold ${
                availabilityStyle[doctor.availability] ||
                "bg-slate-100 text-slate-600"
              }`}
            >
              {doctor.availability || "Not specified"}
            </span>
          </div>

          <h3 className="mb-4 mt-7 text-base font-bold text-slate-800">
            Personal and Professional Information
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  {item.icon && (
                    <span className="text-blue-600">{item.icon}</span>
                  )}
                  {item.label}
                </div>

                <p className="mt-2 wrap-break-word text-sm font-semibold text-slate-800">
                  {item.value || "Not provided"}
                </p>
              </div>
            ))}
          </div>

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
