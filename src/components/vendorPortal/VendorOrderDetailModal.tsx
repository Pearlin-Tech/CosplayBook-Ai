// ===== FILE: src/components/vendorPortal/VendorOrderDetailModal.tsx =====
import { useState } from "react";
import { X, Check } from "lucide-react";
import type { VendorOrder } from "@/mocks/vendorPortalData";
import { formatINR } from "@/mocks/vendorPortalData";
import { StatusPill, ComplexityBadge } from "./orderStatusUtils";

interface VendorOrderDetailModalProps {
  order: VendorOrder | null;
  onClose: () => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onAddNote: (id: string, text: string) => void;
  onMarkReady: (id: string) => void;
  onConfirmDispatch: (id: string, tracking: string) => void;
}

function Stepper({ status }: { status: VendorOrder["status"] }) {
  const steps = ["Assigned", "In Progress", "Dispatched"];
  let activeIndex = 0;
  if (status === "in_progress" || status === "ready") activeIndex = 1;
  if (status === "completed") activeIndex = 2;

  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const done = i < activeIndex || status === "completed";
        const isActive = i === activeIndex && status !== "completed";
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-[#22C55E] text-white"
                    : isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-700 text-zinc-400"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`text-[10px] ${
                  done || isActive ? "text-white" : "text-[#52525B]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  i < activeIndex ? "bg-[#22C55E]" : isActive ? "bg-indigo-600" : "bg-zinc-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function VendorOrderDetailModal({
  order,
  onClose,
  onAccept,
  onDecline,
  onAddNote,
  onMarkReady,
  onConfirmDispatch,
}: VendorOrderDetailModalProps) {
  const [note, setNote] = useState("");
  const [tracking, setTracking] = useState("");

  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111113] p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg border border-white/[0.12] p-1.5 text-[#A1A1AA] transition-colors hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <p className="font-mono text-xs text-[#52525B]">{order.id}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{order.costume_name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <ComplexityBadge tier={order.complexity} />
            <StatusPill status={order.status} />
          </div>
        </div>

        {/* Blueprint */}
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <h3 className="mb-2 text-sm font-semibold text-white">Blueprint Details</h3>
          <p className="text-sm leading-relaxed text-[#A1A1AA]">{order.blueprint_notes}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-[#52525B]">
            Required Materials
          </p>
          <ul className="mt-2 space-y-1">
            {order.required_materials.map((m) => (
              <li key={m} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer note */}
        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <h3 className="mb-2 text-sm font-semibold text-white">Customer Note</h3>
          <div className="rounded-lg bg-[#18181B] p-3">
            <p className="text-sm italic text-[#A1A1AA]">"{order.customer_note}"</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <h3 className="mb-4 text-sm font-semibold text-white">Timeline</h3>
          <Stepper status={order.status} />
        </div>

        {/* Progress notes */}
        <div className="mt-5 border-t border-white/[0.06] pt-5">
          <h3 className="mb-3 text-sm font-semibold text-white">Progress Notes</h3>
          {order.progress_notes.length === 0 ? (
            <p className="text-sm text-[#52525B]">No notes yet.</p>
          ) : (
            <div className="space-y-3">
              {[...order.progress_notes].reverse().map((n, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-900 text-[10px] font-semibold text-indigo-300">
                    AC
                  </div>
                  <div>
                    <p className="text-sm text-[#F4F4F5]">{n.text}</p>
                    <p className="text-xs text-[#52525B]">{n.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action footer */}
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          {order.status === "pending_acceptance" && (
            <div className="flex gap-2">
              <button
                onClick={() => onAccept(order.id)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Accept Order
              </button>
              <button
                onClick={() => onDecline(order.id)}
                className="rounded-lg border border-[#EF4444]/30 px-4 py-2 text-sm text-[#EF4444] transition-colors hover:bg-[#EF4444]/10"
              >
                Decline
              </button>
            </div>
          )}

          {order.status === "in_progress" && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a progress note..."
                  className="flex-1 rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white placeholder:text-[#52525B] focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (note.trim()) {
                      onAddNote(order.id, note.trim());
                      setNote("");
                    }
                  }}
                  className="rounded-lg border border-white/[0.12] px-4 py-2 text-sm text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white"
                >
                  Update
                </button>
              </div>
              <button
                onClick={() => onMarkReady(order.id)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
              >
                Mark as Ready for Dispatch
              </button>
            </div>
          )}

          {order.status === "ready" && (
            <div className="flex flex-wrap gap-2">
              <input
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
                placeholder="Dispatch tracking #"
                className="flex-1 rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white placeholder:text-[#52525B] focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => onConfirmDispatch(order.id, tracking)}
                className="rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#22C55E]/90"
              >
                Confirm Dispatched
              </button>
            </div>
          )}

          {order.status === "completed" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#52525B]">Completed {order.completed_date}</span>
              <span className="font-mono text-[#22C55E]">
                Payout: {formatINR(order.payout_amount)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
