// ===== FILE: src/components/vendorPortal/VendorEarnings.tsx =====
import { Download, Info } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VendorProfile, PayoutRecord, MonthlyEarning } from "@/mocks/vendorPortalData";
import { formatINR } from "@/mocks/vendorPortalData";
import { payoutStatusPill } from "./orderStatusUtils";

interface VendorEarningsProps {
  profile: VendorProfile;
  payouts: PayoutRecord[];
  monthly: MonthlyEarning[];
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-xs shadow-lg">
      <p className="text-[#A1A1AA]">{label}</p>
      <p className="font-mono font-semibold text-white">{formatINR(payload[0].value)}</p>
    </div>
  );
}

export default function VendorEarnings({ profile, payouts, monthly }: VendorEarningsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-white">Earnings</h1>
        <p className="text-sm text-[#52525B]">Your financial overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <p className="text-xs text-[#A1A1AA]">Total Earned</p>
          <p className="mt-2 font-mono text-2xl font-bold text-[#818CF8]">
            {formatINR(profile.total_earned)}
          </p>
          <p className="text-xs text-[#52525B]">all time</p>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <p className="text-xs text-[#A1A1AA]">This Month</p>
          <p className="mt-2 font-mono text-2xl font-bold text-white">
            {formatINR(profile.month_earned)}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
          <p className="flex items-center gap-1 text-xs text-[#A1A1AA]">
            Pending Payout
            <span className="group relative">
              <Info className="h-3 w-3 cursor-help text-[#52525B]" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#18181B] px-2 py-1 text-[10px] text-[#A1A1AA] group-hover:block">
                Awaiting admin release
              </span>
            </span>
          </p>
          <p className="mt-2 font-mono text-2xl font-bold text-[#F59E0B]">
            {formatINR(profile.pending_payout)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-white/[0.08] bg-[#111113] p-5">
        <h2 className="mb-4 text-sm font-semibold text-white">Last 6 Months</h2>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#52525B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#52525B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} content={<ChartTooltip />} />
              <Bar dataKey="amount" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout history */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Payout History</h2>
          <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113]">
          <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] bg-[#18181B] px-4 py-3 text-xs uppercase tracking-wider text-[#52525B]">
            <span>Date</span>
            <span>Order ID</span>
            <span>Costume</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Status</span>
          </div>
          {payouts.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border-t border-white/[0.05] px-4 py-3 text-sm transition-colors hover:bg-[#18181B]"
            >
              <span className="text-[#A1A1AA]">{p.date}</span>
              <span className="font-mono text-xs text-[#A1A1AA]">{p.order_id}</span>
              <span className="truncate text-white">{p.costume_name}</span>
              <span className="text-right font-mono text-white">{formatINR(p.amount)}</span>
              <span className="text-right">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${payoutStatusPill(p.status)}`}
                >
                  {p.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
