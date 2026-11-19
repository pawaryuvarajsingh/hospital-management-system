
import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaSearch,
  FaSync,
  FaTrash,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

import PatientForm from "../../components/patients/PatientForm";
import PatientTable from "../../components/patients/PatientTable";
import PatientDetails from "../../components/patients/PatientDetails";

import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from "../../services/patientService";

const STORAGE_KEY = "hms_patients";
const DELETED_KEY = "hms_deleted_patients";

function mapApiPatient(patient) {
  return {
    id: patient.id,
    firstName: patient.firstName || "",
    lastName: patient.lastName || "",
    email: patient.email || "",
    phone: patient.phone || "",
    age: patient.age || "",
    gender:
      patient.gender?.toLowerCase() === "male"
        ? "Male"
        : patient.gender?.toLowerCase() === "female"
          ? "Female"
          : patient.gender || "",
    bloodGroup: patient.bloodGroup || "",
    address:
      typeof patient.address === "string"
        ? patient.address
        : patient.address?.address || "",
  };
}

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewPatient, setViewPatient] = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);

  // Load patients
  const loadPatients = async () => {
    setLoading(true);

    try {
      const savedPatients = localStorage.getItem(STORAGE_KEY);

      if (savedPatients) {
        setPatients(JSON.parse(savedPatients));
      } else {
        const apiPatients = await getPatients();
        const formattedPatients = apiPatients.map(mapApiPatient);

        setPatients(formattedPatients);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(formattedPatients)
        );
      }
    } catch (error) {
      console.error("Patient loading error:", error);

      const savedPatients = localStorage.getItem(STORAGE_KEY);

      if (savedPatients) {
        setPatients(JSON.parse(savedPatients));
        toast.info("Loaded saved patient records.");
      } else {
        toast.error("Unable to load patients. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // Save patients in localStorage
  const savePatients = (updatedPatients) => {
    setPatients(updatedPatients);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPatients)
    );
  };

  // Refresh patients from API
  const refreshPatients = async () => {
    setLoading(true);

    try {
      const apiPatients = await getPatients();
      const formattedPatients = apiPatients.map(mapApiPatient);

      const savedPatients = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      const deletedIds = JSON.parse(
        localStorage.getItem(DELETED_KEY) || "[]"
      );

      const availableApiPatients = formattedPatients.filter(
        (patient) => !deletedIds.includes(patient.id)
      );

      const savedPatientMap = new Map(
        savedPatients.map((patient) => [patient.id, patient])
      );

      const refreshedPatients = availableApiPatients.map(
        (patient) => savedPatientMap.get(patient.id) || patient
      );

      const apiIds = new Set(
        refreshedPatients.map((patient) => patient.id)
      );

      const localPatients = savedPatients.filter(
        (patient) => !apiIds.has(patient.id) && patient.id > 100
      );

      const finalPatients = [
        ...localPatients,
        ...refreshedPatients,
      ];

      savePatients(finalPatients);
      setCurrentPage(1);

      toast.success("Patient records refreshed successfully!");
    } catch (error) {
      console.error("Patient refresh error:", error);
      toast.error("Unable to refresh records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add patient
  const handleAddPatient = async (formData) => {
    setSaving(true);

    try {
      let newPatient;

      try {
        const apiResponse = await addPatient(formData);

        newPatient = {
          ...formData,
          id: apiResponse.id,
        };
      } catch (apiError) {
        console.error("Demo API create failed:", apiError);

        newPatient = {
          ...formData,
          id: Date.now(),
        };
      }

      savePatients([newPatient, ...patients]);
      setCurrentPage(1);

      toast.success("Patient registered successfully!");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to register patient.");
    } finally {
      setSaving(false);
    }
  };

  // Update patient
  const handleUpdatePatient = async (formData) => {
    setSaving(true);

    try {
      if (selectedPatient.id <= 100) {
        try {
          await updatePatient(selectedPatient.id, formData);
        } catch (apiError) {
          console.error("Demo API update failed:", apiError);
        }
      }

      const updatedPatients = patients.map((patient) =>
        patient.id === selectedPatient.id
          ? { ...patient, ...formData }
          : patient
      );

      savePatients(updatedPatients);

      toast.success("Patient updated successfully!");

      setShowForm(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error(error);
      toast.error("Unable to update patient.");
    } finally {
      setSaving(false);
    }
  };

  // Confirm patient deletion
  const handleDeletePatient = async () => {
    if (!patientToDelete || saving) return;

    const patient = patientToDelete;

    setSaving(true);

    try {
      if (patient.id <= 100) {
        try {
          await deletePatient(patient.id);
        } catch (apiError) {
          console.error("Demo API delete failed:", apiError);
        }

        const deletedIds = JSON.parse(
          localStorage.getItem(DELETED_KEY) || "[]"
        );

        if (!deletedIds.includes(patient.id)) {
          localStorage.setItem(
            DELETED_KEY,
            JSON.stringify([...deletedIds, patient.id])
          );
        }
      }

      const updatedPatients = patients.filter(
        (item) => item.id !== patient.id
      );

      savePatients(updatedPatients);

      toast.success("Patient deleted successfully!");
      setPatientToDelete(null);
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete patient.");
    } finally {
      setSaving(false);
    }
  };

  // Search patients
  const filteredPatients = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return patients.filter((patient) => {
      const fullName =
        `${patient.firstName || ""} ${patient.lastName || ""}`.toLowerCase();

      const searchableFields = [
        fullName,
        patient.firstName,
        patient.lastName,
        patient.email,
        patient.phone,
        patient.id,
        patient.age,
        patient.bloodGroup,
        patient.gender,
      ];

      return searchableFields.some((field) =>
        String(field ?? "").toLowerCase().includes(searchText)
      );
    });
  }, [patients, search]);

  // Reset pagination
  useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize]);

  const totalPages = Math.ceil(filteredPatients.length / pageSize);

  useEffect(() => {
    if (currentPage > Math.max(totalPages, 1)) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * pageSize;

  const endIndex = Math.min(
    startIndex + pageSize,
    filteredPatients.length
  );

  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + pageSize
  );

  // Form submission
  const handleFormSubmit = (formData) => {
    if (selectedPatient) {
      handleUpdatePatient(formData);
    } else {
      handleAddPatient(formData);
    }
  };

  const openEditForm = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Patient Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Register, manage, and view hospital patient records.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedPatient(null);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <FaUserPlus />
          Register Patient
        </button>
      </div>

      {/* Patient Statistics */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-4 text-blue-600">
            <FaUsers size={25} />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Patients
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-800">
              {patients.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Search and Refresh */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, phone, ID, age, blood group or gender..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          onClick={refreshPatients}
          disabled={loading || saving}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <FaSync className={loading ? "animate-spin" : ""} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Patient Records */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Patient Records
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredPatients.length === 0 ? 0 : startIndex + 1}
              {" - "}
              {endIndex} of {filteredPatients.length} patients
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="pageSize"
              className="text-sm font-medium text-slate-600"
            >
              Records per page:
            </label>

            <select
              id="pageSize"
              value={pageSize}
              onChange={(event) =>
                setPageSize(Number(event.target.value))
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading patient records...
            </p>
          </div>
        ) : (
          <>
            <PatientTable
              patients={currentPatients}
              onView={setViewPatient}
              onEdit={openEditForm}
              onDelete={setPatientToDelete}
            />

            {/* Pagination */}
            {filteredPatients.length > 0 && (
              <div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page {currentPage} of {Math.max(totalPages, 1)}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((page) => Math.max(page - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft size={12} />
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-slate-200 text-slate-600 hover:bg-blue-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(page + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <FaChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* Add and Edit Form */}
      {showForm && (
        <PatientForm
          initialData={selectedPatient}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
          loading={saving}
        />
      )}

      {/* Patient Details */}
      {viewPatient && (
        <PatientDetails
          patient={viewPatient}
          onClose={() => setViewPatient(null)}
        />
      )}

      {/* Centered Delete Confirmation Dialog */}
      {patientToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="flex flex-col items-center text-center">

              {/* Delete Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <FaTrash className="text-2xl text-red-600" />
              </div>

              {/* Heading */}
              <h2 className="mt-5 text-xl font-bold text-slate-800">
                Are you sure?
              </h2>

              {/* Message */}
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Do you really want to delete{" "}
                <strong className="text-slate-800">
                  {patientToDelete.firstName}{" "}
                  {patientToDelete.lastName}
                </strong>
                's patient record?
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Patient ID: #{patientToDelete.id}
              </p>

              <p className="mt-2 text-xs font-medium text-red-500">
                This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="mt-7 grid w-full grid-cols-2 gap-3">

                <button
                  onClick={() => setPatientToDelete(null)}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  onClick={handleDeletePatient}
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
