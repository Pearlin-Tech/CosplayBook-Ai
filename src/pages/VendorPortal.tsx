import { useMemo, useState } from "react";
import { toast, Toaster } from "sonner";
import VendorSidebar, { type VendorTab } from "../components/vendorPortal/VendorSidebar";
import VendorHome from "../components/vendorPortal/VendorHome";
import VendorOrders from "../components/vendorPortal/VendorOrders";
import VendorEarnings from "../components/vendorPortal/VendorEarnings";
import VendorWorkshopProfile from "../components/vendorPortal/VendorWorkshopProfile";
import VendorOrderDetailModal from "../components/vendorPortal/VendorOrderDetailModal";
import {
  vendorProfile as initialProfile,
  vendorOrders as initialOrders,
  payoutHistory,
  monthlyEarnings,
  type VendorOrder,
  type VendorProfile,
} from "../mocks/vendorPortalData";

export default function VendorPortal() {
  const [tab, setTab] = useState<VendorTab>("home");
  const [orders, setOrders] = useState<VendorOrder[]>(initialOrders);
  const [profile, setProfile] = useState<VendorProfile>(initialProfile);
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  const activeOrderCount = orders.filter((o) => o.status !== "completed").length;
  const completedThisMonth = orders.filter((o) => o.status === "completed").length;

  const openOrder = useMemo(
    () => orders.find((o) => o.id === openOrderId) ?? null,
    [orders, openOrderId],
  );

  const acceptOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "in_progress" } : o)),
    );
    toast.success("Order accepted!");
  };

  const declineOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setOpenOrderId((cur) => (cur === id ? null : cur));
    toast("Order declined", { description: "Removed from your queue." });
  };

  const addNote = (id: string, text: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, progress_notes: [...o.progress_notes, { text, timestamp: "Just now" }] }
          : o,
      ),
    );
    toast.success("Progress note added");
  };

  const markReady = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "ready" } : o)),
    );
    toast.success("Marked as ready for dispatch");
  };

  const confirmDispatch = (id: string, tracking: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status: "completed",
              dispatch_tracking: tracking,
              completed_date: "1 Jun 2026",
            }
          : o,
      ),
    );
    toast.success("Order dispatched & completed");
  };

  const saveProfile = (updated: VendorProfile) => {
    setProfile(updated);
    toast.success("Profile saved");
  };

  const requestVerification = () => {
    toast.success("Verification request submitted", {
      description: "We'll review your workshop within 1–2 business days.",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0B] font-sans text-[#F4F4F5]">
      <VendorSidebar
        active={tab}
        onChange={setTab}
        profile={profile}
        activeOrderCount={activeOrderCount}
      />

      <main className="flex-1 overflow-y-auto p-8">
        {tab === "home" && (
          <VendorHome
            profile={profile}
            orders={orders}
            payouts={payoutHistory}
            completedThisMonth={completedThisMonth}
            onViewOrder={setOpenOrderId}
            onGoToProfile={() => setTab("profile")}
            onGoToEarnings={() => setTab("earnings")}
          />
        )}

        {tab === "orders" && (
          <VendorOrders
            orders={orders}
            onOpen={setOpenOrderId}
            onAccept={acceptOrder}
            onDecline={declineOrder}
            onAddNote={addNote}
            onMarkReady={markReady}
            onConfirmDispatch={confirmDispatch}
          />
        )}

        {tab === "earnings" && (
          <VendorEarnings profile={profile} payouts={payoutHistory} monthly={monthlyEarnings} />
        )}

        {tab === "profile" && (
          <VendorWorkshopProfile
            profile={profile}
            onSave={saveProfile}
            onRequestVerification={requestVerification}
          />
        )}
      </main>

      <VendorOrderDetailModal
        order={openOrder}
        onClose={() => setOpenOrderId(null)}
        onAccept={acceptOrder}
        onDecline={declineOrder}
        onAddNote={addNote}
        onMarkReady={markReady}
        onConfirmDispatch={confirmDispatch}
      />

      <Toaster theme="dark" />
    </div>
  );
}

export { VendorPortal };
