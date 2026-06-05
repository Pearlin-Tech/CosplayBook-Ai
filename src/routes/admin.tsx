import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminDashboard } from "../pages/AdminDashboard";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw redirect({ to: "/login" });

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .maybeSingle();

    const role = String(profile?.role ?? "").toUpperCase();
    if (role !== "ADMIN") throw redirect({ to: "/login" });
  },
  component: AdminDashboard,
});
