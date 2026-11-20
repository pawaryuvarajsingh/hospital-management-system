
import { useEffect, useMemo, useState } from "react";
import {
  FaCalendarCheck,
  FaCalendarDays,
  FaCircleCheck,
  FaClock,
  FaMagnifyingGlass,
  FaPlus,
  FaRotate,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "react-toastify";

import AppointmentForm from "../../components/appointments/AppointmentForm";
import AppointmentTable from "../../components/appointments/AppointmentTable";
import AppointmentDetails from "../../components/appointments/AppointmentDetails";

const APPOINTMENT_KEY = "hms_appointments";
const ITEMS_PER_PAGE = 10;

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deletingAppointment, setDeletingAppointment] = useState(null);

  // Load data from localStorage
  const loadData = () => {
    try {
      const savedAppointments = JSON.parse(
        localStorage.getItem(APPOINTMENT_KEY) || "[]"
      );

      const savedPatients = JSON.parse(
        localStorage.getItem("hms_patients") || "[]"
      );

      const savedDoctors = JSON.parse(
        localStorage.getItem("hms_doctors") || "[]"
      );

      setAppointments(savedAppointments);
      setPatients(savedPatients);
      setDoctors(savedDoctors);
      setCurrentPage(1);
    } catch (error) {
      console.error("Unable to load appointment data:", error);
      toast.error("Unable to load appointment data.");

      setAppointments([]);
      setPatients([]);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Refresh all data
  const handleRefresh = () => {
    loadData();
    toast.success("Appointment data refreshed successfully!");
  };

  // Save appointments
  const saveAppointments = (updatedAppointments) => {
    try {
      localStorage.setItem(
        APPOINTMENT_KEY,
        JSON.stringify(updatedAppointments)
      );

      setAppointments(updatedAppointments);
      return true;
    } catch (error) {
      console.error("Unable to save appointments:", error);
      toast.error("Unable to save appointment. Please try again.");
      return false;
    }
  };

  // Create or update appointment
  const handleSubmit = (formData) => {
    const patient = patients.find(
      (item) => String(item.id) === String(formData.patientId)
    );

    const doctor = doctors.find(
      (item) => String(item.id) === String(formData.doctorId)
    );

    if (!patient || !doctor) {
      toast.error("Please select a valid patient and doctor.");
      return;
    }

    // Prevent duplicate Dr. prefix
    const doctorFirstName = (doctor.firstName || "").replace(
      /^Dr\.\s*/i,
      ""
    );

    const doctorLastName = (doctor.lastName || "").replace(
      /^Dr\.\s*/i,
      ""
    );

    const appointmentData = {
      ...formData,
      patientName: `${patient.firstName || ""} ${patient.lastName || ""}`.trim(),
      doctorName: `Dr. ${doctorFirstName} ${doctorLastName}`.trim(),
      specialization: doctor.specialization || "General",
      patientPhone: patient.phone || "",
      patientEmail: patient.email || "",
      doctorEmail: doctor.email || "",
      updatedAt: new Date().toISOString(),
    };

    // Update existing appointment
    if (editingAppointment) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingAppointment.id
          ? { ...appointment, ...appointmentData }
          : appointment
      );

      if (saveAppointments(updatedAppointments)) {
        toast.success("Appointment updated successfully!");
        setIsFormOpen(false);
        setEditingAppointment(null);
      }
    } else {
      // Generate next sequential appointment ID
      const numericIds = appointments
        .map((appointment) => Number(appointment.id))
        .filter(
          (id) =>
            Number.isInteger(id) &&
            id > 0 &&
            id < 1000000000
        );

      const nextId = Math.max(0, ...numericIds) + 1;

      const newAppointment = {
        id: nextId,
        ...appointmentData,
        createdAt: new Date().toISOString(),
      };

      if (saveAppointments([newAppointment, ...appointments])) {
        toast.success("Appointment booked successfully!");
        setIsFormOpen(false);
        setEditingAppointment(null);
      }
    }
  };

  // Open add form
  const handleAdd = () => {
    setEditingAppointment(null);
    setIsFormOpen(true);
  };

  // Open edit form
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setSelectedAppointment(null);
    setIsFormOpen(true);
  };

  // Delete appointment
  const handleDelete = () => {
    if (!deletingAppointment) return;

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== deletingAppointment.id
    );

    if (saveAppointments(updatedAppointments)) {
      setDeletingAppointment(null);
      setSelectedAppointment(null);
      toast.success("Appointment deleted successfully!");
    }
  };

  // Search and filter
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch = [
        appointment.patientName,
        appointment.doctorName,
        appointment.specialization,
        appointment.appointmentType,
        appointment.appointmentDate,
        appointment.appointmentTime,
        appointment.reason,
        String(appointment.id),
      ].some((value) =>
        String(value || "").toLowerCase().includes(search)
      );

      const matchesStatus =
        statusFilter === "All" || appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAppointments.length / ITEMS_PER_PAGE
  );

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Statistics
  const today = new Date().toLocaleDateString("en-CA");

  const todayAppointments = appointments.filter(
    (appointment) => appointment.appointmentDate === today
  ).length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  // Statistics card
  const StatCard = ({ title, value, icon, description }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h3>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Appointment Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Schedule, manage and track hospital appointments.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaRotate />
            Refresh
          </button>

          <button
            onClick={handleAdd}
            disabled={patients.length === 0 || doctors.length === 0}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaPlus />
            Add Appointment
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value={appointments.length}
          icon={<FaCalendarCheck />}
          description="All recorded appointments"
        />

        <StatCard
          title="Today's Appointments"
          value={todayAppointments}
          icon={<FaCalendarDays />}
          description="Appointments scheduled today"
        />

        <StatCard
          title="Scheduled"
          value={scheduledAppointments}
          icon={<FaClock />}
          description="Waiting for consultation"
        />

        <StatCard
          title="Completed"
          value={completedAppointments}
          icon={<FaCircleCheck />}
          description="Successfully completed"
        />
      </div>

      {/* Patient and Doctor Notice */}
      {(patients.length === 0 || doctors.length === 0) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {patients.length === 0 && doctors.length === 0
            ? "No patients or doctors found. Add patients and doctors before creating appointments."
            : patients.length === 0
              ? "No patients found. Please add patients in Patient Management first."
              : "No doctors found. Please add doctors in Doctor Management first."}
        </div>
      )}

      {/* Appointment Records */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Appointment Records
            </h2>
            <p className="text-sm text-slate-500">
              Search and manage appointment information.
            </p>
          </div>

          <span className="text-sm font-medium text-slate-500">
            {filteredAppointments.length} records found
          </span>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search patient, doctor, appointment ID, date..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Appointment Table */}
        <div className="mt-5">
          {loading ? (
            <div className="py-12 text-center text-slate-500">
              Loading appointments...
            </div>
          ) : (
            <AppointmentTable
              appointments={paginatedAppointments}
              onView={setSelectedAppointment}
              onEdit={handleEdit}
              onDelete={setDeletingAppointment}
            />
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredAppointments.length > 0 && (
          <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              Showing{" "}
              {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredAppointments.length
              )}{" "}
              of {filteredAppointments.length} appointments
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">
                {currentPage} / {Math.max(totalPages, 1)}
              </span>

              <button
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage >= totalPages}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form */}
      <AppointmentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAppointment(null);
        }}
        onSubmit={handleSubmit}
        editingAppointment={editingAppointment}
        patients={patients}
        doctors={doctors}
      />

      {/* Appointment Details */}
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deletingAppointment && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-600">
              <FaTrash />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-slate-800">
              Delete Appointment?
            </h2>

            <p className="mt-2 text-center text-sm text-slate-500">
              Are you sure you want to delete the appointment for{" "}
              <span className="font-semibold text-slate-800">
                {deletingAppointment.patientName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDeletingAppointment(null)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                <FaTrash />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
