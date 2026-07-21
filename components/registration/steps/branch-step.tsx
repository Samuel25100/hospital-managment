"use client";

import { Building2, MapPin, Phone, Mail, Clock, BadgeCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { WEEKDAYS, type BranchInfo, type Weekday, MAX_BRANCHES } from "@/lib/types";

interface BranchStepProps {
  value: BranchInfo;
  onChange: (value: BranchInfo) => void;
}

export function BranchStep({ value, onChange }: BranchStepProps) {
  function set<K extends keyof BranchInfo>(key: K, val: BranchInfo[K]) {
    onChange({ ...value, [key]: val });
  }

  function toggleDay(day: Weekday) {
    const has = value.operatingDays.includes(day);
    set(
      "operatingDays",
      has
        ? value.operatingDays.filter((d) => d !== day)
        : [...value.operatingDays, day]
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 rounded-xl border border-[#E5E1D8] bg-[#101B33]/[0.03] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[#101B33]/70">
          <Building2 className="h-4 w-4 text-[#F0554F]" />
          <span>
            Your Clinic plan supports <strong className="text-[#101B33]">{MAX_BRANCHES} location</strong>.
            You can add more when you move to Hospital.
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="clinicName">Clinic name</Label>
          <Input
            id="clinicName"
            placeholder="e.g. Riverside Family Clinic"
            value={value.clinicName}
            onChange={(e) => set("clinicName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseNumber" className="flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-[#101B33]/40" />
            Facility license / registration number
          </Label>
          <Input
            id="licenseNumber"
            placeholder="e.g. MOH-CL-04821"
            value={value.licenseNumber}
            onChange={(e) => set("licenseNumber", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city" className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-[#101B33]/40" />
            City / town
          </Label>
          <Input
            id="city"
            placeholder="e.g. Kampala"
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="addressLine">Street address</Label>
          <Input
            id="addressLine"
            placeholder="e.g. Plot 14, Kira Road"
            value={value.addressLine}
            onChange={(e) => set("addressLine", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-[#101B33]/40" />
            Reception phone number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g. +256 700 000 000"
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-[#101B33]/40" />
            Clinic email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. frontdesk@riversideclinic.com"
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-[#101B33]/40" />
          Operating days
        </Label>
        <div className="flex flex-wrap gap-2">
          {WEEKDAYS.map((day) => {
            const active = value.operatingDays.includes(day);
            return (
              <button key={day} type="button" onClick={() => toggleDay(day)}>
                <Badge
                  variant={active ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1 text-xs transition-colors ${
                    active
                      ? "bg-[#101B33] text-white hover:bg-[#101B33]/90"
                      : "text-[#101B33]/60 hover:bg-[#101B33]/5"
                  }`}
                >
                  {day}
                </Badge>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="openTime" className="text-xs text-[#101B33]/50">
              Opens
            </Label>
            <Input
              id="openTime"
              type="time"
              value={value.openTime}
              onChange={(e) => set("openTime", e.target.value)}
              className="w-32"
            />
          </div>
          <span className="mt-5 text-[#101B33]/30">–</span>
          <div className="space-y-1.5">
            <Label htmlFor="closeTime" className="text-xs text-[#101B33]/50">
              Closes
            </Label>
            <Input
              id="closeTime"
              type="time"
              value={value.closeTime}
              onChange={(e) => set("closeTime", e.target.value)}
              className="w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
