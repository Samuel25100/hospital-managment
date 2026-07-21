// lib/hospital-types.ts
// Types for the Wardline hospital registration flow (Hospital plan).
// Differs from the clinic flow: unlimited staff, one center + many branches,
// individually tracked beds, custom + common departments, and dedicated
// lab / pharmacy / radiology + insurance & multi-branch billing steps.

export interface HospitalProfile {
  hospitalName: string;
  registrationNumber: string;
  email: string;
  phone: string;
}

export type LocationKind = "Center" | "Branch";

export interface Location {
  id: string;
  kind: LocationKind;
  name: string;
  addressLine: string;
  city: string;
  phone: string;
}

export interface Department {
  id: string;
  name: string;
  custom: boolean;
}

export type BedStatus = "Available" | "Occupied" | "Cleaning" | "Out of Service";

export interface Bed {
  id: string;
  label: string; // e.g. "12-A"
  status: BedStatus;
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
  beds: Bed[];
}

export interface Ward {
  id: string;
  name: string;
  departmentId: string;
  locationId: string;
  rooms: Room[];
}

export type StaffRole =
  | "Doctor"
  | "Nurse"
  | "Receptionist"
  | "Lab Technician"
  | "Pharmacist"
  | "Radiologist"
  | "Billing Officer"
  | "Ward Administrator"
  | "Other";

export interface StaffMember {
  id: string;
  fullName: string;
  role: StaffRole;
  email: string;
  phone: string;
  departmentId?: string;
  specialization?: string;
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  custom?: boolean;
}

export interface PharmacyItem {
  id: string;
  name: string;
  category: string;
  custom?: boolean;
}

export interface RadiologyService {
  id: string;
  name: string;
  custom?: boolean;
}

export interface InsuranceProvider {
  id: string;
  name: string;
  custom?: boolean;
}

export interface BranchBilling {
  locationId: string;
  handlesOwnBilling: boolean;
}

export interface HospitalRegistrationState {
  profile: HospitalProfile;
  locations: Location[];
  departments: Department[];
  wards: Ward[];
  staff: StaffMember[];
  labTests: LabTest[];
  pharmacyItems: PharmacyItem[];
  radiologyServices: RadiologyService[];
  insuranceProviders: InsuranceProvider[];
  branchBilling: BranchBilling[];
}

export const ROOM_TYPES: RoomType[] = [
  "General",
  "Private",
  "ICU",
  "Isolation",
  "Operating Theatre",
];

export const BED_STATUSES: BedStatus[] = [
  "Available",
  "Occupied",
  "Cleaning",
  "Out of Service",
];

export const STAFF_ROLES: StaffRole[] = [
  "Doctor",
  "Nurse",
  "Receptionist",
  "Lab Technician",
  "Pharmacist",
  "Radiologist",
  "Billing Officer",
  "Ward Administrator",
  "Other",
];

let counter = 0;
export function makeId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

export function emptyProfile(): HospitalProfile {
  return { hospitalName: "", registrationNumber: "", email: "", phone: "" };
}

export function emptyLocation(kind: LocationKind): Location {
  return {
    id: makeId("loc"),
    kind,
    name: "",
    addressLine: "",
    city: "",
    phone: "",
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

export function emptyWard(locationId: string, departmentId: string): Ward {
  return {
    id: makeId("ward"),
    name: "",
    departmentId,
    locationId,
    rooms: [],
  };
}

export function emptyRoom(): Room {
  return { id: makeId("room"), label: "", type: "General", beds: [] };
}

export function emptyBed(index: number): Bed {
  return { id: makeId("bed"), label: `Bed ${index}`, status: "Available" };
}
