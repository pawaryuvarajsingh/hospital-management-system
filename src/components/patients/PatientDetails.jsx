
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTint,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";

export default function PatientDetails({ patient, onClose }) {
  if (!patient) return null;

  const details = [
    {
      label: "First Name",
      value: patient.firstName,
      icon: FaUser,
    },
    {
      label: "Last Name",
      value: patient.lastName,
      icon: FaUser,
    },
    {
      label: "Email Address",
      value: patient.email,
      icon: FaEnvelope,
    },
    {
      label: "Phone Number",
      value: patient.phone,
      icon: FaPhone,
    },
    {
      label: "Age",
      value: patient.age || "Not provided",
      icon: FaBirthdayCake,
    },
    {
      label: "Gender",
      value: patient.gender || "Not provided",
      icon: FaVenusMars,
    },
    {
      label: "Blood Group",
      value: patient.bloodGroup || "Not provided",
      icon: FaTint,
    },
    {
      label: "Address",
      value: patient.address || "Not provided",
      icon: FaMapMarkerAlt,
    },
  ];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
      <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Patient Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Patient ID: {patient.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-100 p-3 text-slate-600 hover:bg-slate-200"
            aria-label="Close patient details"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4 rounded-xl bg-blue-50 p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              {patient.firstName?.charAt(0)}
              {patient.lastName?.charAt(0)}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {patient.firstName} {patient.lastName}
              </h3>
              <p className="text-sm text-slate-500">
                Patient Record
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {details.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-blue-600">
                    <Icon size={15} />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {detail.label}
                    </span>
                  </div>

                  <p className="wrap-break-words text-sm font-medium text-slate-800">
                    {detail.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 p-6">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
