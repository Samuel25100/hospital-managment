"use client";

import type { ElementType, ReactNode } from "react";
import {
  Building2,
  Stethoscope,
  Users,
  TestTube2,
  DoorOpen,
  CreditCard,
  Pencil,
} from "lucide-react";
import type { ClinicRegistrationData, StepId } from "@/lib/types";

interface ReviewStepProps {
  data: ClinicRegistrationData;
  onEdit: (step: StepId) => void;
}

function SectionCard({
  icon: Icon,
  title,
  step,
  onEdit,
  children,
}: {
  icon: ElementType;
  title: string;
  step: StepId;
  onEdit: (step: StepId) => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E5E1D8] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#F0554F]" />
          <h3 className="text-sm font-semibold text-[#101B33]">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 text-xs text-[#101B33]/50 hover:text-[#F0554F]"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

export function ReviewStep({ data, onEdit }: ReviewStepProps) {
  const { branch, departments, staff, labTests, rooms, insurance } = data;

  return (
    <div className="space-y-4">
      <p className="text-sm text-[#101B33]/60">
        Take a last look before you go live. You can come back and edit any
        of this later from clinic settings.
      </p>

      <SectionCard icon={Building2} title="Branch details" step="branch" onEdit={onEdit}>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-[#101B33]/50">Clinic name</dt>
          <dd className="text-[#101B33]">{branch.clinicName || "—"}</dd>
          <dt className="text-[#101B33]/50">License number</dt>
          <dd className="text-[#101B33]">{branch.licenseNumber || "—"}</dd>
          <dt className="text-[#101B33]/50">Address</dt>
          <dd className="text-[#101B33]">
            {[branch.addressLine, branch.city].filter(Boolean).join(", ") || "—"}
          </dd>
          <dt className="text-[#101B33]/50">Contact</dt>
          <dd className="text-[#101B33]">
            {[branch.phone, branch.email].filter(Boolean).join(" · ") || "—"}
          </dd>
          <dt className="text-[#101B33]/50">Hours</dt>
          <dd className="text-[#101B33]">
            {branch.operatingDays.join(", ") || "—"} · {branch.openTime}–{branch.closeTime}
          </dd>
        </dl>
      </SectionCard>

      <SectionCard icon={Stethoscope} title={`Departments (${departments.length})`} step="departments" onEdit={onEdit}>
        {departments.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">None selected</p>
        ) : (
          <p className="text-sm text-[#101B33]">{departments.join(", ")}</p>
        )}
      </SectionCard>

      <SectionCard icon={Users} title={`Staff (${staff.length}/8)`} step="staff" onEdit={onEdit}>
        {staff.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">No staff added</p>
        ) : (
          <ul className="space-y-1 text-sm text-[#101B33]">
            {staff.map((s) => (
              <li key={s.id}>
                {s.fullName} <span className="text-[#101B33]/50">— {s.role}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>

      <SectionCard icon={TestTube2} title={`Lab tests (${labTests.length})`} step="labTests" onEdit={onEdit}>
        {labTests.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">No lab tests added</p>
        ) : (
          <p className="text-sm text-[#101B33]">{labTests.map((t) => t.name).join(", ")}</p>
        )}
      </SectionCard>

      <SectionCard icon={DoorOpen} title={`Rooms (${rooms.length})`} step="rooms" onEdit={onEdit}>
        {rooms.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">No rooms added</p>
        ) : (
          <p className="text-sm text-[#101B33]">
            {rooms.map((r) => `${r.name} (${r.type})`).join(", ")}
          </p>
        )}
      </SectionCard>

      <SectionCard icon={CreditCard} title="Payments & insurance" step="insurance" onEdit={onEdit}>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-[#101B33]/50">Payment methods</dt>
          <dd className="text-[#101B33]">{insurance.paymentMethods.join(", ") || "—"}</dd>
          <dt className="text-[#101B33]/50">Insurers</dt>
          <dd className="text-[#101B33]">{insurance.acceptedProviders.join(", ") || "—"}</dd>
        </dl>
      </SectionCard>
    </div>
  );
}
