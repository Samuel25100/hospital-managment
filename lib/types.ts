// Shared types for the Wardline clinic registration flow.
// Clinic plan constraints (per pricing tier): 1 branch, up to 8 staff accounts.

export const MAX_STAFF = 8;
export const MAX_BRANCHES = 1;

export const STAFF_ROLES = [
  "Doctor",
  "Nurse",
  "Receptionist",
  "Lab Technician",
  "Pharmacist",
  "Radiology Technician",
  "Clinic Manager",
  "Billing Staff",
] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

export const LAB_TEST_CATEGORIES = [
  "Hematology",
  "Biochemistry",
  "Microbiology",
  "Serology & Immunology",
  "Urinalysis",
  "Radiology & Imaging",
  "Pathology & Histology",
  "Parasitology",
  "Other",
] as const;
export type LabTestCategory = (typeof LAB_TEST_CATEGORIES)[number];

export const ROOM_TYPES = [
  "Consultation Room",
  "Procedure Room",
  "Observation / Recovery",
  "Laboratory",
  "Pharmacy",
  "Reception / Waiting",
  "Store Room",
] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export const PAYMENT_METHODS = [
  "Cash",
  "Mobile Money",
  "Card",
  "Bank Transfer",
  "Insurance",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export interface BranchInfo {
  clinicName: string;
  licenseNumber: string;
  addressLine: string;
  city: string;
  phone: string;
  email: string;
  operatingDays: Weekday[];
  openTime: string;
  closeTime: string;
}

export interface StaffMember {
  id: string;
  fullName: string;
  role: StaffRole | "";
  specialization: string;
  email: string;
  phone: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: LabTestCategory | "";
  sampleType: string;
  turnaroundTime: string;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType | "";
  capacity: string;
}

export interface InsuranceInfo {
  acceptedProviders: string[];
  paymentMethods: PaymentMethod[];
}

export interface ClinicRegistrationData {
  branch: BranchInfo;
  departments: string[];
  staff: StaffMember[];
  labTests: LabTest[];
  rooms: Room[];
  insurance: InsuranceInfo;
}

export const emptyBranch: BranchInfo = {
  clinicName: "",
  licenseNumber: "",
  addressLine: "",
  city: "",
  phone: "",
  email: "",
  operatingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  openTime: "08:00",
  closeTime: "17:00",
};

export const emptyRegistration: ClinicRegistrationData = {
  branch: emptyBranch,
  departments: [],
  staff: [],
  labTests: [],
  rooms: [],
  insurance: { acceptedProviders: [], paymentMethods: [] },
};

export const STEP_IDS = [
  "branch",
  "departments",
  "staff",
  "labTests",
  "rooms",
  "insurance",
  "review",
] as const;
export type StepId = (typeof STEP_IDS)[number];

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}
