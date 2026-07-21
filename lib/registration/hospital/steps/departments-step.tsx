"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { COMMON_DEPARTMENTS } from "@/lib/hospital-catalog";
import { makeId, type Department } from "@/lib/hospital-types";

interface DepartmentsStepProps {
  value: Department[];
  onChange: (value: Department[]) => void;
}

export function DepartmentsStep({ value, onChange }: DepartmentsStepProps) {
  const [customInput, setCustomInput] = useState("");

  function isSelected(name: string) {
    return value.some((d) => d.name === name);
  }

  function toggleCommon(name: string, checked: boolean) {
    if (checked) {
      onChange([...value, { id: makeId("dept"), name, custom: false }]);
    } else {
      onChange(value.filter((d) => d.name !== name));
    }
  }

  function addCustom() {
    const name = customInput.trim();
    if (!name || isSelected(name)) return;
    onChange([...value, { id: makeId("dept"), name, custom: true }]);
    setCustomInput("");
  }

  function removeCustom(id: string) {
    onChange(value.filter((d) => d.id !== id));
  }

  const customDepartments = value.filter((d) => d.custom);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Set up your departments</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          Pick from the common list and add any department specific to your hospital. Wards
          get assigned to a department in the next step.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {COMMON_DEPARTMENTS.map((name) => (
          <label
            key={name}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E4E1D8] p-3 hover:border-[#101B3D]/40"
          >
            <Checkbox
              checked={isSelected(name)}
              onCheckedChange={(checked) => toggleCommon(name, checked === true)}
            />
            <span className="text-sm text-[#12172B]">{name}</span>
          </label>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold text-[#12172B]">Add a custom department</p>
        <div className="mt-2 flex gap-2">
          <Input
            placeholder="e.g. Dialysis Unit"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addCustom} className="shrink-0 gap-1.5">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>

        {customDepartments.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {customDepartments.map((d) => (
              <span
                key={d.id}
                className="flex items-center gap-1.5 rounded-full border border-[#F1634F]/30 bg-[#F1634F]/10 py-1 pl-3 pr-2 text-xs font-medium text-[#E14F3B]"
              >
                {d.name}
                <button
                  type="button"
                  onClick={() => removeCustom(d.id)}
                  aria-label={`Remove ${d.name}`}
                  className="rounded-full p-0.5 hover:bg-[#F1634F]/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {value.length === 0 && (
        <p className="text-xs text-[#8A8D99]">
          Select at least one department to continue setting up wards.
        </p>
      )}
    </div>
  );
}
