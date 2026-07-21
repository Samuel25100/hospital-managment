"use client";

import { useState } from "react";
import { Plus, X, CreditCard, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PAYMENT_METHODS, type InsuranceInfo, type PaymentMethod } from "@/lib/types";

interface InsuranceStepProps {
  value: InsuranceInfo;
  onChange: (value: InsuranceInfo) => void;
}

export function InsuranceStep({ value, onChange }: InsuranceStepProps) {
  const [providerDraft, setProviderDraft] = useState("");

  function toggleMethod(method: PaymentMethod) {
    const has = value.paymentMethods.includes(method);
    onChange({
      ...value,
      paymentMethods: has
        ? value.paymentMethods.filter((m) => m !== method)
        : [...value.paymentMethods, method],
    });
  }

  function addProvider() {
    const trimmed = providerDraft.trim();
    if (!trimmed || value.acceptedProviders.includes(trimmed)) return;
    onChange({ ...value, acceptedProviders: [...value.acceptedProviders, trimmed] });
    setProviderDraft("");
  }

  function removeProvider(provider: string) {
    onChange({
      ...value,
      acceptedProviders: value.acceptedProviders.filter((p) => p !== provider),
    });
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Label className="flex items-center gap-1.5">
          <CreditCard className="h-3.5 w-3.5 text-[#101B33]/40" />
          Payment methods you accept
        </Label>
        <div className="flex flex-wrap gap-2">
          {PAYMENT_METHODS.map((method) => {
            const active = value.paymentMethods.includes(method);
            return (
              <button
                key={method}
                type="button"
                onClick={() => toggleMethod(method)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-[#101B33] bg-[#101B33] text-white"
                    : "border-[#E5E1D8] text-[#101B33]/70 hover:border-[#101B33]/30"
                }`}
              >
                {method}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-[#101B33]/40" />
          Insurance providers you accept
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Jubilee Health, AAR, UAP"
            value={providerDraft}
            onChange={(e) => setProviderDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addProvider())}
          />
          <Button type="button" variant="secondary" onClick={addProvider}>
            <Plus className="mr-1.5 h-4 w-4" />
            Add
          </Button>
        </div>

        {value.acceptedProviders.length === 0 ? (
          <p className="text-xs text-[#101B33]/40">
            No insurers added — leave blank if your clinic is cash/mobile-money only.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {value.acceptedProviders.map((provider) => (
              <span
                key={provider}
                className="flex items-center gap-1.5 rounded-full bg-[#F0554F]/10 px-3.5 py-1.5 text-sm text-[#101B33]"
              >
                {provider}
                <button type="button" onClick={() => removeProvider(provider)} aria-label={`Remove ${provider}`}>
                  <X className="h-3.5 w-3.5 text-[#101B33]/50 hover:text-[#F0554F]" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
