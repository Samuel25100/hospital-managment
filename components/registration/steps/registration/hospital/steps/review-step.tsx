"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HospitalRegistrationState } from "@/lib/hospital-types";

interface ReviewStepProps {
  state: HospitalRegistrationState;
  onEditStep: (index: number) => void;
}

function SummaryCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[#E4E1D8] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[#12172B]">{title}</p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-7 gap-1 px-2 text-xs text-[#101B3D] hover:bg-[#101B3D]/5"
        >
          <Pencil className="h-3 w-3" /> Edit
        </Button>
      </div>
      <div className="mt-3 text-sm text-[#6E7180]">{children}</div>
    </div>
  );
}

export function ReviewStep({ state, onEditStep }: ReviewStepProps) {
  const { profile, locations, departments, wards, staff, labTests, pharmacyItems, radiologyServices, insuranceProviders, branchBilling } = state;
  const totalBeds = wards.reduce(
    (sum, w) => sum + w.rooms.reduce((rSum, r) => rSum + r.beds.length, 0),
    0
  );
  const totalRooms = wards.reduce((sum, w) => sum + w.rooms.length, 0);
  const branches = locations.filter((l) => l.kind === "Branch");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Review before you submit</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          Double check everything below — you can jump back to any step to fix it.
        </p>
      </div>

      <SummaryCard title="Hospital profile" onEdit={() => onEditStep(0)}>
        <p>{profile.hospitalName || "—"}</p>
        <p>{profile.registrationNumber || "No registration number provided"}</p>
        <p>{profile.email || "—"} · {profile.phone || "—"}</p>
      </SummaryCard>

      <SummaryCard title="Locations" onEdit={() => onEditStep(1)}>
        <p>1 center location, {branches.length} branch{branches.length === 1 ? "" : "es"}</p>
      </SummaryCard>

      <SummaryCard title="Departments" onEdit={() => onEditStep(2)}>
        {departments.length === 0 ? (
          <p>No departments selected yet.</p>
        ) : (
          <p>{departments.map((d) => d.name).join(", ")}</p>
        )}
      </SummaryCard>

      <SummaryCard title="Wards, rooms & beds" onEdit={() => onEditStep(3)}>
        <p>
          {wards.length} ward{wards.length === 1 ? "" : "s"} · {totalRooms} room
          {totalRooms === 1 ? "" : "s"} · {totalBeds} bed{totalBeds === 1 ? "" : "s"}
        </p>
      </SummaryCard>

      <SummaryCard title="Staff" onEdit={() => onEditStep(4)}>
        <p>{staff.length} staff member{staff.length === 1 ? "" : "s"} added</p>
      </SummaryCard>

      <SummaryCard title="Lab, pharmacy & radiology" onEdit={() => onEditStep(5)}>
        <p>{labTests.length} lab tests · {pharmacyItems.length} pharmacy categories · {radiologyServices.length} radiology services</p>
      </SummaryCard>

      <SummaryCard title="Insurance & billing" onEdit={() => onEditStep(6)}>
        <p>{insuranceProviders.length} insurance provider{insuranceProviders.length === 1 ? "" : "s"} accepted</p>
        <p>
          {branchBilling.filter((b) => b.handlesOwnBilling).length} of {locations.length} locations
          handle their own billing
        </p>
      </SummaryCard>
    </div>
  );
}
