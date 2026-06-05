import { useMemo, useState } from "react";
import { CalendarClock, Layers, X, CheckCircle2, ShieldCheck, Clock3 } from "lucide-react";
import {
  pendingOrders,
  vendors,
  compatibilityScore,
  type PendingOrder,
  type Vendor,
  type ComplexityTier,
} from "@/lib/vendorData";

const tierColor: Record<ComplexityTier, string> = {
  S: "bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30",
  M: "bg-[#DFFF00]/15 text-[#DFFF00] border-[#DFFF00]/30",
  L: "bg-amber-400/15 text-amber-400 border-amber-400/30",
  XL: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function AssignmentMatrix() {
  const [selectedId, setSelectedId] = useState<string>(pendingOrders[0].id);
  const [confirm, setConfirm] = useState<{ order: PendingOrder; vendor: Vendor } | null>(null);
  const [assigned, setAssigned] = useState<string | null>(null);

  const selected = pendingOrders.find((o) => o.id === selectedId)!;

  const ranked = useMemo(() => {
    return vendors
      .map((v) => ({ vendor: v, score: compatibilityScore(selected, v) }))
      .sort((a, b) => b.score - a.score);
  }, [selected]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      {/* LEFT — Pending Orders */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md lg:col-span-2">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
          Pending Orders
        </h2>
        <div className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
          {pendingOrders.map((order) => {
            const active = order.id === selectedId;
            return (
              <button
                key={order.id}
                onClick={() => setSelectedId(order.id)}
                className={`w-full rounded-[1rem] border p-4 text-left transition-colors ${
                  active
                    ? "border-[#DFFF00]/40 bg-[#DFFF00]/5"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-white">{order.id}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${tierColor[order.tier]}`}>
                    {order.tier}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-white/90">{order.costume}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-white/30">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Due {order.deadline} · {order.daysLeft}d left
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {order.requirements.map((r) => (
                    <span
                      key={r}
                      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60"
                    >
                      <Layers className="h-2.5 w-2.5" /> {r}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT — Matched Vendors */}
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
            Matched Vendors
          </h2>
          <span className="font-mono text-xs text-white/30">for {selected.id}</span>
        </div>
        <div className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
          {ranked.map(({ vendor, score }, idx) => {
            const top = idx < 3;
            return (
              <div
                key={vendor.id}
                className={`flex items-center gap-4 rounded-[1rem] border p-4 ${
                  top ? "border-[#DFFF00]/30 bg-[#DFFF00]/[0.04]" : "border-white/10 bg-white/5"
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.75rem] bg-gradient-to-br ${vendor.gradient} text-xs font-bold text-black/80`}
                >
                  {vendor.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-white">{vendor.name}</span>
                    {vendor.verification === "verified" ? (
                      <ShieldCheck className="h-3.5 w-3.5 text-[#06B6D4]" />
                    ) : (
                      <Clock3 className="h-3.5 w-3.5 text-amber-400" />
                    )}
                  </div>
                  <p className="truncate text-xs text-white/30">
                    {vendor.specialties.join(" · ")}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      score >= 60 ? "bg-[#DFFF00] text-black" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {score}% match
                  </span>
                </div>
                <button
                  onClick={() => setConfirm({ order: selected, vendor })}
                  className="rounded-[0.5rem] border border-white/10 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/10"
                >
                  Assign
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-white">Confirm Assignment</h3>
              <button onClick={() => setConfirm(null)} className="text-white/30 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            {assigned ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#DFFF00]" />
                <p className="mt-3 text-sm text-white/80">{assigned}</p>
              </div>
            ) : (
              <>
                <p className="mt-3 text-sm text-white/60">
                  Assign order{" "}
                  <span className="font-mono text-white">{confirm.order.id}</span> (
                  {confirm.order.costume}) to{" "}
                  <span className="font-semibold text-white">{confirm.vendor.name}</span>?
                </p>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setAssigned(`${confirm.vendor.name} assigned to ${confirm.order.id}.`);
                      setTimeout(() => {
                        setConfirm(null);
                        setAssigned(null);
                      }, 1400);
                    }}
                    className="flex-1 rounded-[0.5rem] bg-[#DFFF00] px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirm(null)}
                    className="rounded-[0.5rem] border border-white/10 px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
