import { useState } from "react";
import { Users, Gauge, ListChecks, Award, Plus } from "lucide-react";
import VendorMetricCard from "./VendorMetricCard";
import VendorRosterGrid from "./VendorRosterGrid";
import CapacityGauge from "./CapacityGauge";
import ActivityFeed from "./ActivityFeed";
import VendorOnboardingModal from "./VendorOnboardingModal";
import VendorAnalyticsDrawer from "./VendorAnalyticsDrawer";
import { vendors, type Vendor } from "@/lib/vendorData";

export default function VendorFleet() {
  const [onboarding, setOnboarding] = useState(false);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(null);

  const queueDepth = 142;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/30">
            HyperVault Studio <span className="text-white/15">/</span> Fleet
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Vendor Control Center
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 rounded-full border border-[#DFFF00]/20 bg-[#DFFF00]/5 px-3 py-1.5 text-xs font-medium text-[#DFFF00]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#DFFF00]" /> FLEET ONLINE
          </span>
          <button
            onClick={() => setOnboarding(true)}
            className="flex items-center gap-1.5 rounded-[0.5rem] bg-[#DFFF00] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add Workshop
          </button>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <VendorMetricCard
          label="Active Crafters"
          value="24"
          subtitle="Workshops Online"
          icon={<Users className="h-5 w-5" />}
        />
        <VendorMetricCard label="Utilization Rate" value="87%" arcPercent={87} />
        <VendorMetricCard
          label="Queue Depth"
          value={String(queueDepth)}
          subtitle={queueDepth > 100 ? "High load — Pending Assignments" : "Pending Assignments"}
          warning={queueDepth > 100}
          icon={<ListChecks className="h-5 w-5" />}
        />
        <VendorMetricCard
          label="Fulfillment Rating"
          value="98.4%"
          subtitle="Last 30 days"
          icon={<Award className="h-5 w-5" />}
          trend={{ direction: "up", value: "+2.1%" }}
        />
      </div>

      {/* Roster + side column */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <VendorRosterGrid
            onAssign={(v) => setActiveVendor(v)}
            onViewProfile={(v) => setActiveVendor(v)}
          />
        </div>
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
            <div className="mb-2 flex items-center gap-2">
              <Gauge className="h-4 w-4 text-[#DFFF00]" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Workshop Capacity
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              {vendors.map((v) => (
                <CapacityGauge key={v.id} vendor={v} />
              ))}
            </div>
          </div>
          <ActivityFeed />
        </div>
      </div>

      <VendorOnboardingModal open={onboarding} onClose={() => setOnboarding(false)} />
      <VendorAnalyticsDrawer vendor={activeVendor} onClose={() => setActiveVendor(null)} />
    </div>
  );
}
