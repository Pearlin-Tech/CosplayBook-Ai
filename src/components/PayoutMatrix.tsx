import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Vault, CheckCircle2, RefreshCw, TrendingUp, Download } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PayoutRow {
  id: string;
  product_name: string;
  price: number;
  status: string;
  created_at: string;
  customerName: string;
  customerEmail: string;
  // local UI
  marginPct: number;
  marginLocked: boolean;
  cleared: boolean;
}

const fmt = (v: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(v);

export default function PayoutMatrix() {
  const [orders,     setOrders]     = useState<PayoutRow[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter,     setFilter]     = useState<'all'|'pending'|'cleared'>('all');

  const fetch = async () => {
    setRefreshing(true);
    try {
      const { data: raw, error } = await supabase
        .from('apparel_orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (!raw) { setOrders([]); return; }

      const uids = [...new Set(raw.map(o => o.user_id))];
      const { data: profs } = await supabase
        .from('profiles').select('id,full_name,email').in('id', uids);
      const pm: Record<string, { name: string; email: string }> = {};
      profs?.forEach(p => { pm[p.id] = { name: p.full_name || 'Unknown', email: p.email || '' }; });

      setOrders(raw.map(o => ({
        id:            o.id,
        product_name:  o.product_name || 'Custom Order',
        price:         Number(o.price) || 0,
        status:        o.status,
        created_at:    o.created_at,
        customerName:  pm[o.user_id]?.name  || 'Unknown',
        customerEmail: pm[o.user_id]?.email || '',
        marginPct:     25,
        marginLocked:  false,
        cleared:       ['approved','delivered'].includes(o.status),
      })));
    } catch (e: any) { console.error(e.message); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetch(); }, []);

  const updateMargin = (id: string, v: number) =>
    setOrders(p => p.map(o => o.id === id ? { ...o, marginPct: v } : o));
  const toggleLock = (id: string) =>
    setOrders(p => p.map(o => o.id === id ? { ...o, marginLocked: !o.marginLocked } : o));
  const markCleared = async (id: string) => {
    try {
      await supabase.from('apparel_orders').update({ status: 'approved' }).eq('id', id);
      setOrders(p => p.map(o => o.id === id ? { ...o, cleared: true, status: 'approved' } : o));
    } catch (e: any) { alert(e.message); }
  };

  const filtered     = filter === 'all' ? orders : filter === 'cleared' ? orders.filter(o => o.cleared) : orders.filter(o => !o.cleared);
  const pendingCount = orders.filter(o => !o.cleared).length;
  const clearedCount = orders.filter(o =>  o.cleared).length;
  const totalVault   = orders.reduce((s, o) => s + o.price * (o.marginPct / 100), 0);
  const totalRevenue = orders.reduce((s, o) => s + o.price, 0);

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" />
        <p className="text-white/25 text-xs tracking-widest uppercase font-mono">Loading Ledger...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">Split Payout Matrix</h2>
          </div>
          <p className="text-[12px] text-white/35 ml-5">
            Live financial ledger — <span className="text-[#DFFF00]/60">{pendingCount} pending</span> · {orders.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetch} disabled={refreshing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] tracking-wider transition-colors ${refreshing ? 'opacity-50' : ''}`}>
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:block">Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Revenue',    value: fmt(totalRevenue),             color:'text-white' },
          { label:'Pending Payout',   value: String(pendingCount),          color:'text-yellow-400' },
          { label:'Cleared',          value: String(clearedCount),          color:'text-emerald-400' },
          { label:'Admin Vault',      value: fmt(totalVault),               color:'text-[#DFFF00]', icon: true },
        ].map((s, i) => (
          <div key={i} className={`px-4 py-3.5 rounded-xl border backdrop-blur-xl ${
            s.icon ? 'border-[#DFFF00]/10 bg-[#DFFF00]/[0.02]' : 'border-white/[0.08] bg-white/[0.03]'
          }`}>
            <p className={`text-[9px] tracking-wider uppercase flex items-center gap-1 ${s.icon ? 'text-[#DFFF00]/40' : 'text-white/25'}`}>
              {s.icon && <Vault className="w-2.5 h-2.5" />}{s.label}
            </p>
            <p className={`font-mono text-lg sm:text-xl mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {(['all','pending','cleared'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-[10px] tracking-wider uppercase font-medium transition-colors ${
              filter === f
                ? 'bg-[#DFFF00]/[0.08] border border-[#DFFF00]/20 text-[#DFFF00]'
                : 'border border-white/[0.06] bg-white/[0.02] text-white/35 hover:text-white/50'
            }`}>{f}</button>
        ))}
        <span className="ml-auto text-[10px] text-white/20">{filtered.length} rows</span>
      </div>

      {/* Empty */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <TrendingUp className="w-10 h-10 text-[#DFFF00]/10 mb-3" />
          <p className="text-[11px] tracking-wider uppercase">No transactions yet</p>
          <p className="text-[10px] text-white/15 mt-1">Orders will appear here once customers place them</p>
        </div>
      )}

      {/* Table — horizontal scroll on mobile */}
      {orders.length > 0 && (
        <div className="rounded-xl border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full min-w-[780px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.01]">
                  {['Order','Customer','Price','Margin %','Admin Cut','Vendor Pay','Status','Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[9px] tracking-[0.13em] text-white/25 uppercase font-medium whitespace-nowrap first:pl-5 last:pr-5 last:text-right">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <AnimatePresence mode="popLayout">
                <tbody>
                  {filtered.map(order => {
                    const adminCut  = order.price * (order.marginPct / 100);
                    const vendorPay = order.price - adminCut;
                    return (
                      <motion.tr key={order.id} layout initial={{ opacity:0 }} animate={{ opacity:1 }}
                        exit={{ opacity:0, x:-30, transition:{ duration:0.2 } }}
                        className={`border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors ${order.cleared ? 'bg-emerald-500/[0.01]' : ''}`}>

                        <td className="pl-5 pr-4 py-3.5">
                          <span className={`font-mono text-[11px] ${order.cleared ? 'text-emerald-400/50' : 'text-[#DFFF00]/80'}`}>
                            {order.id.slice(0,8).toUpperCase()}
                          </span>
                          <p className="text-[10px] text-white/25 mt-0.5 max-w-[100px] truncate">{order.product_name}</p>
                        </td>

                        <td className="px-4 py-3.5">
                          <p className="text-[11px] text-white/50 whitespace-nowrap">{order.customerName}</p>
                          <p className="text-[10px] text-white/20 truncate max-w-[120px]">{order.customerEmail}</p>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="font-mono text-[12px] text-white/60 whitespace-nowrap">{fmt(order.price)}</span>
                        </td>

                        <td className="px-4 py-3.5 min-w-[180px]">
                          <div className="flex items-center gap-2">
                            <button onClick={() => toggleLock(order.id)}
                              className={`p-1 rounded border flex-shrink-0 transition-colors ${
                                order.marginLocked ? 'border-[#DFFF00]/20 bg-[#DFFF00]/[0.06] text-[#DFFF00]' : 'border-white/[0.06] bg-white/[0.02] text-white/25 hover:text-white/40'
                              }`}>
                              {order.marginLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                            </button>
                            <input type="range" min="5" max="60" step="0.5"
                              value={order.marginPct}
                              onChange={e => updateMargin(order.id, Number(e.target.value))}
                              disabled={order.marginLocked}
                              className={`flex-1 h-1 rounded-full appearance-none cursor-pointer accent-[#DFFF00] bg-white/[0.08] ${order.marginLocked ? 'opacity-30 cursor-not-allowed' : ''}`} />
                            <span className={`font-mono text-[11px] text-[#DFFF00]/70 w-9 text-right flex-shrink-0 ${order.marginLocked ? 'opacity-50' : ''}`}>
                              {order.marginPct.toFixed(1)}%
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="font-mono text-[12px] text-[#DFFF00]/60 whitespace-nowrap">{fmt(adminCut)}</span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className="font-mono text-[12px] text-white/40 whitespace-nowrap">{fmt(vendorPay)}</span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span className={`text-[9px] font-semibold px-2 py-1 rounded border uppercase whitespace-nowrap ${
                            order.cleared ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
                            : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>

                        <td className="pl-4 pr-5 py-3.5 text-right">
                          {!order.cleared ? (
                            <button onClick={() => markCleared(order.id)}
                              className="px-3 py-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] tracking-wider text-emerald-400 uppercase hover:bg-emerald-500/[0.12] transition-colors whitespace-nowrap">
                              Clear
                            </button>
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400/30 inline" />
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 sm:gap-6 px-1 flex-wrap">
        {[
          { c:'bg-white/[0.15]', l:'Customer Retail' },
          { c:'bg-[#DFFF00]/30', l:'Admin Vault' },
          { c:'bg-white/[0.08]', l:'Vendor Payout' },
        ].map(x => (
          <div key={x.l} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${x.c}`} />
            <span className="text-[9px] tracking-wider text-white/25 uppercase">{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
