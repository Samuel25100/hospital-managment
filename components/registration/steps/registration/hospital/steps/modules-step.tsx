"use client";

import { useState } from "react";
import { FlaskConical, Pill, Plus, Radiation, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LAB_TEST_CATALOG,
  PHARMACY_CATALOG,
  RADIOLOGY_CATALOG,
} from "@/lib/hospital-catalog";
import {
  makeId,
  type LabTest,
  type PharmacyItem,
  type RadiologyService,
} from "@/lib/hospital-types";

interface ModulesStepProps {
  labTests: LabTest[];
  onLabTestsChange: (value: LabTest[]) => void;
  pharmacyItems: PharmacyItem[];
  onPharmacyItemsChange: (value: PharmacyItem[]) => void;
  radiologyServices: RadiologyService[];
  onRadiologyServicesChange: (value: RadiologyService[]) => void;
}

// Generic checklist + custom-add UI shared across all three modules.
function CatalogChecklist<T extends { id: string; name: string; custom?: boolean; category?: string }>({
  commonNames,
  selected,
  onChange,
  placeholder,
  withCategory,
}: {
  commonNames: string[] | { name: string; category: string }[];
  selected: T[];
  onChange: (value: T[]) => void;
  placeholder: string;
  withCategory?: boolean;
}) {
  const [customInput, setCustomInput] = useState("");
  const isSelected = (name: string) => selected.some((s) => s.name === name);

  function toggle(name: string, category: string | undefined, checked: boolean) {
    if (checked) {
      onChange([
        ...selected,
        { id: makeId("item"), name, category, custom: false } as unknown as T,
      ]);
    } else {
      onChange(selected.filter((s) => s.name !== name));
    }
  }

  function addCustom() {
    const name = customInput.trim();
    if (!name || isSelected(name)) return;
    onChange([
      ...selected,
      { id: makeId("item"), name, category: "Custom", custom: true } as unknown as T,
    ]);
    setCustomInput("");
  }

  function removeCustom(id: string) {
    onChange(selected.filter((s) => s.id !== id));
  }

  const items: { name: string; category?: string }[] = withCategory
    ? (commonNames as { name: string; category: string }[])
    : (commonNames as string[]).map((name) => ({ name }));

  const customItems = selected.filter((s) => s.custom);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map(({ name, category }) => (
          <label
            key={name}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#E4E1D8] p-3 hover:border-[#101B3D]/40"
          >
            <Checkbox
              checked={isSelected(name)}
              onCheckedChange={(checked) => toggle(name, category, checked === true)}
            />
            <span className="text-sm text-[#12172B]">{name}</span>
          </label>
        ))}
      </div>

      <div>
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom();
              }
            }}
          />
          <Button type="button" variant="outline" onClick={addCustom} className="shrink-0 gap-1.5">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>

        {customItems.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {customItems.map((item) => (
              <span
                key={item.id}
                className="flex items-center gap-1.5 rounded-full border border-[#F1634F]/30 bg-[#F1634F]/10 py-1 pl-3 pr-2 text-xs font-medium text-[#E14F3B]"
              >
                {item.name}
                <button
                  type="button"
                  onClick={() => removeCustom(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="rounded-full p-0.5 hover:bg-[#F1634F]/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ModulesStep({
  labTests,
  onLabTestsChange,
  pharmacyItems,
  onPharmacyItemsChange,
  radiologyServices,
  onRadiologyServicesChange,
}: ModulesStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#12172B]">Lab, pharmacy & radiology</h2>
        <p className="mt-1 text-sm text-[#6E7180]">
          Select what your hospital offers today. You can turn on more modules any time from
          settings.
        </p>
      </div>

      <Tabs defaultValue="lab">
        <TabsList>
          <TabsTrigger value="lab" className="gap-1.5">
            <FlaskConical className="h-4 w-4" /> Lab tests
          </TabsTrigger>
          <TabsTrigger value="pharmacy" className="gap-1.5">
            <Pill className="h-4 w-4" /> Pharmacy
          </TabsTrigger>
          <TabsTrigger value="radiology" className="gap-1.5">
            <Radiation className="h-4 w-4" /> Radiology
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lab" className="pt-5">
          <CatalogChecklist
            commonNames={LAB_TEST_CATALOG}
            selected={labTests}
            onChange={onLabTestsChange}
            placeholder="Add a custom lab test"
            withCategory
          />
        </TabsContent>

        <TabsContent value="pharmacy" className="pt-5">
          <CatalogChecklist
            commonNames={PHARMACY_CATALOG}
            selected={pharmacyItems}
            onChange={onPharmacyItemsChange}
            placeholder="Add a custom pharmacy category"
            withCategory
          />
        </TabsContent>

        <TabsContent value="radiology" className="pt-5">
          <CatalogChecklist
            commonNames={RADIOLOGY_CATALOG}
            selected={radiologyServices}
            onChange={onRadiologyServicesChange}
            placeholder="Add a custom radiology service"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
