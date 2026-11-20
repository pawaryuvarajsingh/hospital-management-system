import { useState, useEffect, useMemo, useCallback } from "react";

import {
  FaUserDoctor,
  FaUserPlus,
  FaMagnifyingGlass,
  FaRotate,
  FaTrash,
  FaXmark,
  FaUsers,
} from "react-icons/fa6";

import { toast } from "react-toastify";

import DoctorForm from "../../components/doctors/DoctorForm";
import DoctorTable from "../../components/doctors/DoctorTable";
import DoctorDetails from "../../components/doctors/DoctorDetails";

const STORAGE_KEY = "hms_doctors";
const DELETED_KEY = "hms_deleted_doctors";
const VERSION_KEY = "hms_doctors_version";

const specializationOptions = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "General Medicine",
  "Gynecology",
  "Ophthalmology",
  "ENT",
  "Psychiatry",
];

// Separate sample doctor records.
// These records are not fetched from the patient API.
const initialDoctors = [
  {
    id: 101,
    firstName: "Michael",
    lastName: "Williams",
    email: "michael.williams@hospital.com",
    phone: "9876543210",
    specialization: "Cardiology",
    qualification: "MBBS, MD Cardiology",
    experience: 12,
    availability: "Available",
    address: "Chennai, Tamil Nadu",
  },
  {
    id: 102,
    firstName: "Sophia",
    lastName: "Brown",
    email: "sophia.brown@hospital.com",
    phone: "9876543211",
    specialization: "Neurology",
    qualification: "MBBS, DM Neurology",
    experience: 10,
    availability: "Available",
    address: "Bengaluru, Karnataka",
  },
  {
    id: 103,
    firstName: "James",
    lastName: "Anderson",
    email: "james.anderson@hospital.com",
    phone: "9876543212",
    specialization: "Dermatology",
    qualification: "MBBS, MD Dermatology",
    experience: 8,
    availability: "On Leave",
    address: "Hyderabad, Telangana",
  },
  {
    id: 104,
    firstName: "Olivia",
    lastName: "Martin",
    email: "olivia.martin@hospital.com",
    phone: "9876543213",
    specialization: "Pediatrics",
    qualification: "MBBS, MD Pediatrics",
    experience: 9,
    availability: "Available",
    address: "Mumbai, Maharashtra",
  },
  {
    id: 105,
    firstName: "William",
    lastName: "Taylor",
    email: "william.taylor@hospital.com",
    phone: "9876543214",
    specialization: "Orthopedics",
    qualification: "MBBS, MS Orthopedics",
    experience: 15,
    availability: "Available",
    address: "Delhi, India",
  },
  {
    id: 106,
    firstName: "Isabella",
    lastName: "Thomas",
    email: "isabella.thomas@hospital.com",
    phone: "9876543215",
    specialization: "Gynecology",
    qualification: "MBBS, MS Gynecology",
    experience: 7,
    availability: "On Leave",
    address: "Pune, Maharashtra",
  },
  {
    id: 107,
    firstName: "Benjamin",
    lastName: "Jackson",
    email: "benjamin.jackson@hospital.com",
    phone: "9876543216",
    specialization: "Ophthalmology",
    qualification: "MBBS, MS Ophthalmology",
    experience: 11,
    availability: "Available",
    address: "Kochi, Kerala",
  },
  {
    id: 108,
    firstName: "Charlotte",
    lastName: "White",
    email: "charlotte.white@hospital.com",
    phone: "9876543217",
    specialization: "ENT",
    qualification: "MBBS, MS ENT",
    experience: 6,
    availability: "Available",
    address: "Vijayawada, Andhra Pradesh",
  },
  {
    id: 109,
    firstName: "Daniel",
    lastName: "Harris",
    email: "daniel.harris@hospital.com",
    phone: "9876543218",
    specialization: "Psychiatry",
    qualification: "MBBS, MD Psychiatry",
    experience: 13,
    availability: "Available",
    address: "Coimbatore, Tamil Nadu",
  },
  {
    id: 110,
    firstName: "Emily",
    lastName: "Clark",
    email: "emily.clark@hospital.com",
    phone: "9876543219",
    specialization: "General Medicine",
    qualification: "MBBS, MD General Medicine",
    experience: 5,
    availability: "Available",
    address: "Hyderabad, Telangana",
  },
];

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  // Save doctors in localStorage.
  const saveDoctors = (updatedDoctors) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDoctors));
      setDoctors(updatedDoctors);
      return true;
    } catch (error) {
      console.error("Error saving doctors:", error);
      toast.error("Unable to save doctor records.");
      return false;
    }
  };

  // Load the separate doctor records.
  const loadDoctors = useCallback(async () => {
    try {
      setLoading(true);

      const savedDoctors = readStorage(STORAGE_KEY, null);
      const version = localStorage.getItem(VERSION_KEY);

      // Replace the old shared DummyJSON doctor list once.
      if (version !== "2") {
        const locallyAddedDoctors = Array.isArray(savedDoctors)
          ? savedDoctors.filter(
              (doctor) =>
                typeof doctor.id === "string" &&
                doctor.id.startsWith("LOCAL-")
            )
          : [];

        const deletedIds = readStorage(DELETED_KEY, []);

        const separateDoctors = [
          ...initialDoctors.filter(
            (doctor) => !deletedIds.includes(doctor.id)
          ),
          ...locallyAddedDoctors,
        ];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(separateDoctors));
        localStorage.setItem(VERSION_KEY, "2");

        setDoctors(separateDoctors);
      } else if (Array.isArray(savedDoctors)) {
        setDoctors(savedDoctors);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDoctors));
        setDoctors(initialDoctors);
      }
    } catch (error) {
      console.error("Error loading doctors:", error);
      toast.error("Unable to load doctor records.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  // Refresh the separate doctor list while preserving local edits.
  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      const savedDoctors = readStorage(STORAGE_KEY, []);
      const deletedIds = readStorage(DELETED_KEY, []);

      const savedDoctorMap = new Map(
        savedDoctors.map((doctor) => [doctor.id, doctor])
      );

      const refreshedDoctors = initialDoctors
        .filter((doctor) => !deletedIds.includes(doctor.id))
        .map((doctor) =>
          savedDoctorMap.has(doctor.id)
            ? savedDoctorMap.get(doctor.id)
            : doctor
        );

      const initialIds = initialDoctors.map((doctor) => doctor.id);

      const locallyAddedDoctors = savedDoctors.filter(
        (doctor) => !initialIds.includes(doctor.id)
      );

      const finalDoctors = [
        ...refreshedDoctors,
        ...locallyAddedDoctors,
      ];

      if (saveDoctors(finalDoctors)) {
        toast.success("Doctor records refreshed successfully.");
      }
    } catch (error) {
      console.error("Error refreshing doctors:", error);
      toast.error("Unable to refresh doctor records.");
    } finally {
      setRefreshing(false);
    }
  };

  // Open add doctor form.
  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setIsFormOpen(true);
  };

  // Open edit doctor form.
  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setIsFormOpen(true);
  };

  // Close doctor form.
  const handleCloseForm = () => {
    if (saving) return;

    setIsFormOpen(false);
    setEditingDoctor(null);
  };

  // Add or update doctor.
  const handleFormSubmit = async (formData) => {
    try {
      setSaving(true);

      if (editingDoctor) {
        const updatedDoctor = {
          ...editingDoctor,
          ...formData,
          experience: Number(formData.experience),
        };

        const updatedDoctors = doctors.map((doctor) =>
          doctor.id === editingDoctor.id ? updatedDoctor : doctor
        );

        if (saveDoctors(updatedDoctors)) {
          toast.success("Doctor updated successfully.");
          setIsFormOpen(false);
          setEditingDoctor(null);
        }
      } else {
        const newDoctor = {
          ...formData,
          id: `LOCAL-${Date.now()}`,
          experience: Number(formData.experience),
        };

        if (saveDoctors([newDoctor, ...doctors])) {
          toast.success("Doctor added successfully.");
          setIsFormOpen(false);
          setEditingDoctor(null);
        }
      }
    } catch (error) {
      console.error("Error saving doctor:", error);
      toast.error("Unable to save doctor details.");
    } finally {
      setSaving(false);
    }
  };

  // Delete doctor.
  const handleDeleteDoctor = async () => {
    if (!doctorToDelete) return;

    try {
      setSaving(true);

      const doctorId = doctorToDelete.id;

      const updatedDoctors = doctors.filter(
        (doctor) => doctor.id !== doctorId
      );

      if (typeof doctorId === "number") {
        const deletedIds = readStorage(DELETED_KEY, []);

        localStorage.setItem(
          DELETED_KEY,
          JSON.stringify([...new Set([...deletedIds, doctorId])])
        );
      }

      if (saveDoctors(updatedDoctors)) {
        setDoctorToDelete(null);
        toast.success("Doctor deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Unable to delete doctor.");
    } finally {
      setSaving(false);
    }
  };

  // Search and filter doctors.
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const search = searchText.toLowerCase().trim();

      const searchableFields = [
        doctor.firstName,
        doctor.lastName,
        `${doctor.firstName} ${doctor.lastName}`,
        doctor.email,
        doctor.phone,
        String(doctor.id),
        doctor.specialization,
        doctor.qualification,
        String(doctor.experience),
        doctor.availability,
      ];

      const matchesSearch =
        !search ||
        searchableFields.some((field) =>
          String(field || "").toLowerCase().includes(search)
        );

      const matchesSpecialization =
        specializationFilter === "All" ||
        doctor.specialization === specializationFilter;

      const matchesAvailability =
        availabilityFilter === "All" ||
        doctor.availability === availabilityFilter;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesAvailability
      );
    });
  }, [
    doctors,
    searchText,
    specializationFilter,
    availabilityFilter,
  ]);

  // Pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(filteredDoctors.length / pageSize)
  );

  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchText,
    specializationFilter,
    availabilityFilter,
    pageSize,
  ]);

  // Doctor statistics.
  const availableCount = doctors.filter(
    (doctor) => doctor.availability === "Available"
  ).length;

  const unavailableCount = doctors.filter(
    (doctor) => doctor.availability === "Unavailable"
  ).length;

  const leaveCount = doctors.filter(
    (doctor) => doctor.availability === "On Leave"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <FaUserDoctor className="text-2xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Doctor Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage hospital doctors and their information
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <FaRotate className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <FaUserPlus />
            Add Doctor
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Doctors
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {doctors.length}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Available
              </p>
              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {availableCount}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
              <FaUserDoctor />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Unavailable
              </p>
              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {unavailableCount}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600">
              <FaUserDoctor />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                On Leave
              </p>
              <h2 className="mt-2 text-3xl font-bold text-amber-600">
                {leaveCount}
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-600">
              <FaUserDoctor />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="font-bold text-slate-800">
            Doctor Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search and filter doctor information
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search name, email, phone, ID..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
            />
          </div>

          <select
            value={specializationFilter}
            onChange={(event) =>
              setSpecializationFilter(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Specializations</option>

            {specializationOptions.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(event) =>
              setAvailabilityFilter(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
          >
            <option value="All">All Availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Doctor Table */}
      {loading ? (
        <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading doctor records...
          </p>
        </div>
      ) : (
        <>
          <DoctorTable
            doctors={paginatedDoctors}
            onView={setSelectedDoctor}
            onEdit={handleEdit}
            onDelete={setDoctorToDelete}
          />

          {/* Pagination */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Rows per page:</span>

              <select
                value={pageSize}
                onChange={(event) =>
                  setPageSize(Number(event.target.value))
                }
                className="rounded-lg border border-slate-200 px-2 py-2 outline-none"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <span>
                {filteredDoctors.length === 0
                  ? "0 records"
                  : `${(currentPage - 1) * pageSize + 1}-${Math.min(
                      currentPage * pageSize,
                      filteredDoctors.length
                    )} of ${filteredDoctors.length}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="px-2 text-sm font-semibold text-slate-700">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add / Edit Doctor */}
      <DoctorForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editingDoctor={editingDoctor}
        saving={saving}
      />

      {/* Doctor Details */}
      <DoctorDetails
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />

      {/* Delete Confirmation */}
      {doctorToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <FaTrash className="text-2xl text-red-600" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-800">
                Are you sure?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Do you really want to delete{" "}
                <strong className="text-slate-800">
                  Dr. {doctorToDelete.firstName}{" "}
                  {doctorToDelete.lastName}
                </strong>
                's doctor record?
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Doctor ID: #{doctorToDelete.id}
              </p>

              <p className="mt-2 text-xs font-medium text-red-500">
                This action cannot be undone.
              </p>

              <div className="mt-7 grid w-full grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDoctorToDelete(null)}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <FaXmark />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteDoctor}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaTrash />
                  {saving ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}