"use client";

import { useState } from "react";
import { Plus, Trash2, TestTube2, Sparkles } from "lucide-react";
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
import { LAB_TEST_CATEGORIES, makeId, type LabTest } from "@/lib/types";
import { SUGGESTED_LAB_TESTS } from "@/lib/constants";

interface LabTestsStepProps {
  value: LabTest[];
  onChange: (value: LabTest[]) => void;
}

const emptyDraft: Omit<LabTest, "id"> = {
  name: "",
  category: "",
  sampleType: "",
  turnaroundTime: "",
};

export function LabTestsStep({ value, onChange }: LabTestsStepProps) {
  const [draft, setDraft] = useState(emptyDraft);
  const canAdd = draft.name.trim() && draft.category;

  function addTest(test: Omit<LabTest, "id">) {
    if (value.some((t) => t.name.toLowerCase() === test.name.toLowerCase())) return;
    onChange([...value, { ...test, id: makeId() }]);
  }

  function addDraft() {
    if (!canAdd) return;
    addTest(draft);
    setDraft(emptyDraft);
  }

  function removeTest(id: string) {
    onChange(value.filter((t) => t.id !== id));
  }

  const availablePresets = SUGGESTED_LAB_TESTS.filter(
    (p) => !value.some((t) => t.name.toLowerCase() === p.name.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <p className="text-sm text-[#101B33]/60">
        List the tests your clinic can process in-house. Anything you refer
        out can be left off — you can always add more later.
      </p>

      {availablePresets.length > 0 && (
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#101B33]/40">
            <Sparkles className="h-3.5 w-3.5" />
            Common tests — tap to add
          </p>
          <div className="flex flex-wrap gap-2">
            {availablePresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() =>
                  addTest({ ...preset, category: preset.category as LabTest["category"], turnaroundTime: "" })
                }
                className="rounded-full border border-[#E5E1D8] px-3.5 py-1.5 text-sm text-[#101B33]/70 transition-colors hover:border-[#101B33]/30"
              >
                + {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-xl border border-[#E5E1D8] p-4">
        <p className="text-sm font-medium text-[#101B33]">Add a custom test</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="testName">Test name</Label>
            <Input
              id="testName"
              placeholder="e.g. Lipid Profile"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="testCategory">Category</Label>
            <Select
              value={draft.category}
              onValueChange={(v) => setDraft({ ...draft, category: v as LabTest["category"] })}
            >
              <SelectTrigger id="testCategory">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {LAB_TEST_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sampleType">Sample type</Label>
            <Input
              id="sampleType"
              placeholder="e.g. Blood, Urine, Swab"
              value={draft.sampleType}
              onChange={(e) => setDraft({ ...draft, sampleType: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="turnaround">Typical turnaround</Label>
            <Input
              id="turnaround"
              placeholder="e.g. 30 minutes, 24 hours"
              value={draft.turnaroundTime}
              onChange={(e) => setDraft({ ...draft, turnaroundTime: e.target.value })}
            />
          </div>
        </div>
        <Button type="button" onClick={addDraft} disabled={!canAdd} className="bg-[#101B33] hover:bg-[#101B33]/90">
          <Plus className="mr-1.5 h-4 w-4" />
          Add test
        </Button>
      </div>

      <div className="space-y-2">
        {value.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">No lab tests added yet.</p>
        ) : (
          value.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E1D8] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101B33]/5">
                  <TestTube2 className="h-4 w-4 text-[#101B33]/50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#101B33]">{t.name}</p>
                  <p className="text-xs text-[#101B33]/50">
                    {t.category}
                    {t.sampleType ? ` · ${t.sampleType}` : ""}
                    {t.turnaroundTime ? ` · ${t.turnaroundTime}` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeTest(t.id)}
                aria-label={`Remove ${t.name}`}
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
