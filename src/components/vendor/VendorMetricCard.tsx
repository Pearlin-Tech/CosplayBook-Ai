import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";

interface VendorMetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: { direction: "up" | "down"; value: string };
  arcPercent?: number; // 0-100 -> renders a thin radial arc
  warning?: boolean;
}

export default function VendorMetricCard({
  label,
  value,
  subtitle,
  icon,
  trend,
  arcPercent,
  warning,
}: VendorMetricCardProps) {
  return (
    <div className="relative bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md overflow-hidden transition-colors hover:border-white/20">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-white/30">{label}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-4xl font-semibold text-white leading-none">{value}</span>
            {trend && (
              <span
                className={`flex items-center gap-0.5 text-xs font-medium pb-1 ${
                  trend.direction === "up" ? "text-[#DFFF00]" : "text-red-400"
                }`}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p
              className={`mt-2 text-xs flex items-center gap-1 ${
                warning ? "text-amber-400" : "text-white/60"
              }`}
            >
              {warning && <AlertTriangle className="h-3.5 w-3.5" />}
              {subtitle}
            </p>
          )}
        </div>

        {typeof arcPercent === "number" ? (
          <Arc percent={arcPercent} />
        ) : (
          icon && (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-white/5 border border-white/10 text-[#DFFF00]">
              {icon}
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Arc({ percent }: { percent: number }) {
  const radius = 24;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#DFFF00"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-white">
        {percent}%
      </span>
    </div>
  );
}
