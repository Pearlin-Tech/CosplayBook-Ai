import { useMemo, useState } from "react";
import { Filter, ArrowUpDown } from "lucide-react";
import VendorCard from "./VendorCard";
import { vendors as allVendors, ALL_SPECIALTIES, type Vendor, type Specialty } from "@/lib/vendorData";

type SortKey = "rating" | "capacity" | "name";

interface VendorRosterGridProps {
  onAssign?: (vendor: Vendor) => void;
  onViewProfile?: (vendor: Vendor) => void;
}

export default function VendorRosterGrid({ onAssign, onViewProfile }: VendorRosterGridProps) {
  const [filter, setFilter] = useState<Specialty | "all">("all");
  const [sort, setSort] = useState<SortKey>("rating");

  const list = useMemo(() => {
    let v = [...allVendors];
    if (filter !== "all") v = v.filter((x) => x.specialties.includes(filter));
    v.sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "capacity") return a.capacityPercent - b.capacityPercent;
      return a.name.localeCompare(b.name);
    });
    return v;
  }, [filter, sort]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
          Workshop Roster
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-[0.5rem] border border-white/10 bg-white/5 px-3 py-1.5">
            <Filter className="h-3.5 w-3.5 text-white/30" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as Specialty | "all")}
              className="bg-transparent text-xs text-white/80 outline-none [&>option]:bg-[#08080A]"
            >
              <option value="all">All Specialties</option>
              {ALL_SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-[0.5rem] border border-white/10 bg-white/5 px-3 py-1.5">
            <ArrowUpDown className="h-3.5 w-3.5 text-white/30" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent text-xs text-white/80 outline-none [&>option]:bg-[#08080A]"
            >
              <option value="rating">Sort: Rating</option>
              <option value="capacity">Sort: Free Capacity</option>
              <option value="name">Sort: Name</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid max-h-[640px] grid-cols-1 gap-4 overflow-y-auto pr-1 md:grid-cols-2 xl:grid-cols-3">
        {list.map((v) => (
          <VendorCard key={v.id} vendor={v} onAssign={onAssign} onViewProfile={onViewProfile} />
        ))}
        {list.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-white/30">
            No workshops match this specialty.
          </p>
        )}
      </div>
    </div>
  );
}
