"use client";

import { Check } from "lucide-react";
import { STEP_IDS, type StepId } from "@/lib/types";
import { STEP_META } from "@/lib/constants";

interface StepSidebarProps {
  currentStep: StepId;
  completedSteps: Set<StepId>;
  onStepClick: (step: StepId) => void;
}

// A single heartbeat pulse used as the connector between two steps.
// Draws as a flat line with one spike in the middle -- echoes the
// ECG divider used on the Wardline marketing site.
function PulseConnector({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 40"
      className="h-10 w-6 shrink-0"
      aria-hidden="true"
    >
      <path
        d="M12 0 V14 L8 14 L11 8 L14 26 L16 14 L12 14 V40"
        fill="none"
        stroke={active ? "#F0554F" : "#D8D3C6"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300"
      />
    </svg>
  );
}

export function StepSidebar({ currentStep, completedSteps, onStepClick }: StepSidebarProps) {
  const currentIndex = STEP_IDS.indexOf(currentStep);

  return (
    <nav aria-label="Registration progress" className="flex flex-col">
      {STEP_IDS.map((step, index) => {
        const meta = STEP_META[step];
        const isCompleted = completedSteps.has(step);
        const isCurrent = step === currentStep;
        const isReachable = isCompleted || index <= currentIndex;

        return (
          <div key={step} className="flex flex-col items-start">
            <button
              type="button"
              onClick={() => isReachable && onStepClick(step)}
              disabled={!isReachable}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                isCurrent
                  ? "bg-[#101B33] text-white"
                  : isReachable
                  ? "text-[#101B33] hover:bg-[#101B33]/5"
                  : "text-[#101B33]/35 cursor-not-allowed"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                  isCurrent
                    ? "bg-[#F0554F] text-white"
                    : isCompleted
                    ? "bg-[#F0554F]/15 text-[#F0554F]"
                    : "bg-[#101B33]/5 text-[#101B33]/50"
                }`}
              >
                {isCompleted && !isCurrent ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium leading-tight">{meta.label}</span>
                <span
                  className={`hidden text-xs leading-snug sm:block ${
                    isCurrent ? "text-white/70" : "text-[#101B33]/50"
                  }`}
                >
                  {meta.description}
                </span>
              </span>
            </button>
            {index < STEP_IDS.length - 1 && (
              <div className="pl-3">
                <PulseConnector active={index < currentIndex || isCompleted} />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
