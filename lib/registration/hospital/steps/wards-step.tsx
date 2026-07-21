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
import { cn } from "@/lib/utils";
import {
  BED_STATUSES,
  ROOM_TYPES,
  emptyBed,
  emptyRoom,
  emptyWard,
  type BedStatus,
  type Department,
  type Location,
  type Room,
  type Ward,
} from "@/lib/hospital-types";

interface WardsStepProps {
  value: Ward[];
  onChange: (value: Ward[]) => void;
  locations: Location[];
  departments: Department[];
}

const BED_STATUS_STYLES: Record<BedStatus, string> = {
  Available: "border-[#1F9D63]/30 bg-[#1F9D63]/10 text-[#1F9D63]",
  Occupied: "border-[#101B3D]/30 bg-[#101B3D]/10 text-[#101B3D]",
  Cleaning: "border-[#D3A72C]/30 bg-[#D3A72C]/10 text-[#8A6D1B]",
  "Out of Service": "border-[#E14F3B]/30 bg-[#E14F3B]/10 text-[#E14F3B]",
};

export function WardsStep({ value, onChange, locations, departments }: WardsStepProps) {
  const canAddWard = locations.length > 0 && departments.length > 0;

  function addWard() {
    if (!canAddWard) return;
    onChange([...value, emptyWard(locations[0].id, departments[0].id)]);
  }

  function removeWard(id: string) {
    onChange(value.filter((w) => w.id !== id));
  }

  function updateWard(id: string, patch: Partial<Ward>) {
    onChange(value.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }

  function addRoom(wardId: string) {
    onChange(
      value.map((w) => (w.id === wardId ? { ...w, rooms: [...w.rooms, emptyRoom()] } : w))
    );
  }

  function removeRoom(wardId: string, roomId: string) {
    onChange(
      value.map((w) =>
        w.id === wardId ? { ...w, rooms: w.rooms.filter((r) => r.id !== roomId) } : w
      )
    );
  }

  function updateRoom(wardId: string, roomId: string, patch: Partial<Room>) {
    onChange(
      value.map((w) =>
        w.id === wardId
          ? { ...w, rooms: w.rooms.map((r) => (r.id === roomId ? { ...r, ...patch } : r)) }
          : w
      )
    );
  }

  function addBed(wardId: string, roomId: string) {
    onChange(
      value.map((w) =>
        w.id === wardId
          ? {
              ...w,
              rooms: w.rooms.map((r) =>
                r.id === roomId
                  ? { ...r, beds: [...r.beds, emptyBed(r.beds.length + 1)] }
                  : r
              ),
            }
          : w
      )
    );
  }

  function removeBed(wardId: string, roomId: string, bedId: string) {
    onChange(
      value.map((w) =>
        w.id === wardId
          ? {
              ...w,
              rooms: w.rooms.map((r) =>
                r.id === roomId ? { ...r, beds: r.beds.filter((b) => b.id !== bedId) } : r
              ),
            }
          : w
      )
    );
  }

  function updateBed(
    wardId: string,
    roomId: string,
    bedId: string,
    patch: Partial<Room["beds"][number]>
  ) {
    onChange(
      value.map((w) =>
        w.id === wardId
          ? {
              ...w,
              rooms: w.rooms.map((r) =>
                r.id === roomId
                  ? {
                      ...r,
                      beds: r.beds.map((b) => (b.id === bedId ? { ...b, ...patch } : b)),
                    }
                  : r
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
          <h2 className="text-xl font-semibold text-[#12172B]">Wards, rooms & beds</h2>
          <p className="mt-1 text-sm text-[#6E7180]">
            Each ward belongs to a location and a department. Every bed gets its own label and
            status so the front desk always knows what's free.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addWard}
          disabled={!canAddWard}
          className="shrink-0 gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add ward
        </Button>
      </div>

      {!canAddWard && (
        <p className="text-xs text-[#8A8D99]">
          Add a location and at least one department first, then come back to set up wards.
        </p>
      )}

      {canAddWard && value.length === 0 && (
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

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                <Label className="text-sm font-medium text-[#12172B]">Location</Label>
                <Select
                  value={ward.locationId}
                  onValueChange={(v) => updateWard(ward.id, { locationId: v })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((l) => (
                      <SelectItem key={l.id} value={l.id}>
                        {l.name || (l.kind === "Center" ? "Center location" : "Unnamed branch")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-[#12172B]">Department</Label>
                <Select
                  value={ward.departmentId}
                  onValueChange={(v) => updateWard(ward.id, { departmentId: v })}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-5 space-y-4">
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

              {ward.rooms.length === 0 && (
                <p className="text-xs text-[#8A8D99]">No rooms added to this ward yet.</p>
              )}

              {ward.rooms.map((room) => (
                <div key={room.id} className="rounded-md border border-[#E4E1D8] bg-[#FAF9F5] p-4">
                  <div className="grid grid-cols-1 items-end gap-2 sm:grid-cols-[1.5fr_1fr_auto]">
                    <div>
                      <Label className="text-xs text-[#6E7180]">Room label</Label>
                      <Input
                        placeholder="Room 4B"
                        value={room.label}
                        onChange={(e) => updateRoom(ward.id, room.id, { label: e.target.value })}
                        className="mt-1 h-9 bg-white"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-[#6E7180]">Type</Label>
                      <Select
                        value={room.type}
                        onValueChange={(v) =>
                          updateRoom(ward.id, room.id, { type: v as Room["type"] })
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
                    <button
                      type="button"
                      onClick={() => removeRoom(ward.id, room.id)}
                      className="h-9 shrink-0 text-[#8A8D99] transition-colors hover:text-[#E14F3B]"
                      aria-label="Remove room"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-[#12172B]">Beds</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addBed(ward.id, room.id)}
                        className="h-7 gap-1 px-2 text-xs text-[#101B3D] hover:bg-[#101B3D]/5"
                      >
                        <Plus className="h-3 w-3" /> Add bed
                      </Button>
                    </div>

                    {room.beds.length === 0 ? (
                      <p className="mt-1.5 text-xs text-[#8A8D99]">No beds added to this room.</p>
                    ) : (
                      <div className="mt-2 space-y-1.5">
                        {room.beds.map((bed) => (
                          <div
                            key={bed.id}
                            className="grid grid-cols-1 items-center gap-2 rounded bg-white p-2 sm:grid-cols-[1fr_1fr_auto]"
                          >
                            <Input
                              value={bed.label}
                              onChange={(e) =>
                                updateBed(ward.id, room.id, bed.id, { label: e.target.value })
                              }
                              className="h-8 text-sm"
                            />
                            <Select
                              value={bed.status}
                              onValueChange={(v) =>
                                updateBed(ward.id, room.id, bed.id, { status: v as BedStatus })
                              }
                            >
                              <SelectTrigger
                                className={cn(
                                  "h-8 border text-xs font-medium",
                                  BED_STATUS_STYLES[bed.status]
                                )}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {BED_STATUSES.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <button
                              type="button"
                              onClick={() => removeBed(ward.id, room.id, bed.id)}
                              className="justify-self-start text-[#8A8D99] transition-colors hover:text-[#E14F3B] sm:justify-self-center"
                              aria-label="Remove bed"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
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
        ))}
      </div>
    </div>
  );
}
