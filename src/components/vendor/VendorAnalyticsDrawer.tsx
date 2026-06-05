import {
  X,
  Clock,
  Heart,
  Wallet,
  Star,
  ShieldCheck,
  Ban,
  BadgeCheck,
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, Cell } from "recharts";
import { formatCurrency, type Vendor } from "@/lib/vendorData";

interface VendorAnalyticsDrawerProps {
  vendor: Vendor | null;
  onClose: () => void;
}

export default function VendorAnalyticsDrawer({ vendor, onClose }: VendorAnalyticsDrawerProps) {
  const open = !!vendor;
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0B0B0E] p-6 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {vendor && (
          <>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[0.75rem] bg-gradient-to-br ${vendor.gradient} text-xs font-bold text-black/80`}
                >
                  {vendor.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{vendor.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-white/30">
                    <Star className="h-3 w-3 fill-[#DFFF00] text-[#DFFF00]" />
                    {vendor.rating.toFixed(1)} · {vendor.owner}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat icon={<Clock className="h-4 w-4" />} label="Turnaround" value={`${vendor.avgTurnaroundDays}d`} />
              <Stat icon={<Heart className="h-4 w-4" />} label="Satisfaction" value={`${vendor.satisfaction}%`} />
              <Stat
                icon={<Wallet className="h-4 w-4" />}
                label="Revenue"
                value={formatCurrency(vendor.revenueThisMonth)}
                small
              />
            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-[1rem] p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/30">
                Completions · Last 30 Days
              </p>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendor.trend30d}>
                    <XAxis dataKey="day" hide />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.05)" }}
                      contentStyle={{
                        background: "#08080A",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "0.5rem",
                        fontSize: "12px",
                        color: "#fff",
                      }}
                      labelFormatter={(l) => `Day ${l}`}
                    />
                    <Bar dataKey="completed" radius={[2, 2, 0, 0]}>
                      {vendor.trend30d.map((_, i) => (
                        <Cell key={i} fill="#DFFF00" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/30">
                Satisfaction Breakdown
              </p>
              <SatBar label="5 Stars" value={vendor.satisfaction} color="#DFFF00" />
              <SatBar label="4 Stars" value={Math.max(0, 100 - vendor.satisfaction - 4)} color="#06B6D4" />
              <SatBar label="≤ 3 Stars" value={4} color="#F59E0B" />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center gap-1 rounded-[0.5rem] bg-[#DFFF00] px-3 py-3 text-xs font-semibold text-black hover:opacity-90">
                <BadgeCheck className="h-4 w-4" /> Assign
              </button>
              <button className="flex flex-col items-center gap-1 rounded-[0.5rem] border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-3 py-3 text-xs font-semibold text-[#06B6D4] hover:bg-[#06B6D4]/20">
                <ShieldCheck className="h-4 w-4" /> Verify
              </button>
              <button className="flex flex-col items-center gap-1 rounded-[0.5rem] border border-red-500/30 bg-red-500/10 px-3 py-3 text-xs font-semibold text-red-400 hover:bg-red-500/20">
                <Ban className="h-4 w-4" /> Suspend
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Stat({
  icon,
  label,
  value,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-[0.75rem] border border-white/10 bg-white/5 p-3">
      <div className="text-[#06B6D4]">{icon}</div>
      <p className={`mt-2 font-semibold text-white ${small ? "text-xs" : "text-lg"}`}>{value}</p>
      <p className="text-[10px] text-white/30">{label}</p>
    </div>
  );
}

function SatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-2 flex items-center gap-3">
      <span className="w-16 shrink-0 text-xs text-white/60">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="w-9 shrink-0 text-right text-xs text-white/60">{value}%</span>
    </div>
  );
}
