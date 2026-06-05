import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Gauge, Package, ArrowRightLeft, ChevronDown,
  RefreshCw, Truck, User, CheckCircle2, Clock, AlertTriangle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ─── Static factory data (will be DB-driven when vendor table is ready) ── */
interface Factory {
  id: string; name: string; city: string; region: string;
  isActive: boolean; capacityPct: number; inventory: { material: string; status: string }[];
}

const FACTORIES: Factory[] = [
  { id:'F1', name:'Delhi Digital Hub',       city:'New Delhi',  region:'North', isActive:true,  capacityPct:72,
    inventory:[{ material:'Oversized Cotton Black', status:'IN_STOCK' },{ material:'Heavyweight Fleece 320 GSM', status:'LOW_STOCK' },{ material:'Premium Poly-Blend White', status:'IN_STOCK' }] },
  { id:'F2', name:'Tirupur Knitwear Node',   city:'Tirupur',    region:'South', isActive:true,  capacityPct:58,
    inventory:[{ material:'Oversized Cotton Black', status:'IN_STOCK' },{ material:'Terry-Cotton Grey', status:'IN_STOCK' },{ material:'Lightweight Jersey 180 GSM', status:'OUT_OF_STOCK' }] },
  { id:'F3', name:'Mumbai Edge Print',       city:'Mumbai',     region:'West',  isActive:true,  capacityPct:89,
    inventory:[{ material:'Heavyweight Fleece 320 GSM', status:'IN_STOCK' },{ material:'Oversized Cotton Black', status:'LOW_STOCK' },{ material:'Slim-Fit Cotton Navy', status:'IN_STOCK' }] },
  { id:'F4', name:'Bangalore Precision Press',city:'Bangalore', region:'South', isActive:true,  capacityPct:34,
    inventory:[{ material:'Premium Poly-Blend White', status:'IN_STOCK' },{ material:'Oversized Cotton Black', status:'LOW_STOCK' },{ material:'Slim-Fit Cotton Navy', status:'IN_STOCK' }] },
  { id:'F5', name:'Jaipur Textile Forge',    city:'Jaipur',     region:'North', isActive:true,  capacityPct:45,
    inventory:[{ material:'Heavyweight Fleece 320 GSM', status:'OUT_OF_STOCK' },{ material:'Oversized Cotton Black', status:'IN_STOCK' },{ material:'Lightweight Jersey 180 GSM', status:'LOW_STOCK' }] },
  { id:'F6', name:'Chennai Silks Unit',      city:'Chennai',    region:'South', isActive:false, capacityPct:0,
    inventory:[{ material:'Oversized Cotton Black', status:'OUT_OF_STOCK' },{ material:'Heavyweight Fleece 320 GSM', status:'OUT_OF_STOCK' }] },
];

const STOCK_STYLES: Record<string, { bg:string; border:string; text:string; dot:string }> = {
  IN_STOCK:     { bg:'bg-emerald-500/[0.06]', border:'border-emerald-500/20', text:'text-emerald-400', dot:'bg-emerald-400' },
  LOW_STOCK:    { bg:'bg-yellow-500/[0.06]',  border:'border-yellow-500/20',  text:'text-yellow-400',  dot:'bg-yellow-400' },
  OUT_OF_STOCK: { bg:'bg-red-500/[0.06]',     border:'border-red-500/20',     text:'text-red-400',     dot:'bg-red-400' },
};

/* ─── Route type — pulled from real orders ─── */
interface RouteRow {
  id: string;
  orderId: string;
  productName: string;
  customerName: string;
  factoryId: string;
  isOverride: boolean;
  status: string;
}

/* ─── Sub-components ─── */
function CapacityBar({ pct }: { pct: number }) {
  const color = pct >= 80 ? 'bg-red-400' : pct >= 60 ? 'bg-yellow-400' : 'bg-[#DFFF00]';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div className={`h-full rounded-full ${color}`} initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:0.8, ease:'easeOut' }} />
      </div>
      <span className="font-mono text-[11px] text-white/40 w-8 text-right">{pct}%</span>
    </div>
  );
}

