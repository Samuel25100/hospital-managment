import { HospitalRegistrationWizard } from "@/components/registration/hospital/hospital-registration-wizard";

export const metadata = {
  title: "Hospital registration · Wardline",
  description: "Set up your hospital's locations, departments, wards, staff, and service modules on Wardline.",
};

export default function HospitalRegisterPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      <HospitalRegistrationWizard />
    </main>
  );
}
