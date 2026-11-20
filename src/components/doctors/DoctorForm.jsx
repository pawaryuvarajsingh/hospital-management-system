
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaXmark } from "react-icons/fa6";

import {
  doctorFormFields,
  initialDoctorForm,
} from "../../data/doctorData";

import { doctorValidationSchema } from "../../utils/doctorValidationSchema";

export default function DoctorForm({
  isOpen,
  onClose,
  onSubmit,
  editingDoctor,
  saving,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(doctorValidationSchema),
    defaultValues: initialDoctorForm,
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        ...initialDoctorForm,
        ...(editingDoctor || {}),
      });
    }
  }, [isOpen, editingDoctor, reset]);

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {editingDoctor
                ? "Update doctor information"
                : "Enter the details to register a new doctor"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-red-100 hover:text-red-600"
            aria-label="Close form"
          >
            <FaXmark />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {doctorFormFields.map((field) => (
              <div key={field.name}>
                <label className={labelClass}>
                  {field.label}
                  <span className="ml-1 text-red-500">*</span>
                </label>

                {field.type === "select" ? (
                  <select
                    {...register(field.name)}
                    className={inputClass}
                  >
                    <option value="">Select {field.label}</option>

                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                    min={field.name === "experience" ? 0 : undefined}
                    className={inputClass}
                  />
                )}

                {errors[field.name] && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
          </div>

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
                : editingDoctor
                  ? "Update Doctor"
                  : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
