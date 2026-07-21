"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Branch } from "@/lib/registration-types";

interface BranchStepProps {
  value: Branch;
  onChange: (value: Branch) => void;
  errors: Partial<Record<keyof Branch, string>>;
}

export function BranchStep({ value, onChange, errors }: BranchStepProps) {
  function set<K extends keyof Branch>(key: K, val: Branch[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Where's your main branch?</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          Your plan currently supports 1 branch. You can add more later from account settings
          as your facility grows.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-[#E4E1D8] bg-[#FAF9F5] p-4">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F1634F]" />
        <div>
          <p className="text-sm font-semibold text-[#12172B]">Main branch</p>
          <p className="text-xs text-[#6E7180]">
            Marked as your primary location for billing and reporting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="branchName" className="text-sm font-medium text-[#12172B]">
            Branch name
          </Label>
          <Input
            id="branchName"
            placeholder="e.g. Nakawa Branch"
            value={value.name}
            onChange={(e) => set("name", e.target.value)}
            className="mt-1.5"
          />
          {errors.name && <p className="mt-1 text-xs text-[#E14F3B]">{errors.name}</p>}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="branchAddress" className="text-sm font-medium text-[#12172B]">
            Street address
          </Label>
          <Input
            id="branchAddress"
            placeholder="Plot 14, Jinja Road"
            value={value.addressLine}
            onChange={(e) => set("addressLine", e.target.value)}
            className="mt-1.5"
          />
          {errors.addressLine && (
            <p className="mt-1 text-xs text-[#E14F3B]">{errors.addressLine}</p>
          )}
        </div>

        <div>
          <Label htmlFor="branchCity" className="text-sm font-medium text-[#12172B]">
            City / Town
          </Label>
          <Input
            id="branchCity"
            placeholder="Kampala"
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            className="mt-1.5"
          />
          {errors.city && <p className="mt-1 text-xs text-[#E14F3B]">{errors.city}</p>}
        </div>

        <div>
          <Label htmlFor="branchPhone" className="text-sm font-medium text-[#12172B]">
            Branch phone
          </Label>
          <Input
            id="branchPhone"
            type="tel"
            placeholder="+256 700 000 000"
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="mt-1.5"
          />
          {errors.phone && <p className="mt-1 text-xs text-[#E14F3B]">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}