function StockPill({ material, status }: { material: string; status: string }) {
  const s = STOCK_STYLES[status] ?? STOCK_STYLES.OUT_OF_STOCK;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] tracking-wider uppercase font-medium border ${s.bg} ${s.border} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      <span className="truncate max-w-[120px]">{material}</span>
    </span>
  );
}

function RouteDropdown({ currentFactoryId, onSelect }: { currentFactoryId: string; onSelect: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const current = FACTORIES.find(f => f.id === currentFactoryId);
  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-[10px] tracking-wider text-white/50 hover:text-white/70 hover:border-white/[0.12] transition-colors">
        <ArrowRightLeft className="w-3 h-3" />
        <span className="truncate max-w-[100px] hidden sm:block">{current?.name ?? '---'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-4 }}
            className="absolute top-full mt-1 right-0 w-52 rounded-lg border border-white/[0.08] bg-[#08080A]/98 backdrop-blur-xl z-50 shadow-xl overflow-hidden">
            {FACTORIES.filter(f => f.isActive).map(f => (
              <button key={f.id} onClick={() => { onSelect(f.id); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] tracking-wider hover:bg-white/[0.04] transition-colors ${f.id === currentFactoryId ? 'text-[#DFFF00]/70' : 'text-white/50'}`}>
                <MapPin className="w-3 h-3 flex-shrink-0 opacity-50" />
                <span className="truncate">{f.name}</span>
                {f.id === currentFactoryId && <span className="ml-auto text-[9px] text-[#DFFF00]/40 uppercase flex-shrink-0">Active</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main ─── */
export default function VendorFleet() {
  const [routes,     setRoutes]     = useState<RouteRow[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRoutes = async () => {
    setRefreshing(true);
    try {
      const { data: orders, error } = await supabase
        .from('apparel_orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (!orders) { setRoutes([]); return; }

      const uids = [...new Set(orders.map(o => o.user_id))];
      const { data: profs } = await supabase.from('profiles').select('id,full_name').in('id', uids);
      const pm: Record<string, string> = {};
      profs?.forEach(p => { pm[p.id] = p.full_name || 'Unknown'; });

      // Auto-assign factory round-robin based on order index
      setRoutes(orders.map((o, i) => ({
        id:           o.id,
        orderId:      o.id.slice(0,8).toUpperCase(),
        productName:  o.product_name || 'Custom Order',
        customerName: pm[o.user_id] || 'Unknown',
        factoryId:    FACTORIES[i % 5].id, // round robin active factories
        isOverride:   false,
        status:       o.status,
      })));
    } catch (e: any) { console.error(e.message); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  const handleReroute = async (routeId: string, newFactoryId: string) => {
    setRoutes(p => p.map(r => r.id === routeId ? { ...r, factoryId: newFactoryId, isOverride: true } : r));
  };

  const handleDispatch = async (routeId: string) => {
    try {
      await supabase.from('apparel_orders').update({ status: 'shipped' }).eq('id', routeId);
      setRoutes(p => p.map(r => r.id === routeId ? { ...r, status: 'shipped' } : r));
    } catch (e: any) { alert(e.message); }
  };

  const activeFactories  = FACTORIES.filter(f => f.isActive);
  const offlineFactories = FACTORIES.filter(f => !f.isActive);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" />
        <p className="text-white/25 text-xs tracking-widest uppercase font-mono">Loading Fleet...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">Vendor Fleet Dispatch</h2>
          </div>
          <p className="text-[12px] text-white/35 ml-5">
            Order routing engine — <span className="text-[#DFFF00]/60">{activeFactories.length} active</span> · {FACTORIES.length} print houses
          </p>
        </div>
        <button onClick={fetchRoutes} disabled={refreshing}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] tracking-wider transition-colors ${refreshing ? 'opacity-50' : ''}`}>
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:block">Refresh</span>
        </button>
      </div>

      {/* Fleet stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Active Houses',    value: activeFactories.length,                               color:'text-[#DFFF00]' },
          { label:'Orders Routing',   value: routes.length,                                        color:'text-white' },
          { label:'Dispatched',       value: routes.filter(r=>r.status==='shipped'||r.status==='delivered').length, color:'text-emerald-400' },
          { label:'Manual Overrides', value: routes.filter(r=>r.isOverride).length,                color:'text-orange-400' },
        ].map((s,i) => (
          <div key={i} className="px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <p className="text-[9px] tracking-wider text-white/25 uppercase">{s.label}</p>
            <p className={`font-mono text-xl mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Print Houses grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-3.5 h-3.5 text-[#DFFF00]/50" />
          <h3 className="text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase">Connected Print Houses</h3>
          <span className="ml-auto text-[10px] text-white/20">{activeFactories.length} online · {offlineFactories.length} offline</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACTORIES.map(factory => (
            <motion.div key={factory.id} layout
              className={`rounded-xl border transition-colors duration-200 ${
                factory.isActive ? 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12]' : 'border-white/[0.04] bg-white/[0.01] opacity-40'
              }`}>
              <div className="px-4 sm:px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${factory.isActive ? 'bg-[#DFFF00] animate-pulse' : 'bg-white/15'}`} />
                    <h4 className="text-[11px] font-semibold tracking-[0.1em] text-white/85 uppercase truncate">{factory.name}</h4>
                  </div>
                  <span className="text-[9px] text-white/20 uppercase flex items-center gap-1 flex-shrink-0 ml-2">
                    <MapPin className="w-2.5 h-2.5" />{factory.city}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="w-3 h-3 text-white/20 flex-shrink-0" />
                  <CapacityBar pct={factory.capacityPct} />
                </div>
              </div>
              <div className="px-4 sm:px-5 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Package className="w-3 h-3 text-white/20" />
                  <span className="text-[9px] tracking-wider text-white/20 uppercase">Inventory</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {factory.inventory.map((inv, idx) => (
                    <StockPill key={idx} material={inv.material} status={inv.status} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Routing Table */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]/50" />
          <h3 className="text-[12px] font-semibold tracking-[0.12em] text-white/70 uppercase">
            Live Order Routing ({routes.length})
          </h3>
        </div>

        {routes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-white/20 border border-white/[0.06] rounded-xl">
            <Truck className="w-10 h-10 text-[#DFFF00]/10 mb-3" />
            <p className="text-[11px] tracking-wider uppercase">No orders to route yet</p>
            <p className="text-[10px] text-white/15 mt-1">Orders appear here once customers place them</p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.08] overflow-hidden">
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                    {['Order','Customer','Product','Destination','Status','Override','Action'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[9px] tracking-[0.13em] text-white/25 uppercase font-medium whitespace-nowrap first:pl-5 last:pr-5 last:text-right">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route, idx) => {
                    const dest = FACTORIES.find(f => f.id === route.factoryId);
                    const statusColor =
                      route.status === 'shipped' || route.status === 'delivered' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
                      route.status === 'approved' || route.status === 'processing' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' :
                      'text-white/40 bg-white/5 border-white/10';

                    return (
                      <tr key={route.id}
                        className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${idx === routes.length-1 ? 'border-b-0' : ''}`}>
                        <td className="pl-5 pr-4 py-3.5">
                          <span className="font-mono text-[12px] text-[#DFFF00]/70">{route.orderId}</span>
                          {route.isOverride && (
                            <span className="ml-1.5 text-[8px] text-orange-400/50 uppercase px-1.5 py-0.5 rounded border border-orange-400/15 bg-orange-400/[0.05]">Override</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3 text-white/20 flex-shrink-0" />
                            <span className="text-[11px] text-white/40 truncate max-w-[100px]">{route.customerName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[11px] text-white/50 truncate max-w-[120px] block">{route.productName}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-[11px] text-white/40">{dest?.name ?? '---'}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-[9px] font-semibold px-2 py-1 rounded border uppercase whitespace-nowrap ${statusColor}`}>
                            {route.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-[10px] text-white/25">
                          {route.isOverride ? 'Manual' : 'Auto'}
                        </td>
                        <td className="pl-4 pr-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <RouteDropdown
                              currentFactoryId={route.factoryId}
                              onSelect={newId => handleReroute(route.id, newId)}
                            />
                            {route.status === 'approved' && (
                              <button onClick={() => handleDispatch(route.id)}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-purple-400/20 bg-purple-400/[0.06] text-[10px] text-purple-400 uppercase tracking-wider hover:bg-purple-400/[0.12] transition-colors whitespace-nowrap">
                                <Truck className="w-3 h-3" />
                                <span className="hidden sm:block">Dispatch</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
