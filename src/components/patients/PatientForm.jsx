
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaTimes, FaSave } from "react-icons/fa";

import {
  patientFormFields,
  initialPatientForm,
} from "../../data/patientData";

import { patientValidationSchema } from "../../utils/patientValidationSchema";

export default function PatientForm({
  initialData,
  onSubmit,
  onClose,
  loading = false,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientValidationSchema),
    defaultValues: initialData || initialPatientForm,
  });

  useEffect(() => {
    reset(initialData || initialPatientForm);
  }, [initialData, reset]);

  const renderField = (field) => (
    <div key={field.name}>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {field.label}
      </label>

      {field.type === "select" ? (
        <select
          {...register(field.name)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select {field.label}</option>

          {field.options.map((option) => (
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
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      )}

      {errors[field.name] && (
        <p className="mt-1 text-xs text-red-500">
          {errors[field.name].message}
        </p>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
      <div className="my-auto w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {initialData ? "Edit Patient" : "Register New Patient"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the patient's information below
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg bg-slate-100 p-3 text-slate-600 transition hover:bg-slate-200"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
            {patientFormFields.map(renderField)}
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 p-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave />
              {loading
                ? "Saving..."
                : initialData
                  ? "Update Patient"
                  : "Register Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
