import { motion } from 'framer-motion';
import { Shield, FileSearch, Banknote, Truck } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'intake' as const, label: 'THE INTAKE PIPELINE', icon: FileSearch },
  { id: 'payout' as const, label: 'SPLIT PAYOUT MATRIX', icon: Banknote },
  { id: 'fleet' as const, label: 'VENDOR FLEET DISPATCH', icon: Truck },
];

export type TabId = (typeof NAV_ITEMS)[number]['id'];

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#08080A] border-r border-white/[0.08] flex flex-col z-50">
      <div className="px-6 py-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#DFFF00] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#08080A]" />
          </div>
          <div>
            <h1 className="text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase">HYPERVAULT</h1>
            <p className="text-[9px] tracking-[0.15em] text-[#DFFF00] uppercase mt-0.5">Command Desk</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                isActive
                  ? 'text-[#DFFF00]'
                  : 'text-white/50 hover:text-white/70 hover:bg-white/[0.03]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-[#DFFF00]/[0.08] border border-[#DFFF00]/[0.15]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon className="relative w-4 h-4 flex-shrink-0" />
              <span className="relative text-[11px] font-medium tracking-[0.12em]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse" />
          <span className="text-[10px] tracking-[0.1em] text-white/40 uppercase">System Online</span>
        </div>
      </div>
    </aside>
  );
}
