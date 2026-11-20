
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FaXmark,
  FaCamera,
  FaUserDoctor,
  FaTrashCan,
} from "react-icons/fa6";

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
  const [profileImage, setProfileImage] = useState("");
  const [imageError, setImageError] = useState("");

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

      setProfileImage(editingDoctor?.profileImage || "");
      setImageError("");
    }
  }, [isOpen, editingDoctor, reset]);

  if (!isOpen) return null;

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 400;

        let width = image.width;
        let height = image.height;

        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          setImageError("Unable to process this image.");
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        const compressedImage = canvas.toDataURL(
          "image/jpeg",
          0.75
        );

        setProfileImage(compressedImage);
      };

      image.onerror = () => {
        setImageError("Unable to load this image.");
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      setImageError("Unable to read this image.");
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage("");
    setImageError("");
  };

  const handleFormSubmit = (formData) => {
    onSubmit({
      ...formData,
      profileImage,
    });
  };

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

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6"
        >
          {/* Profile Picture */}
          <div className="mb-8 flex flex-col items-center rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-6">
            <div className="relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Doctor profile preview"
                  className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow-lg">
                  <FaUserDoctor className="text-5xl" />
                </div>
              )}

              <label
                htmlFor="doctor-profile-image"
                className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
                title="Upload profile picture"
              >
                <FaCamera />
              </label>
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-800">
              Doctor Profile Picture
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG or other image formats · Maximum 5 MB
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <label
                htmlFor="doctor-profile-image"
                className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FaCamera className="mr-2 inline" />
                {profileImage ? "Change Photo" : "Upload Photo"}
              </label>

              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <FaTrashCan className="mr-2 inline" />
                  Remove Photo
                </button>
              )}
            </div>

            <input
              id="doctor-profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imageError && (
              <p className="mt-3 text-xs font-medium text-red-600">
                {imageError}
              </p>
            )}
          </div>

          {/* Doctor Information */}
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
                    <option value="">
                      Select {field.label}
                    </option>

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
                    min={
                      field.name === "experience"
                        ? 0
                        : undefined
                    }
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

          {/* Footer */}
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
