import { Activity } from "lucide-react";
import { activityFeed, type ActivityKind } from "@/lib/vendorData";

const dotColor: Record<ActivityKind, string> = {
  completed: "bg-[#DFFF00]",
  "in-progress": "bg-amber-400",
  overdue: "bg-red-500",
  joined: "bg-[#06B6D4]",
};

export default function ActivityFeed() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-[#06B6D4]" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
          Live Activity
        </h3>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] text-white/30">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#DFFF00]" /> LIVE
        </span>
      </div>
      <ul className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {activityFeed.map((entry) => (
          <li key={entry.id} className="flex items-start gap-3">
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor[entry.kind]}`} />
            <div className="min-w-0">
              <p className="text-sm leading-snug text-white/80">{entry.message}</p>
              <p className="text-[11px] text-white/30">{entry.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
