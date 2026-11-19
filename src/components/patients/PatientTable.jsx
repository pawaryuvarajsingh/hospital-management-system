
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUser,
} from "react-icons/fa";

export default function PatientTable({
  patients,
  onView,
  onEdit,
  onDelete,
}) {
  if (patients.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <FaUser className="mx-auto text-4xl text-slate-300" />

        <h3 className="mt-4 text-lg font-bold text-slate-700">
          No Patients Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Patient records will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {/* Scrollable Patient Records */}
      <div className="max-h-[125] overflow-auto">
        <table className="w-full min-w-212.5 text-left">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Blood Group</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                      {patient.firstName?.charAt(0)}
                      {patient.lastName?.charAt(0)}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {patient.firstName} {patient.lastName}
                      </p>

                      <p className="text-xs text-slate-400">
                        ID: {patient.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {patient.email}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {patient.phone}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {patient.age || "—"}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {patient.gender || "—"}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-lg bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
                    {patient.bloodGroup || "—"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(patient)}
                      title="View Patient"
                      className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                    >
                      <FaEye />
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(patient)}
                      title="Edit Patient"
                      className="rounded-lg bg-amber-50 p-2 text-amber-600 transition hover:bg-amber-100"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(patient)}
                      title="Delete Patient"
                      className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
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
    </div>
  );
}
