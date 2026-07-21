"use client";

import { useState } from "react";
import { Plus, Trash2, DoorOpen } from "lucide-react";
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
import { ROOM_TYPES, makeId, type Room } from "@/lib/types";

interface RoomsStepProps {
  value: Room[];
  onChange: (value: Room[]) => void;
}

const emptyDraft: Omit<Room, "id"> = { name: "", type: "", capacity: "" };

export function RoomsStep({ value, onChange }: RoomsStepProps) {
  const [draft, setDraft] = useState(emptyDraft);
  const canAdd = draft.name.trim() && draft.type;

  function addRoom() {
    if (!canAdd) return;
    onChange([...value, { ...draft, id: makeId() }]);
    setDraft(emptyDraft);
  }

  function removeRoom(id: string) {
    onChange(value.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-8">
      <p className="text-sm text-[#101B33]/60">
        Map out the physical spaces at your location — this powers
        appointment room assignment and, if you add an observation area,
        occupancy tracking.
      </p>

      <div className="space-y-4 rounded-xl border border-[#E5E1D8] p-4">
        <p className="text-sm font-medium text-[#101B33]">Add a room</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="roomName">Room name / number</Label>
            <Input
              id="roomName"
              placeholder="e.g. Room 2"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="roomType">Type</Label>
            <Select
              value={draft.type}
              onValueChange={(v) => setDraft({ ...draft, type: v as Room["type"] })}
            >
              <SelectTrigger id="roomType">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {ROOM_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="roomCapacity">Capacity (patients/beds)</Label>
            <Input
              id="roomCapacity"
              type="number"
              min={1}
              placeholder="e.g. 1"
              value={draft.capacity}
              onChange={(e) => setDraft({ ...draft, capacity: e.target.value })}
            />
          </div>
        </div>
        <Button type="button" onClick={addRoom} disabled={!canAdd} className="bg-[#101B33] hover:bg-[#101B33]/90">
          <Plus className="mr-1.5 h-4 w-4" />
          Add room
        </Button>
      </div>

      <div className="space-y-2">
        {value.length === 0 ? (
          <p className="text-sm text-[#101B33]/40">No rooms added yet.</p>
        ) : (
          value.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E1D8] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101B33]/5">
                  <DoorOpen className="h-4 w-4 text-[#101B33]/50" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#101B33]">{r.name}</p>
                  <p className="text-xs text-[#101B33]/50">
                    {r.type}
                    {r.capacity ? ` · capacity ${r.capacity}` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeRoom(r.id)}
                aria-label={`Remove ${r.name}`}
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
