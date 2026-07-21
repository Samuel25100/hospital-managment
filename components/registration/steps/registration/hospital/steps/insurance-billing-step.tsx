"use client";

import { useState } from "react";
import { Plus, Receipt, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { INSURANCE_CATALOG } from "@/lib/hospital-catalog";
import {
  makeId,
  type BranchBilling,
  type InsuranceProvider,
  type Location,
} from "@/lib/hospital-types";

interface InsuranceBillingStepProps {
  insuranceProviders: InsuranceProvider[];
  onInsuranceChange: (value: InsuranceProvider[]) => void;
  branchBilling: BranchBilling[];
  onBranchBillingChange: (value: BranchBilling[]) => void;
  locations: Location[];
}

export function InsuranceBillingStep({
  insuranceProviders,
  onInsuranceChange,
  branchBilling,
  onBranchBillingChange,
  locations,
}: InsuranceBillingStepProps) {
  const [customInput, setCustomInput] = useState("");
  const isSelected = (name: string) => insuranceProviders.some((p) => p.name === name);

  function toggleProvider(name: string, checked: boolean) {
    if (checked) {
      onInsuranceChange([...insuranceProviders, { id: makeId("ins"), name, custom: false }]);
    } else {
      onInsuranceChange(insuranceProviders.filter((p) => p.name !== name));
    }
  }

  function addCustomProvider() {
    const name = customInput.trim();
    if (!name || isSelected(name)) return;
    onInsuranceChange([...insuranceProviders, { id: makeId("ins"), name, custom: true }]);
    setCustomInput("");
  }

  function removeCustomProvider(id: string) {
    onInsuranceChange(insuranceProviders.filter((p) => p.id !== id));
  }

  function billingFor(locationId: string): boolean {
    return branchBilling.find((b) => b.locationId === locationId)?.handlesOwnBilling ?? false;
  }

  function setBillingFor(locationId: string, handlesOwnBilling: boolean) {
    const exists = branchBilling.some((b) => b.locationId === locationId);
    if (exists) {
      onBranchBillingChange(
        branchBilling.map((b) =>
          b.locationId === locationId ? { ...b, handlesOwnBilling } : b
        )
      );
    } else {
      onBranchBillingChange([...branchBilling, { locationId, handlesOwnBilling }]);
    }
  }

  const customProviders = insuranceProviders.filter((p) => p.custom);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Insurance & billing</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          Choose which insurers you accept, and decide whether each branch reconciles its own
          billing or rolls up to the center.
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-[#12172B]">Accepted insurance providers</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {INSURANCE_CATALOG.map((name) => (
            <label
              key={name}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E4E1D8] p-3 hover:border-[#101B3D]/40"
            >
              <Checkbox
                checked={isSelected(name)}
                onCheckedChange={(checked) => toggleProvider(name, checked === true)}
              />
              <span className="text-sm text-[#12172B]">{name}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input
            placeholder="Add a custom insurance provider"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomProvider();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addCustomProvider} className="shrink-0 gap-1.5">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>

        {customProviders.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {customProviders.map((p) => (
              <span
                key={p.id}
                className="flex items-center gap-1.5 rounded-full border border-[#F1634F]/30 bg-[#F1634F]/10 py-1 pl-3 pr-2 text-xs font-medium text-[#E14F3B]"
              >
                {p.name}
                <button
                  type="button"
                  onClick={() => removeCustomProvider(p.id)}
                  aria-label={`Remove ${p.name}`}
                  className="rounded-full p-0.5 hover:bg-[#F1634F]/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Receipt className="h-4 w-4 text-[#F1634F]" />
          <p className="text-sm font-semibold text-[#12172B]">Multi-branch billing</p>
        </div>
        <p className="mt-1 text-xs text-[#6E7180]">
          Branches with their own billing generate and reconcile invoices locally. Others roll
          their claims up to the center.
        </p>

        <div className="mt-3 space-y-2">
          {locations.map((loc) => (
            <label
              key={loc.id}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-[#E4E1D8] p-3"
            >
              <div>
                <p className="text-sm font-medium text-[#12172B]">
                  {loc.name || (loc.kind === "Center" ? "Center location" : "Unnamed branch")}
                </p>
                <p className="text-xs text-[#8A8D99]">{loc.kind}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6E7180]">Handles own billing</span>
                <Checkbox
                  checked={billingFor(loc.id)}
                  onCheckedChange={(checked) => setBillingFor(loc.id, checked === true)}
                />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
