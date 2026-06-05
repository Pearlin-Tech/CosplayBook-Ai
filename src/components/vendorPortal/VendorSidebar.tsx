// ===== FILE: src/components/vendorPortal/VendorSidebar.tsx =====
import {
  LayoutDashboard,
  Package,
  IndianRupee,
  Settings,
  LogOut,
  LifeBuoy,
  BadgeCheck,
  Clock,
} from "lucide-react";
import type { VendorProfile } from "@/mocks/vendorPortalData";

export type VendorTab = "home" | "orders" | "earnings" | "profile";

interface VendorSidebarProps {
  active: VendorTab;
  onChange: (tab: VendorTab) => void;
  profile: VendorProfile;
  activeOrderCount: number;
}

const navItems: { id: VendorTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "earnings", label: "Earnings", icon: IndianRupee },
  { id: "profile", label: "Workshop Profile", icon: Settings },
];

export default function VendorSidebar({
  active,
  onChange,
  profile,
  activeOrderCount,
}: VendorSidebarProps) {
  return (
    <aside className="flex w-[240px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0A0A0B] p-4">
      {/* Brand */}
      <div className="px-2 pb-4">
        <span className="text-sm font-bold text-[#6366F1]">CosplayBook</span>
        <span className="ml-1.5 text-xs text-[#52525B]">Vendor Portal</span>
      </div>

      <div className="border-t border-white/[0.08]" />

      {/* Workshop identity */}
      <div className="flex items-center gap-3 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900 text-sm font-semibold text-indigo-300">
          {profile.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {profile.workshop_name}
          </p>
          {profile.is_verified ? (
            <span className="inline-flex items-center gap-1 text-xs text-[#22C55E]">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs text-[#F59E0B]">
              <Clock className="h-3 w-3" /> Pending
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.08]" />

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex items-center gap-3 rounded-r-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "border-l-2 border-indigo-500 bg-[#18181B] text-white"
                  : "border-l-2 border-transparent text-[#71717A] hover:bg-[#111113] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === "orders" && activeOrderCount > 0 && (
                <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {activeOrderCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-4">
        <button className="flex items-center gap-2 px-3 text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]">
          <LifeBuoy className="h-3.5 w-3.5" /> Help &amp; Support
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-white/[0.12] px-3 py-2 text-sm text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
