"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepDefinition {
  id: string;
  label: string;
  helper: string;
}

interface StepperProps {
  steps: StepDefinition[];
  currentIndex: number;
  furthestIndex: number;
  onStepClick: (index: number) => void;
}

// A short jagged "pulse" line — the same motif used as a section divider on
// the marketing site — used here as the connector between stepper nodes.
function PulseConnector({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 64"
      className="h-16 w-6 shrink-0 md:h-6 md:w-16"
      preserveAspectRatio="none"
    >
      <path
        d="M12 0 L12 22 L6 30 L18 40 L12 48 L12 64"
        className="md:hidden"
        fill="none"
        stroke={active ? "#F1634F" : "#DCD9CF"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 12 L22 12 L30 6 L40 18 L48 12 L64 12"
        className="hidden md:block"
        fill="none"
        stroke={active ? "#F1634F" : "#DCD9CF"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Stepper({
  steps,
  currentIndex,
  furthestIndex,
  onStepClick,
}: StepperProps) {
  return (
    <nav
      aria-label="Registration progress"
      className="flex flex-row items-start gap-0 overflow-x-auto md:w-64 md:shrink-0 md:flex-col md:overflow-visible"
    >
      {steps.map((step, index) => {
        const isComplete = index < furthestIndex;
        const isCurrent = index === currentIndex;
        const isReachable = index <= furthestIndex;

        return (
          <div key={step.id} className="flex items-start md:w-full">
            <div className="flex flex-col items-center md:flex-row md:items-start md:gap-3">
              <div className="flex flex-1 md:contents">
                <button
                  type="button"
                  disabled={!isReachable}
                  onClick={() => onStepClick(index)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                    isComplete &&
                      "border-[#F1634F] bg-[#F1634F] text-white",
                    isCurrent &&
                      !isComplete &&
                      "border-[#101B3D] bg-[#101B3D] text-white",
                    !isCurrent &&
                      !isComplete &&
                      "border-[#DCD9CF] bg-white text-[#8A8D99]",
                    isReachable && !isCurrent && "cursor-pointer hover:border-[#101B3D]",
                    !isReachable && "cursor-not-allowed opacity-60"
                  )}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                </button>
              </div>
              <div className="mt-2 hidden max-w-[9rem] text-left md:block">
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isCurrent || isComplete ? "text-[#12172B]" : "text-[#8A8D99]"
                  )}
                >
                  {step.label}
                </p>
                <p className="text-xs leading-snug text-[#8A8D99]">
                  {step.helper}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <PulseConnector active={index < furthestIndex} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
