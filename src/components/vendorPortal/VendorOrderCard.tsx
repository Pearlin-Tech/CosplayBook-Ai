// ===== FILE: src/components/vendorPortal/VendorOrderCard.tsx =====
import { useState } from "react";
import { Calendar } from "lucide-react";
import type { VendorOrder } from "@/mocks/vendorPortalData";
import { formatINR } from "@/mocks/vendorPortalData";
import { StatusPill, ComplexityBadge, deadlineColor } from "./orderStatusUtils";

interface VendorOrderCardProps {
  order: VendorOrder;
  onOpen: (id: string) => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onAddNote: (id: string, text: string) => void;
  onMarkReady: (id: string) => void;
  onConfirmDispatch: (id: string, tracking: string) => void;
}

export default function VendorOrderCard({
  order,
  onOpen,
  onAccept,
  onDecline,
  onAddNote,
  onMarkReady,
  onConfirmDispatch,
}: VendorOrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState("");
  const [tracking, setTracking] = useState(order.dispatch_tracking ?? "");
  const isCompleted = order.status === "completed";

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={() => onOpen(order.id)}
      className={`mb-3 cursor-pointer rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-white/[0.14] ${
        isCompleted ? "opacity-70" : ""
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-xs text-[#52525B]">{order.id}</span>
        <span className="text-sm font-semibold text-white">{order.costume_name}</span>
        <ComplexityBadge tier={order.complexity} />
        <div className="ml-auto">
          <StatusPill status={order.status} />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {order.skills.map((s) => (
          <span
            key={s}
            className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Deadline */}
      <div className="mt-3 flex items-center gap-2 text-sm">
        <Calendar className="h-4 w-4 text-[#52525B]" />
        <span className="text-[#A1A1AA]">{order.deadline}</span>
        {!isCompleted && (
          <span className={deadlineColor(order.days_left)}>· {order.days_left} days left</span>
        )}
      </div>

      {/* Blueprint notes */}
      <p
        className={`mt-3 text-sm text-[#A1A1AA] ${expanded ? "" : "line-clamp-2"}`}
      >
        {order.blueprint_notes}
      </p>
      {order.blueprint_notes.length > 90 && (
        <button
          onClick={(e) => {
            stop(e);
            setExpanded((v) => !v);
          }}
          className="mt-1 text-xs font-medium text-[#6366F1] hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      {/* Actions */}
      <div className="mt-4" onClick={stop}>
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
  );
}
