
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaXmark } from "react-icons/fa6";

import { initialAppointmentForm } from "../../data/appointmentData";
import { appointmentValidationSchema } from "../../utils/appointmentValidationSchema";

export default function AppointmentForm({
  isOpen,
  onClose,
  onSubmit,
  editingAppointment,
  patients = [],
  doctors = [],
  saving = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(appointmentValidationSchema),
    defaultValues: initialAppointmentForm,
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        ...initialAppointmentForm,
        ...(editingAppointment || {}),
        patientId: editingAppointment?.patientId
          ? String(editingAppointment.patientId)
          : "",
        doctorId: editingAppointment?.doctorId
          ? String(editingAppointment.doctorId)
          : "",
      });
    }
  }, [isOpen, editingAppointment, reset]);

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editingAppointment
                ? "Edit Appointment"
                : "Book New Appointment"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the appointment information below
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
          >
            <FaXmark />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Patient */}
            <div>
              <label className={labelClass}>
                Select Patient *
              </label>

              <select
                {...register("patientId")}
                className={inputClass}
              >
                <option value="">Select Patient</option>

                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>

              {errors.patientId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.patientId.message}
                </p>
              )}
            </div>

            {/* Doctor */}
            <div>
              <label className={labelClass}>
                Select Doctor *
              </label>

              <select
                {...register("doctorId")}
                className={inputClass}
              >
                <option value="">Select Doctor</option>

                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.firstName} {doctor.lastName}
                    {doctor.specialization
                      ? ` - ${doctor.specialization}`
                      : ""}
                  </option>
                ))}
              </select>

              {errors.doctorId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.doctorId.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className={labelClass}>
                Appointment Date *
              </label>

              <input
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                {...register("appointmentDate")}
                className={inputClass}
              />

              {errors.appointmentDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.appointmentDate.message}
                </p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className={labelClass}>
                Appointment Time *
              </label>

              <input
                type="time"
                {...register("appointmentTime")}
                className={inputClass}
              />

              {errors.appointmentTime && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.appointmentTime.message}
                </p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className={labelClass}>
                Appointment Type *
              </label>

              <select
                {...register("appointmentType")}
                className={inputClass}
              >
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Routine Checkup">Routine Checkup</option>
                <option value="Surgery Consultation">
                  Surgery Consultation
                </option>
              </select>

              {errors.appointmentType && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.appointmentType.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className={labelClass}>
                Appointment Status *
              </label>

              <select
                {...register("status")}
                className={inputClass}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              {errors.status && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Appointment Reason *
              </label>

              <textarea
                rows={3}
                placeholder="Enter the reason for appointment"
                {...register("reason")}
                className={inputClass}
              />

              {errors.reason && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.reason.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className={labelClass}>
                Additional Notes
              </label>

              <textarea
                rows={3}
                placeholder="Enter additional notes (optional)"
                {...register("notes")}
                className={inputClass}
              />

              {errors.notes && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.notes.message}
                </p>
              )}
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingAppointment
                  ? "Update Appointment"
                  : "Book Appointment"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
