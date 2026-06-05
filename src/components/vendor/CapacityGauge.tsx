import { Clock } from "lucide-react";
import type { Vendor } from "@/lib/vendorData";

function gaugeColor(percent: number): string {
  if (percent <= 60) return "#DFFF00";
  if (percent <= 85) return "#F59E0B";
  return "#F97316";
}

interface CapacityGaugeProps {
  vendor: Pick<Vendor, "name" | "capacityPercent" | "activeSlots" | "maxSlots" | "lastUpdated">;
}

export default function CapacityGauge({ vendor }: CapacityGaugeProps) {
  const color = gaugeColor(vendor.capacityPercent);
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-32 shrink-0 truncate text-sm text-white">{vendor.name}</div>
      <div className="flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${vendor.capacityPercent}%`, backgroundColor: color }}
          />
        </div>
      </div>
      <div className="w-16 shrink-0 text-right text-xs font-medium" style={{ color }}>
        {vendor.capacityPercent}%
      </div>
      <div className="hidden w-24 shrink-0 text-right text-xs text-white/30 sm:block">
        {vendor.activeSlots}/{vendor.maxSlots} slots
      </div>
      <div className="hidden w-24 shrink-0 items-center justify-end gap-1 text-xs text-white/30 md:flex">
        <Clock className="h-3 w-3" />
        {vendor.lastUpdated}
      </div>
    </div>
  );
}
