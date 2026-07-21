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
          <div key={step.id} className="flex flex-col items-start mb-2 mt-2">
            <button
              type="button"
              onClick={() => isReachable && onStepClick(index)}
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
                    : isComplete
                    ? "bg-[#F0554F]/15 text-[#F0554F]"
                    : "bg-[#101B33]/5 text-[#101B33]/50"
                }`}
              >
                {isComplete && !isCurrent ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium leading-tight">{step.label}</span>
                <span
                  className={`hidden text-xs leading-snug sm:block ${
                    isCurrent ? "text-white/70" : "text-[#101B33]/50"
                  }`}
                >
                  {step.helper}
                </span>
              </span>
            </button>
            {/* {index < STEP_IDS.length - 1 && (
              <div className="pl-3">
                <PulseConnector active={index < currentIndex || isCompleted} />
              </div>
            )} */}
          </div>
        );
      })}
    </nav>
  );
}
