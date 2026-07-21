"use client";

import { useState } from "react";
import { Plus, X, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SUGGESTED_DEPARTMENTS } from "@/lib/constants";

interface DepartmentsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function DepartmentsStep({ value, onChange }: DepartmentsStepProps) {
  const [custom, setCustom] = useState("");

  function toggle(dept: string) {
    onChange(
      value.includes(dept) ? value.filter((d) => d !== dept) : [...value, dept]
    );
  }

  function addCustom() {
    const trimmed = custom.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setCustom("");
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-[#101B33]/60">
        Select the specialties your clinic offers today. This decides which
        appointment types patients can book, and which staff roles you&apos;ll
        be prompted to add next.
      </p>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_DEPARTMENTS.map((dept) => {
          const active = value.includes(dept);
          return (
            <button
              key={dept}
              type="button"
              onClick={() => toggle(dept)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                active
                  ? "border-[#101B33] bg-[#101B33] text-white"
                  : "border-[#E5E1D8] text-[#101B33]/70 hover:border-[#101B33]/30"
              }`}
            >
              <Stethoscope className="h-3.5 w-3.5" />
              {dept}
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#101B33]">
          Add a department we didn&apos;t list
        </label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Physiotherapy"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustom())}
          />
          <Button type="button" variant="secondary" onClick={addCustom}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      {value.filter((d) => !SUGGESTED_DEPARTMENTS.includes(d)).length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-[#101B33]/40">
            Custom departments
          </p>
          <div className="flex flex-wrap gap-2">
            {value
              .filter((d) => !SUGGESTED_DEPARTMENTS.includes(d))
              .map((dept) => (
                <span
                  key={dept}
                  className="flex items-center gap-1.5 rounded-full bg-[#F0554F]/10 px-3.5 py-1.5 text-sm text-[#101B33]"
                >
                  {dept}
                  <button type="button" onClick={() => toggle(dept)} aria-label={`Remove ${dept}`}>
                    <X className="h-3.5 w-3.5 text-[#101B33]/50 hover:text-[#F0554F]" />
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}

      {value.length === 0 && (
        <p className="text-xs text-[#101B33]/40">
          No departments selected yet — pick at least one to continue.
        </p>
      )}
    </div>
  );
}
