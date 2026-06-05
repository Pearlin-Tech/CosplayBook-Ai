import { Star, ShieldCheck, Clock3 } from "lucide-react";
import type { Vendor, Specialty } from "@/lib/vendorData";

const cyanTags: Specialty[] = ["Electronics", "LED Integration", "3D Printing"];

function tagClass(tag: Specialty): string {
  return cyanTags.includes(tag)
    ? "bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30"
    : "bg-[#DFFF00]/15 text-[#DFFF00] border-[#DFFF00]/30";
}

interface VendorCardProps {
  vendor: Vendor;
  onAssign?: (vendor: Vendor) => void;
  onViewProfile?: (vendor: Vendor) => void;
}

export default function VendorCard({ vendor, onAssign, onViewProfile }: VendorCardProps) {
  return (
    <div className="group flex flex-col bg-white/5 border border-white/10 rounded-[1rem] p-5 backdrop-blur-md transition-colors hover:border-white/20">
      <div className="flex items-start gap-4">
        <div
          className={`h-14 w-14 shrink-0 rounded-[0.85rem] bg-gradient-to-br ${vendor.gradient} flex items-center justify-center text-sm font-bold text-black/80`}
        >
          {vendor.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-white">{vendor.name}</h3>
          <p className="truncate text-xs text-white/30">{vendor.owner}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-[#DFFF00] text-[#DFFF00]" />
            <span className="text-sm font-medium text-white">{vendor.rating.toFixed(1)}</span>
          </div>
        </div>
        {vendor.verification === "verified" ? (
          <span className="flex items-center gap-1 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#06B6D4]">
            <ShieldCheck className="h-3 w-3" /> VERIFIED
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-amber-400/15 border border-amber-400/30 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-amber-400">
            <Clock3 className="h-3 w-3" /> PENDING
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {vendor.specialties.map((tag) => (
          <span
            key={tag}
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tagClass(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-white/60">Active Slots</span>
          <span className="text-white">
            {vendor.activeSlots} / {vendor.maxSlots}
          </span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: vendor.maxSlots }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i < vendor.activeSlots ? "bg-[#DFFF00]" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => onAssign?.(vendor)}
          className="flex-1 rounded-[0.5rem] bg-[#DFFF00] px-3 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90"
        >
          Assign Order
        </button>
        <button
          onClick={() => onViewProfile?.(vendor)}
          className="rounded-[0.5rem] border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
