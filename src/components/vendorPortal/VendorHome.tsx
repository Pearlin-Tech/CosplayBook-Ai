// ===== FILE: src/components/vendorPortal/VendorHome.tsx =====
import { ArrowUpRight, Star, Calendar } from "lucide-react";
import type { VendorOrder, VendorProfile, PayoutRecord } from "@/mocks/vendorPortalData";
import { formatINR } from "@/mocks/vendorPortalData";
import { StatusPill, deadlineColor, payoutStatusPill } from "./orderStatusUtils";

interface VendorHomeProps {
  profile: VendorProfile;
  orders: VendorOrder[];
  payouts: PayoutRecord[];
  completedThisMonth: number;
  onViewOrder: (id: string) => void;
  onGoToProfile: () => void;
  onGoToEarnings: () => void;
}

function StarRow({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.round(score)
              ? "fill-indigo-500 text-indigo-500"
              : "fill-zinc-700 text-zinc-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function VendorHome({
  profile,
  orders,
  payouts,
  completedThisMonth,
  onViewOrder,
  onGoToProfile,
  onGoToEarnings,
}: VendorHomeProps) {
  const activeOrders = orders.filter(
    (o) => o.status === "in_progress" || o.status === "ready" || o.status === "pending_acceptance",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white">
          Good morning, {profile.workshop_name}
        </h1>
        <p className="text-sm text-[#52525B]">Monday, 1 June 2026</p>
      </div>

      {!profile.is_verified && (
        <div className="flex items-center justify-between rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-5 py-3">
          <p className="text-sm text-[#F59E0B]">
            Your workshop is pending verification. Complete your profile to start receiving orders.
          </p>
          <button
            onClick={onGoToProfile}
            className="shrink-0 text-sm font-medium text-[#F59E0B] hover:underline"
          >
            Go to Profile →
          </button>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Active Orders
          </div>
          <p className="mt-2 text-3xl font-semibold text-white">{activeOrders.length}</p>
          <p className="text-xs text-[#52525B]">orders in progress</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <p className="text-xs text-[#A1A1AA]">Completed This Month</p>
          <p className="mt-2 flex items-center gap-1 text-3xl font-semibold text-white">
            {completedThisMonth}
            <ArrowUpRight className="h-5 w-5 text-[#22C55E]" />
          </p>
          <p className="text-xs text-[#52525B]">delivered</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <p className="text-xs text-[#A1A1AA]">Earnings This Month</p>
          <p className="mt-2 font-mono text-2xl font-bold text-[#818CF8]">
            {formatINR(profile.month_earned)}
          </p>
          <p className="text-xs text-[#52525B]">this month</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <p className="text-xs text-[#A1A1AA]">Rating</p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {profile.rating_score.toFixed(1)}{" "}
            <span className="text-base text-[#52525B]">/ 5.0</span>
          </p>
          <div className="mt-1">
            <StarRow score={profile.rating_score} />
          </div>
        </div>
      </div>

      {/* Quick lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active orders */}
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <h2 className="mb-3 text-sm font-semibold text-white">Active Orders</h2>
          <div className="space-y-1">
            {activeOrders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                onClick={() => onViewOrder(o.id)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#18181B]"
              >
                <span className="w-20 shrink-0 font-mono text-xs text-[#52525B]">{o.id}</span>
                <span className="flex-1 truncate text-sm text-white">{o.costume_name}</span>
                <span className={`hidden shrink-0 text-xs sm:block ${deadlineColor(o.days_left)}`}>
                  {o.days_left}d
                </span>
                <StatusPill status={o.status} />
                <span className="shrink-0 text-xs font-medium text-[#6366F1]">View</span>
              </button>
            ))}
            {activeOrders.length === 0 && (
              <p className="py-4 text-center text-sm text-[#52525B]">No active orders.</p>
            )}
          </div>
        </div>

        {/* Recent payouts */}
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <h2 className="mb-3 text-sm font-semibold text-white">Recent Payouts</h2>
          <div className="space-y-1">
            {payouts.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2"
              >
                <span className="w-20 shrink-0 text-xs text-[#52525B]">{p.date}</span>
                <span className="flex-1 font-mono text-xs text-[#A1A1AA]">{p.order_id}</span>
                <span className="shrink-0 font-mono text-sm text-white">{formatINR(p.amount)}</span>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${payoutStatusPill(p.status)}`}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={onGoToEarnings}
            className="mt-3 text-sm font-medium text-[#6366F1] hover:underline"
          >
            View all earnings →
          </button>
        </div>
      </div>
    </div>
  );
}
