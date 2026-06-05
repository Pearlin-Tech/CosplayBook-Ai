// ===== FILE: src/components/vendorPortal/VendorWorkshopProfile.tsx =====
import { useState } from "react";
import { Lock, Star, BadgeCheck, Clock, ShieldCheck } from "lucide-react";
import type { VendorProfile } from "@/mocks/vendorPortalData";
import { ALL_SPECIALTIES } from "@/mocks/vendorPortalData";

interface VendorWorkshopProfileProps {
  profile: VendorProfile;
  onSave: (updated: VendorProfile) => void;
  onRequestVerification: () => void;
}

export default function VendorWorkshopProfile({
  profile,
  onSave,
  onRequestVerification,
}: VendorWorkshopProfileProps) {
  const [form, setForm] = useState<VendorProfile>(profile);

  const update = <K extends keyof VendorProfile>(key: K, value: VendorProfile[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleSpecialty = (s: string) =>
    setForm((f) => ({
      ...f,
      specialty_tags: f.specialty_tags.includes(s)
        ? f.specialty_tags.filter((t) => t !== s)
        : [...f.specialty_tags, s],
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white">Workshop Profile</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[38%_62%]">
        {/* Preview */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-[#52525B]">
            How you appear on the platform
          </p>
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-900 text-xl font-semibold text-indigo-300">
              {form.initials}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {form.workshop_name || "Workshop Name"}
            </h3>
            <p className="text-sm text-[#A1A1AA]">{form.owner_name || "Owner Name"}</p>

            <div className="mt-2 flex items-center gap-3">
              {form.is_verified ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-[#F59E0B]">
                  <Clock className="h-3.5 w-3.5" /> Pending
                </span>
              )}
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.round(form.rating_score)
                        ? "fill-indigo-500 text-indigo-500"
                        : "fill-zinc-700 text-zinc-700"
                    }`}
                  />
                ))}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {form.specialty_tags.map((t) => (
                <span key={t} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <p className="mb-1 text-xs text-[#A1A1AA]">
                {form.active_assignments} / {form.max_capacity} slots active
              </p>
              <div className="flex gap-1">
                {Array.from({ length: form.max_capacity }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < form.active_assignments ? "bg-indigo-500" : "bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit form */}
        <div className="space-y-6">
          {/* Workshop info */}
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Workshop Info</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-[#A1A1AA]">Workshop Name</label>
                <input
                  value={form.workshop_name}
                  onChange={(e) => update("workshop_name", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A1A1AA]">Owner Name</label>
                <input
                  value={form.owner_name}
                  onChange={(e) => update("owner_name", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A1A1AA]">Email</label>
                <div className="relative">
                  <input
                    value={form.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 pr-9 text-sm text-[#52525B]"
                  />
                  <Lock className="absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#52525B]" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-[#A1A1AA]">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-xs text-[#A1A1AA]">About / Bio</label>
              <textarea
                value={form.bio}
                maxLength={200}
                onChange={(e) => update("bio", e.target.value)}
                rows={3}
                className="w-full resize-none rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
              <p className="mt-1 text-right text-xs text-[#52525B]">{form.bio.length}/200</p>
            </div>
          </div>

          {/* Specializations */}
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">Specializations</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ALL_SPECIALTIES.map((s) => {
                const checked = form.specialty_tags.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSpecialty(s)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      checked
                        ? "bg-indigo-600 text-white"
                        : "border border-white/[0.12] text-[#A1A1AA] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capacity */}
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Capacity</h3>
              <span className="font-mono text-sm text-[#818CF8]">{form.max_capacity}</span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              value={form.max_capacity}
              onChange={(e) => update("max_capacity", Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <p className="mt-2 text-xs text-[#52525B]">
              Maximum simultaneous orders your workshop can handle
            </p>
          </div>

          <button
            onClick={() => onSave(form)}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Save Changes
          </button>

          {!form.is_verified && (
            <div className="rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/[0.05] p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#F59E0B]">
                <ShieldCheck className="h-4 w-4" /> Request Verification
              </h3>
              <p className="mt-2 text-xs text-[#A1A1AA]">
                Verified workshops appear higher in matching and unlock larger orders. Submit your
                details for review — approval usually takes 1–2 business days.
              </p>
              <button
                onClick={onRequestVerification}
                className="mt-3 rounded-lg border border-[#F59E0B]/40 px-4 py-2 text-sm font-medium text-[#F59E0B] transition-colors hover:bg-[#F59E0B]/10"
              >
                Submit Verification Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
