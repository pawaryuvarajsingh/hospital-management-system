
import {
  FaXmark,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaUserDoctor,
  FaGraduationCap,
  FaBriefcase,
  FaIdBadge,
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
      icon: <FaUserDoctor />,
    },
    {
      label: "Qualification",
      value: doctor.qualification,
      icon: <FaGraduationCap />,
    },
    {
      label: "Experience",
      value: `${doctor.experience ?? 0} Years`,
      icon: <FaBriefcase />,
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

  const initials = `${doctor.firstName?.charAt(0) || ""}${doctor.lastName?.charAt(0) || ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
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

          {/* Doctor Profile */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 p-7 text-center">

            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100/50" />
            <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-indigo-100/40" />

            <div className="relative mx-auto h-28 w-28">
              {doctor.profileImage ? (
                <img
                  src={doctor.profileImage}
                  alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-3xl font-bold text-white shadow-lg">
                  {initials || <FaUserDoctor />}
                </div>
              )}
            </div>

            <div className="relative">
              <h3 className="mt-4 text-xl font-bold text-slate-800">
                Dr. {doctor.firstName} {doctor.lastName}
              </h3>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                {doctor.specialization}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                  <FaIdBadge className="text-blue-600" />
                  ID: #{doctor.id}
                </span>

                <span
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                    availabilityStyle[doctor.availability] ||
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {doctor.availability || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Information Heading */}
          <div className="mb-4 mt-7">
            <h3 className="text-base font-bold text-slate-800">
              Personal and Professional Information
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Doctor contact and professional details
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="text-blue-600">
                    {item.icon}
                  </span>

                  {item.label}
                </div>

                <p className="mt-2 wrap-break-word text-sm font-semibold text-slate-800">
                  {item.value || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
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
