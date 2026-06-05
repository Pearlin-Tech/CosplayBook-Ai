// ===== FILE: src/components/vendorPortal/VendorOrders.tsx =====
import { useState } from "react";
import type { VendorOrder } from "@/mocks/vendorPortalData";
import VendorOrderCard from "./VendorOrderCard";

interface VendorOrdersProps {
  orders: VendorOrder[];
  onOpen: (id: string) => void;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  onAddNote: (id: string, text: string) => void;
  onMarkReady: (id: string) => void;
  onConfirmDispatch: (id: string, tracking: string) => void;
}

export default function VendorOrders(props: VendorOrdersProps) {
  const [tab, setTab] = useState<"active" | "completed">("active");

  const active = props.orders.filter((o) => o.status !== "completed");
  const completed = props.orders.filter((o) => o.status === "completed");
  const list = tab === "active" ? active : completed;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white">My Orders</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("active")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "active"
              ? "bg-indigo-600 text-white"
              : "border border-white/[0.12] text-[#A1A1AA] hover:text-white"
          }`}
        >
          Active ({active.length})
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "completed"
              ? "bg-indigo-600 text-white"
              : "border border-white/[0.12] text-[#A1A1AA] hover:text-white"
          }`}
        >
          Completed ({completed.length})
        </button>
      </div>

      <div>
        {list.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-10 text-center text-sm text-[#52525B]">
            No {tab} orders.
          </div>
        ) : (
          list.map((o) => (
            <VendorOrderCard
              key={o.id}
              order={o}
              onOpen={props.onOpen}
              onAccept={props.onAccept}
              onDecline={props.onDecline}
              onAddNote={props.onAddNote}
              onMarkReady={props.onMarkReady}
              onConfirmDispatch={props.onConfirmDispatch}
            />
          ))
        )}
      </div>
    </div>
  );
}
