"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepSidebar } from "@/components/registration/step-sidebar";
import { BranchStep } from "@/components/registration/steps/branch-step";
import { DepartmentsStep } from "@/components/registration/steps/departments-step";
import { StaffStep } from "@/components/registration/steps/staff-step";
import { LabTestsStep } from "@/components/registration/steps/lab-tests-step";
import { RoomsStep } from "@/components/registration/steps/rooms-step";
import { InsuranceStep } from "@/components/registration/steps/insurance-step";
import { ReviewStep } from "@/components/registration/steps/review-step";
import { STEP_IDS, emptyRegistration, type StepId, type ClinicRegistrationData } from "@/lib/types";
import { STEP_META } from "@/lib/constants";

function isStepComplete(step: StepId, data: ClinicRegistrationData): boolean {
  switch (step) {
    case "branch":
      return Boolean(
        data.branch.clinicName.trim() &&
          data.branch.addressLine.trim() &&
          data.branch.phone.trim()
      );
    case "departments":
      return data.departments.length > 0;
    case "staff":
      return data.staff.length > 0;
    case "labTests":
      return data.labTests.length > 0;
    case "rooms":
      return data.rooms.length > 0;
    case "insurance":
      return data.insurance.paymentMethods.length > 0;
    case "review":
      return true;
  }
}

export default function ClinicRegistrationPage() {
  const [data, setData] = useState<ClinicRegistrationData>(emptyRegistration);
  const [currentStep, setCurrentStep] = useState<StepId>("branch");
  const [submitted, setSubmitted] = useState(false);

  const currentIndex = STEP_IDS.indexOf(currentStep);
  const isLastStep = currentIndex === STEP_IDS.length - 1;

  const completedSteps = useMemo(() => {
    const set = new Set<StepId>();
    STEP_IDS.forEach((step) => {
      if (isStepComplete(step, data)) set.add(step);
    });
    return set;
  }, [data]);

  const canAdvance = isStepComplete(currentStep, data);

  function goTo(step: StepId) {
    setCurrentStep(step);
  }

  function goHomePage() {
    window.location.href = "/";
  }

  function goNext() {
    if (!canAdvance) return;
    if (!isLastStep) setCurrentStep(STEP_IDS[currentIndex + 1]);
  }

  function goBack() {
    if (currentIndex > 0) setCurrentStep(STEP_IDS[currentIndex - 1]);
  }

  function handleSubmit() {

    async function submitData() {
      try {
        const response = await fetch(" http://localhost:3000/api/clinic/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log("Clinic registration submitted:", data);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error submitting clinic registration:", error);
      }
    }
    submitData();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F0554F]/10">
            <Check className="h-6 w-6 text-[#F0554F]" />
          </div>
          <h1 className="text-xl font-semibold text-[#101B33]">
            {data.branch.clinicName || "Your clinic"} is set up
          </h1>
          <p className="mt-2 text-sm text-[#101B33]/60">
            We&apos;ve saved your branch, {data.staff.length} staff account
            {data.staff.length === 1 ? "" : "s"}, {data.labTests.length} lab
            test{data.labTests.length === 1 ? "" : "s"}, and {data.rooms.length} room
            {data.rooms.length === 1 ? "" : "s"}. Your dashboard is ready.
          </p>
          <Button className="mt-6 w-full bg-[#101B33] hover:bg-[#101B33]/90">
            Go to dashboard
          </Button>
        </div>
      </div>
    );
  }

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
              Clinic setup
            </span>
          </div>
          <span className="font-mono text-xs text-[#101B33]/70">
            Step {currentIndex + 1} of {STEP_IDS.length}
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-10 lg:self-start">
          <StepSidebar
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goTo}
          />
        </aside>

        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[#F0554F]">
              {STEP_META[currentStep].short}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#101B33]">
              {STEP_META[currentStep].label}
            </h1>
          </div>

          {currentStep === "branch" && (
            <BranchStep
              value={data.branch}
              onChange={(branch) => setData({ ...data, branch })}
            />
          )}
          {currentStep === "departments" && (
            <DepartmentsStep
              value={data.departments}
              onChange={(departments) => setData({ ...data, departments })}
            />
          )}
          {currentStep === "staff" && (
            <StaffStep value={data.staff} onChange={(staff) => setData({ ...data, staff })} />
          )}
          {currentStep === "labTests" && (
            <LabTestsStep
              value={data.labTests}
              onChange={(labTests) => setData({ ...data, labTests })}
            />
          )}
          {currentStep === "rooms" && (
            <RoomsStep value={data.rooms} onChange={(rooms) => setData({ ...data, rooms })} />
          )}
          {currentStep === "insurance" && (
            <InsuranceStep
              value={data.insurance}
              onChange={(insurance) => setData({ ...data, insurance })}
            />
          )}
          {currentStep === "review" && <ReviewStep data={data} onEdit={goTo} />}

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
