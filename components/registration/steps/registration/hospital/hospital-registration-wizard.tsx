"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stepper, type StepDefinition } from "@/components/registration/stepper";
import { ProfileStep } from "./steps/profile-step";
import { LocationsStep } from "./steps/locations-step";
import { DepartmentsStep } from "./steps/departments-step";
import { WardsStep } from "./steps/wards-step";
import { StaffStep } from "./steps/staff-step";
import { ModulesStep } from "./steps/modules-step";
import { InsuranceBillingStep } from "./steps/insurance-billing-step";
import { ReviewStep } from "./steps/review-step";
import {
  emptyLocation,
  emptyProfile,
  type HospitalRegistrationState,
} from "@/lib/hospital-types";

const STEPS: StepDefinition[] = [
  { id: "profile", label: "Hospital profile", helper: "Basic identity" },
  { id: "locations", label: "Locations", helper: "Center + branches" },
  { id: "departments", label: "Departments", helper: "Common + custom" },
  { id: "wards", label: "Wards & beds", helper: "Rooms and beds" },
  { id: "staff", label: "Staff", helper: "Unlimited accounts" },
  { id: "modules", label: "Lab, pharmacy, radiology", helper: "What you offer" },
  { id: "billing", label: "Insurance & billing", helper: "Per-branch billing" },
  { id: "review", label: "Review", helper: "Confirm & submit" },
];

function initialState(): HospitalRegistrationState {
  return {
    profile: emptyProfile(),
    locations: [emptyLocation("Center")],
    departments: [],
    wards: [],
    staff: [],
    labTests: [],
    pharmacyItems: [],
    radiologyServices: [],
    insuranceProviders: [],
    branchBilling: [],
  };
}

export function HospitalRegistrationWizard() {
  const [state, setState] = useState<HospitalRegistrationState>(initialState());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const profileErrors = useMemo(() => {
    const errors: Partial<Record<keyof HospitalRegistrationState["profile"], string>> = {};
    if (currentIndex > 0 || furthestIndex > 0) {
      if (!state.profile.hospitalName.trim()) errors.hospitalName = "Hospital name is required.";
      if (!state.profile.email.trim()) errors.email = "Admin email is required.";
    }
    return errors;
  }, [state.profile, currentIndex, furthestIndex]);

  function goTo(index: number) {
    setCurrentIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goNext() {
    const next = Math.min(currentIndex + 1, STEPS.length - 1);
    setCurrentIndex(next);
    setFurthestIndex((f) => Math.max(f, next));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    goTo(Math.max(currentIndex - 1, 0));
  }

  function handleSubmit() {
    setSubmitted(true);
    // Hand off `state` to your API route / server action here, e.g.:
    // await fetch("/api/hospitals/register", { method: "POST", body: JSON.stringify(state) });
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1634F]/10">
          <Check className="h-7 w-7 text-[#F1634F]" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-[#12172B]">
          {state.profile.hospitalName || "Your hospital"} is set up
        </h1>
        <p className="mt-2 max-w-md text-sm text-[#6E7180]">
          We've saved your locations, departments, wards, staff, and service modules. You can
          fine-tune any of it later from account settings.
        </p>
      </div>
    );
  }

  const stepId = STEPS[currentIndex].id;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#F1634F]">
          Hospital registration
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-[#12172B] sm:text-3xl">
          Set up {state.profile.hospitalName || "your hospital"} on Wardline
        </h1>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <Stepper
          steps={STEPS}
          currentIndex={currentIndex}
          furthestIndex={furthestIndex}
          onStepClick={goTo}
        />

        <div className="min-w-0 flex-1 rounded-xl border border-[#E4E1D8] bg-white p-6 sm:p-8">
          {stepId === "profile" && (
            <ProfileStep
              value={state.profile}
              onChange={(profile) => setState((s) => ({ ...s, profile }))}
              errors={profileErrors}
            />
          )}

          {stepId === "locations" && (
            <LocationsStep
              value={state.locations}
              onChange={(locations) => setState((s) => ({ ...s, locations }))}
            />
          )}

          {stepId === "departments" && (
            <DepartmentsStep
              value={state.departments}
              onChange={(departments) => setState((s) => ({ ...s, departments }))}
            />
          )}

          {stepId === "wards" && (
            <WardsStep
              value={state.wards}
              onChange={(wards) => setState((s) => ({ ...s, wards }))}
              locations={state.locations}
              departments={state.departments}
            />
          )}

          {stepId === "staff" && (
            <StaffStep
              value={state.staff}
              onChange={(staff) => setState((s) => ({ ...s, staff }))}
              departments={state.departments}
            />
          )}

          {stepId === "modules" && (
            <ModulesStep
              labTests={state.labTests}
              onLabTestsChange={(labTests) => setState((s) => ({ ...s, labTests }))}
              pharmacyItems={state.pharmacyItems}
              onPharmacyItemsChange={(pharmacyItems) => setState((s) => ({ ...s, pharmacyItems }))}
              radiologyServices={state.radiologyServices}
              onRadiologyServicesChange={(radiologyServices) =>
                setState((s) => ({ ...s, radiologyServices }))
              }
            />
          )}

          {stepId === "billing" && (
            <InsuranceBillingStep
              insuranceProviders={state.insuranceProviders}
              onInsuranceChange={(insuranceProviders) =>
                setState((s) => ({ ...s, insuranceProviders }))
              }
              branchBilling={state.branchBilling}
              onBranchBillingChange={(branchBilling) => setState((s) => ({ ...s, branchBilling }))}
              locations={state.locations}
            />
          )}

          {stepId === "review" && <ReviewStep state={state} onEditStep={goTo} />}

          <div className="mt-10 flex items-center justify-between border-t border-[#E4E1D8] pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={currentIndex === 0}
              className="gap-1.5 text-[#12172B]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            {stepId === "review" ? (
              <Button
                type="button"
                onClick={handleSubmit}
                className="gap-1.5 bg-[#F1634F] text-white hover:bg-[#E14F3B]"
              >
                Submit registration <Check className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={goNext}
                className="gap-1.5 bg-[#101B3D] text-white hover:bg-[#101B3D]/90"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
