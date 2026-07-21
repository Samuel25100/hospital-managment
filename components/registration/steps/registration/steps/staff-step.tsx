"use client";

import { Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  STAFF_ROLES,
  STAFF_SEAT_LIMIT,
  emptyStaff,
  type StaffMember,
} from "@/lib/registration-types";

interface StaffStepProps {
  value: StaffMember[];
  onChange: (value: StaffMember[]) => void;
}

const SPECIALIZATION_ROLES: StaffMember["role"][] = ["Doctor", "Nurse"];

export function StaffStep({ value, onChange }: StaffStepProps) {
  const atLimit = value.length >= STAFF_SEAT_LIMIT;

  function addStaff() {
    if (atLimit) return;
    onChange([...value, emptyStaff()]);
  }

  function removeStaff(id: string) {
    onChange(value.filter((s) => s.id !== id));
  }

  function updateStaff(id: string, patch: Partial<StaffMember>) {
    onChange(value.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#12172B]">Add your staff</h2>
          <p className="mt-1 text-sm text-[#6E7180]">
            Your Clinic plan includes up to {STAFF_SEAT_LIMIT} staff accounts. You can invite
            them by email once your account is live.
          </p>
        </div>
        <div
          className={cn(
            "shrink-0 rounded-full border px-3 py-1 text-xs font-semibold",
            atLimit
              ? "border-[#F1634F] bg-[#F1634F]/10 text-[#E14F3B]"
              : "border-[#E4E1D8] bg-[#FAF9F5] text-[#6E7180]"
          )}
        >
          {value.length} of {STAFF_SEAT_LIMIT} seats used
        </div>
      </div>

      {value.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-[#DCD9CF] py-12 text-center">
          <Users className="h-6 w-6 text-[#8A8D99]" />
          <p className="text-sm text-[#6E7180]">No staff added yet.</p>
          <Button type="button" variant="outline" size="sm" onClick={addStaff} className="mt-1 gap-1.5">
            <Plus className="h-4 w-4" /> Add your first staff member
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {value.map((staff, index) => {
          const needsSpecialization = SPECIALIZATION_ROLES.includes(staff.role);
          return (
            <div key={staff.id} className="rounded-lg border border-[#E4E1D8] p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-[#12172B]">
                  Staff member {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeStaff(staff.id)}
                  className="text-[#8A8D99] transition-colors hover:text-[#E14F3B]"
                  aria-label="Remove staff member"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium text-[#12172B]">Full name</Label>
                  <Input
                    placeholder="e.g. Dr. Amara Okello"
                    value={staff.fullName}
                    onChange={(e) => updateStaff(staff.id, { fullName: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#12172B]">Role</Label>
                  <Select
                    value={staff.role}
                    onValueChange={(v) => updateStaff(staff.id, { role: v as StaffMember["role"] })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAFF_ROLES.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#12172B]">Email</Label>
                  <Input
                    type="email"
                    placeholder="name@yourfacility.com"
                    value={staff.email}
                    onChange={(e) => updateStaff(staff.id, { email: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-[#12172B]">Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+256 700 000 000"
                    value={staff.phone}
                    onChange={(e) => updateStaff(staff.id, { phone: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                {needsSpecialization && (
                  <div className="sm:col-span-2">
                    <Label className="text-sm font-medium text-[#12172B]">
                      Specialization <span className="text-[#8A8D99]">(optional)</span>
                    </Label>
                    <Input
                      placeholder="e.g. Obstetrics, Pediatric care"
                      value={staff.specialization}
                      onChange={(e) =>
                        updateStaff(staff.id, { specialization: e.target.value })
                      }
                      className="mt-1.5"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addStaff}
        disabled={atLimit}
        className="gap-1.5"
      >
        <Plus className="h-4 w-4" />
        {atLimit ? "Seat limit reached" : "Add staff member"}
      </Button>
    </div>
  );
}
