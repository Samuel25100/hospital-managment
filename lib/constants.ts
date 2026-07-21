import type { StepId } from "./types";

export const SUGGESTED_DEPARTMENTS = [
  "General Medicine",
  "Pediatrics",
  "Dentistry",
  "Gynecology",
  "Dermatology",
  "ENT",
  "Ophthalmology",
  "Physiotherapy",
  "Nutrition",
  "Mental Health",
];

export const SUGGESTED_LAB_TESTS: { name: string; category: string; sampleType: string }[] = [
  { name: "Full Blood Count (FBC)", category: "Hematology", sampleType: "Blood" },
  { name: "Malaria Rapid Test", category: "Parasitology", sampleType: "Blood" },
  { name: "Blood Glucose (RBS/FBS)", category: "Biochemistry", sampleType: "Blood" },
  { name: "Widal Test", category: "Serology & Immunology", sampleType: "Blood" },
  { name: "Urinalysis", category: "Urinalysis", sampleType: "Urine" },
  { name: "HIV Rapid Test", category: "Serology & Immunology", sampleType: "Blood" },
  { name: "Liver Function Test (LFT)", category: "Biochemistry", sampleType: "Blood" },
  { name: "X-Ray", category: "Radiology & Imaging", sampleType: "N/A" },
];

export const STEP_META: Record<
  StepId,
  { label: string; short: string; description: string }
> = {
  branch: {
    label: "Branch details",
    short: "Branch",
    description: "Where your clinic operates and how patients reach you.",
  },
  departments: {
    label: "Departments",
    short: "Depts",
    description: "The specialties your clinic offers.",
  },
  staff: {
    label: "Staff & roles",
    short: "Staff",
    description: "Add up to 8 team members and assign roles.",
  },
  labTests: {
    label: "Lab tests",
    short: "Lab",
    description: "The tests your clinic can run in-house.",
  },
  rooms: {
    label: "Rooms & facilities",
    short: "Rooms",
    description: "Consultation rooms, procedure rooms, and other spaces.",
  },
  insurance: {
    label: "Payments & insurance",
    short: "Billing",
    description: "How patients pay, and which insurers you accept.",
  },
  review: {
    label: "Review & submit",
    short: "Review",
    description: "Confirm everything before going live.",
  },
};
