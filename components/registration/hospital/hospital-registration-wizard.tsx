"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowLeft, ArrowRight, Check } from "lucide-react";
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

function isStepComplete(currentIndex: number, data: HospitalRegistrationState): boolean {
  const step = STEPS[currentIndex];
  
  switch (step.id) {
    case "profile":
      return data.profile.hospitalName.trim() !== "" && data.profile.email.trim() !== "";
    case "locations":
      return data.locations.length > 0;
    case "departments":
      return data.departments.length > 0;
    case "wards":
      return data.wards.length > 0;
    case "staff":
      return data.staff.length > 0;
    case "modules":
      return data.labTests.length > 0 || data.pharmacyItems.length > 0 || data.radiologyServices.length > 0;
    case "billing":
      return data.branchBilling.length > 0 || data.insuranceProviders.length > 0;
    case "review":
      return true;
    default:
      return false;
  }
}

export function HospitalRegistrationWizard() {
  const [state, setState] = useState<HospitalRegistrationState>(initialState());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [furthestIndex, setFurthestIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const isLastStep = currentIndex === STEPS.length - 1;

  const profileErrors = useMemo(() => {
    const errors: Partial<Record<keyof HospitalRegistrationState["profile"], string>> = {};
    if (currentIndex > 0 || furthestIndex > 0) {
      if (!state.profile.hospitalName.trim()) errors.hospitalName = "Hospital name is required.";
      if (!state.profile.email.trim()) errors.email = "Admin email is required.";
    }
    return errors;
  }, [state.profile, currentIndex, furthestIndex]);

  const canAdvance = isStepComplete(currentIndex, state);

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
  
  function goHomePage() {
    window.location.href = "/";
  }

  function handleSubmit() {

    async function submitData() {
      try {
        const response = await fetch(" http://localhost:3000/api/hospital/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });
        console.log("Hospital registration submitted:", state);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error submitting hospital registration:", error);
      }
    }
    submitData();
    setSubmitted(true);
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
          {"We've saved your locations, departments, wards, staff, and service modules. You can fine-tune any of it later from account settings."}
        </p>
      </div>
    );
  }

  const stepId = STEPS[currentIndex].id;

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="border-b border-[#E5E1D8] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div onClick={goHomePage} className="cursor-pointer flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1B2A4A] text-[#FAFAF8]"
                aria-hidden="true"
              >
                <Activity className="h-4 w-4" />
              </span>
              <span className="text-base font-semibold tracking-tight text-[#101B33]">
                  Wardline
              </span>
            </div>
            <span className="ml-2 rounded-full bg-[#101B33]/5 px-2.5 py-0.5 font-mono text-xs text-[#101B33]/50">
              Hospital setup
            </span>
          </div>
          <span className="font-mono text-xs text-[#101B33]/70">
            Step {currentIndex + 1} of {STEPS.length}
          </span>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
        
        <Stepper
          steps={STEPS}
          currentIndex={currentIndex}
          furthestIndex={furthestIndex}
          onStepClick={goTo}
        />

        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 sm:p-8">
          
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

          <div className="mt-10 flex items-center justify-between border-t border-[#E5E1D8] pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={currentIndex === 0}
              className="text-[#101B33]/60"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back
            </Button>

            {isLastStep ? (
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-[#F0554F] hover:bg-[#F0554F]/90"
              >
                Complete registration
                <Check className="ml-1.5 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={goNext}
                disabled={!canAdvance}
                className="bg-[#101B33] hover:bg-[#101B33]/90"
              >
                Continue
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            )}
          </div>
        
        </section>
        
      </main>
      
    </div>
  );
}