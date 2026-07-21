"use client";

import { Building2, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FacilityProfile, FacilityType } from "@/lib/registration-types";

interface FacilityStepProps {
  value: FacilityProfile;
  onChange: (value: FacilityProfile) => void;
  errors: Partial<Record<keyof FacilityProfile, string>>;
}

const FACILITY_TYPES: { type: FacilityType; description: string; icon: typeof Building2 }[] = [
  {
    type: "Clinic",
    description: "A single-location practice with one care team.",
    icon: Stethoscope,
  },
  {
    type: "Hospital",
    description: "Multi-department, multi-ward facility.",
    icon: Building2,
  },
];

export function FacilityStep({ value, onChange, errors }: FacilityStepProps) {
  function set<K extends keyof FacilityProfile>(key: K, val: FacilityProfile[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Tell us about your facility</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          This becomes the name your staff and patients see across Wardline.
        </p>
      </div>

      <div>
        <Label className="text-sm font-medium text-[#12172B]">Facility type</Label>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FACILITY_TYPES.map(({ type, description, icon: Icon }) => {
            const selected = value.facilityType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => set("facilityType", type)}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                  selected
                    ? "border-[#101B3D] bg-[#101B3D] text-white"
                    : "border-[#E4E1D8] bg-white text-[#12172B] hover:border-[#101B3D]/40"
                )}
              >
                <Icon
                  className={cn("mt-0.5 h-5 w-5 shrink-0", selected ? "text-[#F1634F]" : "text-[#101B3D]")}
                />
                <div>
                  <p className="font-semibold">{type}</p>
                  <p className={cn("mt-0.5 text-xs", selected ? "text-white/70" : "text-[#6E7180]")}>
                    {description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="facilityName" className="text-sm font-medium text-[#12172B]">
            Facility name
          </Label>
          <Input
            id="facilityName"
            placeholder="e.g. Kampala Family Clinic"
            value={value.facilityName}
            onChange={(e) => set("facilityName", e.target.value)}
            className="mt-1.5"
          />
          {errors.facilityName && (
            <p className="mt-1 text-xs text-[#E14F3B]">{errors.facilityName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="registrationNumber" className="text-sm font-medium text-[#12172B]">
            Facility registration number
          </Label>
          <Input
            id="registrationNumber"
            placeholder="e.g. MOH-2024-00981"
            value={value.registrationNumber}
            onChange={(e) => set("registrationNumber", e.target.value)}
            className="mt-1.5"
          />
          {errors.registrationNumber && (
            <p className="mt-1 text-xs text-[#E14F3B]">{errors.registrationNumber}</p>
          )}
        </div>

        <div>
          <Label htmlFor="facilityPhone" className="text-sm font-medium text-[#12172B]">
            Main phone number
          </Label>
          <Input
            id="facilityPhone"
            type="tel"
            placeholder="+256 700 000 000"
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="mt-1.5"
          />
          {errors.phone && <p className="mt-1 text-xs text-[#E14F3B]">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="facilityEmail" className="text-sm font-medium text-[#12172B]">
            Admin email
          </Label>
          <Input
            id="facilityEmail"
            type="email"
            placeholder="admin@yourfacility.com"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            className="mt-1.5"
          />
          {errors.email && <p className="mt-1 text-xs text-[#E14F3B]">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
}
