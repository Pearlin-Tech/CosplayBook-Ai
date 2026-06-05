// ===== FILE: src/components/vendorPortal/orderStatusUtils.tsx =====
import type { Complexity, OrderStatus } from "@/mocks/vendorPortalData";

export const statusMeta: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending_acceptance: {
    label: "PENDING ACCEPTANCE",
    className: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20",
  },
  in_progress: {
    label: "IN PROGRESS",
    className: "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20",
  },
  ready: {
    label: "READY FOR DISPATCH",
    className: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20",
  },
  completed: {
    label: "COMPLETED",
    className: "bg-zinc-700/30 text-zinc-400 border border-white/10",
  },
};

export const complexityMeta: Record<
  Complexity,
  { className: string }
> = {
  S: { className: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20" },
  M: { className: "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20" },
  L: { className: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20" },
  XL: { className: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" },
};

export function StatusPill({ status }: { status: OrderStatus }) {
  const m = statusMeta[status];
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider ${m.className}`}
    >
      {m.label}
    </span>
  );
}

export function ComplexityBadge({ tier }: { tier: Complexity }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${complexityMeta[tier].className}`}
    >
      {tier}
    </span>
  );
}

export function deadlineColor(daysLeft: number): string {
  if (daysLeft < 2) return "text-[#EF4444]";
  if (daysLeft < 7) return "text-[#F59E0B]";
  return "text-[#A1A1AA]";
}

export function payoutStatusPill(
  status: "paid" | "pending" | "processing",
): string {
  switch (status) {
    case "paid":
      return "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20";
    case "processing":
      return "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20";
    case "pending":
      return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20";
  }
}
