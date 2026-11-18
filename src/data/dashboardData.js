
export const dashboardStats = [
  {
    id: 1,
    title: "Total Patients",
    value: "1,250",
    description: "Registered patients",
    trend: "+12.5%",
    color: "bg-blue-100 text-blue-600",
    iconName: "patients",
  },
  {
    id: 2,
    title: "Total Doctors",
    value: "48",
    description: "Registered doctors",
    trend: "+4.8%",
    color: "bg-emerald-100 text-emerald-600",
    iconName: "doctors",
  },
  {
    id: 3,
    title: "Appointments",
    value: "86",
    description: "Today's appointments",
    trend: "+8.2%",
    color: "bg-purple-100 text-purple-600",
    iconName: "appointments",
  },
  {
    id: 4,
    title: "Available Beds",
    value: "72",
    description: "Currently available",
    trend: "72 available",
    color: "bg-orange-100 text-orange-600",
    iconName: "beds",
  },
  {
    id: 5,
    title: "Total Revenue",
    value: "₹8.5L",
    description: "This month's revenue",
    trend: "+15.3%",
    color: "bg-cyan-100 text-cyan-600",
    iconName: "revenue",
  },
  {
    id: 6,
    title: "Pending Bills",
    value: "₹45,000",
    description: "Outstanding payments",
    trend: "12 pending",
    color: "bg-rose-100 text-rose-600",
    iconName: "billing",
  },
];

export const appointmentData = [
  { day: "Mon", appointments: 45 },
  { day: "Tue", appointments: 60 },
  { day: "Wed", appointments: 52 },
  { day: "Thu", appointments: 75 },
  { day: "Fri", appointments: 68 },
  { day: "Sat", appointments: 90 },
  { day: "Sun", appointments: 40 },
];

export const departmentData = [
  { name: "Cardiology", patients: 120 },
  { name: "Neurology", patients: 85 },
  { name: "Orthopedics", patients: 100 },
  { name: "Pediatrics", patients: 95 },
  { name: "General", patients: 140 },
];

export const recentActivities = [
  {
    id: 1,
    title: "New patient registered",
    description: "Patient John Smith was registered.",
    time: "10 minutes ago",
    type: "patient",
  },
  {
    id: 2,
    title: "Appointment scheduled",
    description: "Dr. Emily has a new appointment.",
    time: "25 minutes ago",
    type: "appointment",
  },
  {
    id: 3,
    title: "Payment received",
    description: "Payment of ₹5,000 received.",
    time: "40 minutes ago",
    type: "billing",
  },
  {
    id: 4,
    title: "Lab report completed",
    description: "Blood test report is ready.",
    time: "1 hour ago",
    type: "laboratory",
  },
];
