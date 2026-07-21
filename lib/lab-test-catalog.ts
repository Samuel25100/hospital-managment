// lib/lab-test-catalog.ts
// A starter catalog of common lab/diagnostic tests, grouped by category.
// Facilities check the ones they offer and can add their own on top.

export interface CatalogTest {
  name: string;
  category: string;
}

export const LAB_TEST_CATALOG: CatalogTest[] = [
  // Hematology
  { name: "Complete Blood Count (CBC)", category: "Hematology" },
  { name: "Erythrocyte Sedimentation Rate (ESR)", category: "Hematology" },
  { name: "Blood Grouping & Rh Typing", category: "Hematology" },
  { name: "Coagulation Profile (PT/INR)", category: "Hematology" },

  // Chemistry
  { name: "Blood Glucose (Fasting/Random)", category: "Chemistry" },
  { name: "Lipid Profile", category: "Chemistry" },
  { name: "Liver Function Test", category: "Chemistry" },
  { name: "Kidney Function Test", category: "Chemistry" },
  { name: "Electrolyte Panel", category: "Chemistry" },
  { name: "HbA1c", category: "Chemistry" },

  // Microbiology & Serology
  { name: "Urinalysis", category: "Microbiology" },
  { name: "Stool Culture & Sensitivity", category: "Microbiology" },
  { name: "Malaria Rapid Test", category: "Serology" },
  { name: "HIV Screening", category: "Serology" },
  { name: "Hepatitis B & C Panel", category: "Serology" },
  { name: "Typhoid (Widal) Test", category: "Serology" },
  { name: "Pregnancy Test (hCG)", category: "Serology" },

  // Imaging & Diagnostics
  { name: "X-Ray", category: "Imaging" },
  { name: "Ultrasound", category: "Imaging" },
  { name: "ECG", category: "Imaging" },
  { name: "CT Scan", category: "Imaging" },
];

export const LAB_TEST_CATEGORIES = Array.from(
  new Set(LAB_TEST_CATALOG.map((t) => t.category))
);
