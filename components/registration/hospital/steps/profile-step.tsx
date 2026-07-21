"use client";

import { Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HospitalProfile } from "@/lib/hospital-types";

interface ProfileStepProps {
  value: HospitalProfile;
  onChange: (value: HospitalProfile) => void;
  errors: Partial<Record<keyof HospitalProfile, string>>;
}

export function ProfileStep({ value, onChange, errors }: ProfileStepProps) {
  function set<K extends keyof HospitalProfile>(key: K, val: HospitalProfile[K]) {
    onChange({ ...value, [key]: val });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-lg border border-[#E4E1D8] bg-[#FAF9F5] p-4">
        <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F1634F]" />
        <div>
          <p className="text-sm font-semibold text-[#12172B]">Hospital plan</p>
          <p className="text-xs text-[#6E7180]">
            Unlimited staff accounts, multi-branch billing, and full ward, lab, pharmacy &
            radiology modules.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Tell us about your hospital</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          This is your organization's identity across every branch on Wardline.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="hospitalName" className="text-sm font-medium text-[#12172B]">
            Hospital name
          </Label>
          <Input
            id="hospitalName"
            placeholder="e.g. Kampala General Hospital"
            value={value.hospitalName}
            onChange={(e) => set("hospitalName", e.target.value)}
            className="mt-1.5"
          />
          {errors.hospitalName && (
            <p className="mt-1 text-xs text-[#E14F3B]">{errors.hospitalName}</p>
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
          <Label htmlFor="hospitalPhone" className="text-sm font-medium text-[#12172B]">
            Main phone number
          </Label>
          <Input
            id="hospitalPhone"
            type="tel"
            placeholder="+256 700 000 000"
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="mt-1.5"
          />
          {errors.phone && <p className="mt-1 text-xs text-[#E14F3B]">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="hospitalEmail" className="text-sm font-medium text-[#12172B]">
            Admin email
          </Label>
          <Input
            id="hospitalEmail"
            type="email"
            placeholder="admin@yourhospital.com"
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
