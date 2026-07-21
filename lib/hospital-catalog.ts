// lib/hospital-catalog.ts
// Common option lists for the hospital registration flow. Each of these is
// presented as a checklist the hospital can select from, with room to add
// their own custom entries alongside.

export const COMMON_DEPARTMENTS = [
  "General Medicine",
  "Surgery",
  "Maternity & Obstetrics",
  "Pediatrics",
  "Emergency & Trauma",
  "Cardiology",
  "Oncology",
  "Orthopedics",
  "ICU / Critical Care",
  "Outpatient",
];

export interface CatalogItem {
  name: string;
  category: string;
}

export const LAB_TEST_CATALOG: CatalogItem[] = [
  { name: "Complete Blood Count (CBC)", category: "Hematology" },
  { name: "Erythrocyte Sedimentation Rate (ESR)", category: "Hematology" },
  { name: "Blood Grouping & Rh Typing", category: "Hematology" },
  { name: "Coagulation Profile (PT/INR)", category: "Hematology" },
  { name: "Blood Glucose (Fasting/Random)", category: "Chemistry" },
  { name: "Lipid Profile", category: "Chemistry" },
  { name: "Liver Function Test", category: "Chemistry" },
  { name: "Kidney Function Test", category: "Chemistry" },
  { name: "HbA1c", category: "Chemistry" },
  { name: "Urinalysis", category: "Microbiology" },
  { name: "Stool Culture & Sensitivity", category: "Microbiology" },
  { name: "Malaria Rapid Test", category: "Serology" },
  { name: "HIV Screening", category: "Serology" },
  { name: "Hepatitis B & C Panel", category: "Serology" },
  { name: "Pregnancy Test (hCG)", category: "Serology" },
];

export const PHARMACY_CATALOG: CatalogItem[] = [
  { name: "Analgesics (pain relief)", category: "Medication" },
  { name: "Antibiotics", category: "Medication" },
  { name: "Antimalarials", category: "Medication" },
  { name: "IV Fluids", category: "Consumables" },
  { name: "Vaccines", category: "Medication" },
  { name: "Surgical Consumables", category: "Consumables" },
  { name: "Controlled Substances", category: "Medication" },
];

export const RADIOLOGY_CATALOG = [
  "X-Ray",
  "Ultrasound",
  "CT Scan",
  "MRI",
  "Mammography",
  "ECG",
  "Fluoroscopy",
];

export const INSURANCE_CATALOG = [
  "National Health Insurance",
  "AAR Insurance",
  "Jubilee Insurance",
  "UAP Old Mutual",
  "Britam",
  "Self-pay / Cash",
];
