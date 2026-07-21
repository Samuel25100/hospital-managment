"use client";

import { useState } from "react";
import { Plus, Trash2, UserRound, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAX_STAFF, STAFF_ROLES, makeId, type StaffMember } from "@/lib/types";

interface StaffStepProps {
  value: StaffMember[];
  onChange: (value: StaffMember[]) => void;
}

const emptyDraft: Omit<StaffMember, "id"> = {
  fullName: "",
  role: "",
  specialization: "",
  email: "",
  phone: "",
};

export function StaffStep({ value, onChange }: StaffStepProps) {
  const [draft, setDraft] = useState(emptyDraft);
  const atLimit = value.length >= MAX_STAFF;
  const canAdd = draft.fullName.trim() && draft.role && !atLimit;

  function addStaff() {
    if (!canAdd) return;
    onChange([...value, { ...draft, id: makeId() }]);
    setDraft(emptyDraft);
  }

  function removeStaff(id: string) {
    onChange(value.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-xl border border-[#E5E1D8] bg-[#101B33]/[0.03] px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-[#101B33]/70">
          <Users className="h-4 w-4 text-[#F0554F]" />
          <span>Clinic plan includes up to {MAX_STAFF} staff accounts.</span>
        </div>
        <span className="font-mono text-sm font-semibold text-[#101B33]">
          {value.length}/{MAX_STAFF}
        </span>
      </div>

      {!atLimit && (
        <div className="space-y-4 rounded-xl border border-[#E5E1D8] p-4">
          <p className="text-sm font-medium text-[#101B33]">Add a staff member</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="staffName">Full name</Label>
              <Input
                id="staffName"
                placeholder="e.g. Dr. Amara Okello"
                value={draft.fullName}
                onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="staffRole">Role</Label>
              <Select
                value={draft.role}
                onValueChange={(v) => setDraft({ ...draft, role: v as StaffMember["role"] })}
              >
                <SelectTrigger id="staffRole">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {STAFF_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="staffSpecialization">Specialization (optional)</Label>
              <Input
                id="staffSpecialization"
                placeholder="e.g. Pediatrics"
                value={draft.specialization}
                onChange={(e) => setDraft({ ...draft, specialization: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="staffPhone">Phone number</Label>
              <Input
                id="staffPhone"
                type="tel"
                placeholder="e.g. +256 700 000 000"
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="staffEmail">Email</Label>
              <Input
                id="staffEmail"
                type="email"
                placeholder="e.g. amara@riversideclinic.com"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
              />
            </div>
          </div>
          <Button type="button" onClick={addStaff} disabled={!canAdd} className="bg-[#101B33] hover:bg-[#101B33]/90">
            <Plus className="mr-1.5 h-4 w-4" />
            Add staff member
          </Button>
        </div>
      )}

      {atLimit && (
        <p className="text-sm text-[#F0554F]">
          You&apos;ve reached the 8-account limit for the Clinic plan. Remove someone below to
          add another, or upgrade to Hospital for unlimited staff accounts.
        </p>
      )}

      <div className="space-y-2">
        {value.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">No staff added yet.</p>
        ) : (
          value.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E1D8] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101B33]/5">
                  <UserRound className="h-4 w-4 text-[#101B33]/50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#101B33]">{s.fullName}</p>
                  <p className="text-xs text-[#101B33]/50">
                    {s.role}
                    {s.specialization ? ` · ${s.specialization}` : ""}
                    {s.email ? ` · ${s.email}` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeStaff(s.id)}
                aria-label={`Remove ${s.fullName}`}
                className="text-[#101B33]/30 hover:text-[#F0554F]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
