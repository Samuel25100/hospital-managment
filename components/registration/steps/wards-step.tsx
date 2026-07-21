"use client";

import { BedDouble, Plus, Trash2 } from "lucide-react";
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
import {
  DEPARTMENTS,
  ROOM_TYPES,
  emptyRoom,
  emptyWard,
  type Ward,
} from "@/lib/registration-types";

interface WardsStepProps {
  value: Ward[];
  onChange: (value: Ward[]) => void;
}

export function WardsStep({ value, onChange }: WardsStepProps) {
  function addWard() {
    onChange([...value, emptyWard()]);
  }

  function removeWard(id: string) {
    onChange(value.filter((w) => w.id !== id));
  }

  function updateWard(id: string, patch: Partial<Ward>) {
    onChange(value.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }

  function addRoom(wardId: string) {
    onChange(
      value.map((w) =>
        w.id === wardId ? { ...w, rooms: [...w.rooms, emptyRoom()] } : w
      )
    );
  }

  function removeRoom(wardId: string, roomId: string) {
    onChange(
      value.map((w) =>
        w.id === wardId
          ? { ...w, rooms: w.rooms.filter((r) => r.id !== roomId) }
          : w
      )
    );
  }

  function updateRoom(
    wardId: string,
    roomId: string,
    patch: Partial<Ward["rooms"][number]>
  ) {
    onChange(
      value.map((w) =>
        w.id === wardId
          ? {
              ...w,
              rooms: w.rooms.map((r) =>
                r.id === roomId ? { ...r, ...patch } : r
              ),
            }
          : w
      )
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#12172B]">Set up your wards and rooms</h2>
          <p className="mt-1 text-sm text-[#6E7180]">
            Optional for single-room clinics. Add a ward for every unit you'll track bed status
            for, then list its rooms.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={addWard} className="shrink-0 gap-1.5">
          <Plus className="h-4 w-4" /> Add ward
        </Button>
      </div>

      {value.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-[#DCD9CF] py-12 text-center">
          <BedDouble className="h-6 w-6 text-[#8A8D99]" />
          <p className="text-sm text-[#6E7180]">No wards added yet.</p>
          <Button type="button" variant="outline" size="sm" onClick={addWard} className="mt-1 gap-1.5">
            <Plus className="h-4 w-4" /> Add your first ward
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {value.map((ward, wardIndex) => (
          <div key={ward.id} className="rounded-lg border border-[#E4E1D8] p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-semibold text-[#12172B]">Ward {wardIndex + 1}</p>
              <button
                type="button"
                onClick={() => removeWard(ward.id)}
                className="text-[#8A8D99] transition-colors hover:text-[#E14F3B]"
                aria-label="Remove ward"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-sm font-medium text-[#12172B]">Ward name</Label>
                <Input
                  placeholder="e.g. Maternity Ward A"
                  value={ward.name}
                  onChange={(e) => updateWard(ward.id, { name: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-[#12172B]">Department</Label>
                <Select
                  value={ward.department}
                  onValueChange={(v) => updateWard(ward.id, { department: v })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-[#12172B]">Rooms</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => addRoom(ward.id)}
                  className="gap-1 text-[#101B3D] hover:bg-[#101B3D]/5"
                >
                  <Plus className="h-3.5 w-3.5" /> Add room
                </Button>
              </div>

              {ward.rooms.length === 0 ? (
                <p className="mt-2 text-xs text-[#8A8D99]">No rooms added to this ward yet.</p>
              ) : (
                <div className="mt-2 space-y-2">
                  {ward.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="grid grid-cols-1 items-end gap-2 rounded-md bg-[#FAF9F5] p-3 sm:grid-cols-[1.5fr_1.2fr_0.8fr_auto]"
                    >
                      <div>
                        <Label className="text-xs text-[#6E7180]">Room label</Label>
                        <Input
                          placeholder="Room 4B"
                          value={room.label}
                          onChange={(e) =>
                            updateRoom(ward.id, room.id, { label: e.target.value })
                          }
                          className="mt-1 h-9 bg-white"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-[#6E7180]">Type</Label>
                        <Select
                          value={room.type}
                          onValueChange={(v) =>
                            updateRoom(ward.id, room.id, { type: v as Ward["rooms"][number]["type"] })
                          }
                        >
                          <SelectTrigger className="mt-1 h-9 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ROOM_TYPES.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-[#6E7180]">Beds</Label>
                        <Input
                          type="number"
                          min={1}
                          value={room.capacity}
                          onChange={(e) =>
                            updateRoom(ward.id, room.id, {
                              capacity: Number(e.target.value) || 1,
                            })
                          }
                          className="mt-1 h-9 bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRoom(ward.id, room.id)}
                        className="h-9 shrink-0 text-[#8A8D99] transition-colors hover:text-[#E14F3B]"
                        aria-label="Remove room"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
