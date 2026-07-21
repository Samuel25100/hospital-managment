"use client";

import { Building, MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { emptyLocation, type Location } from "@/lib/hospital-types";

interface LocationsStepProps {
  value: Location[];
  onChange: (value: Location[]) => void;
}

export function LocationsStep({ value, onChange }: LocationsStepProps) {
  const center = value.find((l) => l.kind === "Center");
  const branches = value.filter((l) => l.kind === "Branch");

  function updateLocation(id: string, patch: Partial<Location>) {
    onChange(value.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function addBranch() {
    onChange([...value, emptyLocation("Branch")]);
  }

  function removeBranch(id: string) {
    onChange(value.filter((l) => l.id !== id));
  }

  function renderFields(loc: Location) {
    return (
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label className="text-sm font-medium text-[#12172B]">Name</Label>
          <Input
            placeholder={loc.kind === "Center" ? "e.g. Main Campus" : "e.g. Nakawa Branch"}
            value={loc.name}
            onChange={(e) => updateLocation(loc.id, { name: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div className="sm:col-span-2">
          <Label className="text-sm font-medium text-[#12172B]">Street address</Label>
          <Input
            placeholder="Plot 14, Jinja Road"
            value={loc.addressLine}
            onChange={(e) => updateLocation(loc.id, { addressLine: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-[#12172B]">City / Town</Label>
          <Input
            placeholder="Kampala"
            value={loc.city}
            onChange={(e) => updateLocation(loc.id, { city: e.target.value })}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-[#12172B]">Phone</Label>
          <Input
            type="tel"
            placeholder="+256 700 000 000"
            value={loc.phone}
            onChange={(e) => updateLocation(loc.id, { phone: e.target.value })}
            className="mt-1.5"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Your locations</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          One center location plus as many branches as your hospital operates. Each branch can
          bill independently later in this setup.
        </p>
      </div>

      {center && (
        <div className="rounded-lg border border-[#101B3D] p-5">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-[#F1634F]" />
            <p className="text-sm font-semibold text-[#12172B]">Center location</p>
          </div>
          {renderFields(center)}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#12172B]">Branches</p>
          <Button type="button" variant="outline" size="sm" onClick={addBranch} className="gap-1.5">
            <Plus className="h-4 w-4" /> Add branch
          </Button>
        </div>

        {branches.length === 0 ? (
          <div className="mt-3 flex flex-col items-center gap-2 rounded-lg border border-dashed border-[#DCD9CF] py-10 text-center">
            <MapPin className="h-5 w-5 text-[#8A8D99]" />
            <p className="text-sm text-[#6E7180]">
              No branches yet — that's fine, add them whenever your hospital expands.
            </p>
          </div>
        ) : (
          <div className="mt-3 space-y-4">
            {branches.map((loc, index) => (
              <div key={loc.id} className={cn("rounded-lg border border-[#E4E1D8] p-5")}>
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-semibold text-[#12172B]">Branch {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => removeBranch(loc.id)}
                    className="text-[#8A8D99] transition-colors hover:text-[#E14F3B]"
                    aria-label="Remove branch"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {renderFields(loc)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
