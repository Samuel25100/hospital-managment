// lib/registration-types.ts
// Shared types for the Wardline clinic/hospital registration flow.

export type FacilityType = "Clinic" | "Hospital";

export interface FacilityProfile {
  facilityName: string;
  facilityType: FacilityType;
  registrationNumber: string;
  email: string;
  phone: string;
}

export interface Branch {
  id: string;
  name: string;
  addressLine: string;
  city: string;
  phone: string;
  isMain: boolean;
}

export type RoomType =
  | "General"
  | "Private"
  | "ICU"
  | "Isolation"
  | "Operating Theatre";

export interface Room {
  id: string;
  label: string;
  type: RoomType;
  capacity: number;
}

export interface Ward {
  id: string;
  name: string;
  department: string;
  rooms: Room[];
}

export type StaffRole =
  | "Doctor"
  | "Nurse"
  | "Receptionist"
  | "Lab Technician"
  | "Pharmacist"
  | "Billing Officer"
  | "Ward Administrator"
  | "Other";

export interface StaffMember {
  id: string;
  fullName: string;
  role: StaffRole;
  email: string;
  phone: string;
  specialization?: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  custom?: boolean;
}

export interface Department {
  id: string;
  name: string;
  headOfDepartment?: string;
}

export type FacilityModule = "Lab" | "Pharmacy" | "Radiology";

export interface InsuranceProvider {
  id: string;
  name: string;
  claimPrefix?: string;
}

export interface HospitalBilling {
  billingModel: "Centralized" | "Per-branch";
  insuranceProviders: InsuranceProvider[];
}

export interface RegistrationState {
  facility: FacilityProfile;
  branches: Branch[];
  wards: Ward[];
  staff: StaffMember[];
  labTests: LabTest[];
}

export interface HospitalRegistrationState {
  facility: FacilityProfile;
  branches: Branch[];
  departments: Department[];
  wards: Ward[];
  staff: StaffMember[];
  modules: FacilityModule[];
  labTests: LabTest[];
  billing: HospitalBilling;
}

// Clinic tier limits
export const STAFF_SEAT_LIMIT = 8;
export const BRANCH_LIMIT = 1;

// Hospital tier: no staff seat cap, multiple branches allowed
export const HOSPITAL_STAFF_SEAT_LIMIT = null; // unlimited
export const HOSPITAL_MODULES: FacilityModule[] = ["Lab", "Pharmacy", "Radiology"];

export const STAFF_ROLES: StaffRole[] = [
  "Doctor",
  "Nurse",
  "Receptionist",
  "Lab Technician",
  "Pharmacist",
  "Billing Officer",
  "Ward Administrator",
  "Other",
];

export const ROOM_TYPES: RoomType[] = [
  "General",
  "Private",
  "ICU",
  "Isolation",
  "Operating Theatre",
];

export const DEPARTMENTS = [
  "General Medicine",
  "Surgery",
  "Maternity",
  "Pediatrics",
  "Emergency",
  "Outpatient",
  "Other",
];

// A short, unique-enough id generator that doesn't depend on crypto.randomUUID
// being available in every runtime the form might be rendered in.
let counter = 0;
export function makeId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

export function emptyFacility(): FacilityProfile {
  return {
    facilityName: "",
    facilityType: "Clinic",
    registrationNumber: "",
    email: "",
    phone: "",
  };
}

export function emptyBranch(): Branch {
  return {
    id: makeId("branch"),
    name: "",
    addressLine: "",
    city: "",
    phone: "",
    isMain: true,
  };
}

export function emptyStaff(): StaffMember {
  return {
    id: makeId("staff"),
    fullName: "",
    role: "Doctor",
    email: "",
    phone: "",
    specialization: "",
  };
}

export function emptyWard(): Ward {
  return {
    id: makeId("ward"),
    name: "",
    department: "General Medicine",
    rooms: [],
  };
}

export function emptyRoom(): Room {
  return {
    id: makeId("room"),
    label: "",
    type: "General",
    capacity: 1,
  };
}

export function emptyDepartment(): Department {
  return {
    id: makeId("dept"),
    name: "",
    headOfDepartment: "",
  };
}

export function emptyInsuranceProvider(): InsuranceProvider {
  return {
    id: makeId("insurer"),
    name: "",
    claimPrefix: "",
  };
}

export function emptyHospitalBilling(): HospitalBilling {
  return {
    billingModel: "Centralized",
    insuranceProviders: [],
  };
}
