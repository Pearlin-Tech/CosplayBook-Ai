import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, AlertTriangle, CheckCircle2, Scan, Ruler,
  AlignCenter, ImageIcon, Clock, RefreshCw, User,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

/* ─── Types ─────────────────────────────────────────────────── */
interface IntakeOrder {
  id: string;
  user_id: string;
  product_name: string;
  price: number;
  status: string;
  blueprint_url: string | null;
  shipping_address: string | null;
  created_at: string;
  // joined from profiles
  customerName?: string;
  customerEmail?: string;
}

const CHECKLIST = [
  { key: 'blueprint', label: 'Blueprint Attached',     icon: ImageIcon },
  { key: 'address',   label: 'Shipping Address Set',   icon: AlignCenter },
  { key: 'price',     label: 'Price Confirmed (>₹0)',  icon: Ruler },
] as const;

type CheckKey = (typeof CHECKLIST)[number]['key'];

function checkValue(order: IntakeOrder, key: CheckKey): boolean {
  if (key === 'blueprint') return !!order.blueprint_url;
  if (key === 'address')   return !!order.shipping_address;
  if (key === 'price')     return Number(order.price) > 0;
  return false;
}

const STATUS_COLORS: Record<string, string> = {
  pending:    'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  processing: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  approved:   'text-green-400 bg-green-400/10 border-green-400/20',
  shipped:    'text-purple-400 bg-purple-400/10 border-purple-400/20',
  delivered:  'text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20',
  rejected:   'text-red-400 bg-red-400/10 border-red-400/20',
};

/* ─── Component ─────────────────────────────────────────────── */
export default function IntakePipeline() {
  const [orders,     setOrders]     = useState<IntakeOrder[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [selectedId, setSelectedId] = useState<string>('');
  const [flagVisible,setFlagVisible]= useState(false);
  const [flagText,   setFlagText]   = useState('');
  const [refreshing, setRefreshing] = useState(false);

  /* ── Load real orders from Supabase ── */
  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      // Fetch all apparel orders
      const { data: ordersData, error } = await supabase
        .from('apparel_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!ordersData) { setOrders([]); return; }

      // Fetch profile info for each unique user_id
      const userIds = [...new Set(ordersData.map(o => o.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', userIds);

      const profileMap: Record<string, { full_name: string; email: string }> = {};
      profiles?.forEach(p => { profileMap[p.id] = p; });

      const enriched: IntakeOrder[] = ordersData.map(o => ({
        ...o,
        customerName:  profileMap[o.user_id]?.full_name  || 'Unknown Customer',
        customerEmail: profileMap[o.user_id]?.email       || '',
      }));

      setOrders(enriched);
      if (enriched.length > 0 && !selectedId) setSelectedId(enriched[0].id);
    } catch (err: any) {
      console.error('IntakePipeline fetch error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  /* ── Derived ── */
  const pending  = orders.filter(o => o.status === 'pending' || o.status === 'processing');
  const flagged  = orders.filter(o => o.status === 'rejected');
  const active   = orders.find(o => o.id === selectedId) ?? null;

  /* ── Handlers ── */
  const handleAuthorize = async () => {
    if (!active) return;
    try {
      const { error } = await supabase
        .from('apparel_orders')
        .update({ status: 'approved' })
        .eq('id', active.id);
      if (error) throw error;
      setOrders(prev => prev.map(o => o.id === active.id ? { ...o, status: 'approved' } : o));
      const next = pending.find(o => o.id !== active.id);
      setSelectedId(next?.id ?? '');
    } catch (err: any) { alert('Failed: ' + err.message); }
  };

  const handleFlag = async () => {
    if (!active) return;
    if (!flagVisible) { setFlagVisible(true); return; }
    if (!flagText.trim()) return;
    try {
      const { error } = await supabase
        .from('apparel_orders')
        .update({ status: 'rejected' })
        .eq('id', active.id);
      if (error) throw error;
      setOrders(prev => prev.map(o => o.id === active.id ? { ...o, status: 'rejected' } : o));
      setFlagVisible(false);
      setFlagText('');
      const next = pending.find(o => o.id !== active.id);
      setSelectedId(next?.id ?? '');
    } catch (err: any) { alert('Failed: ' + err.message); }
  };

  /* ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" />
          <p className="text-white/30 text-xs tracking-widest uppercase font-mono">Loading Orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
            <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">
              The Intake Pipeline
            </h2>
          </div>
          <p className="text-[12px] text-white/35 ml-5">
            Live Order Queue — <span className="text-[#DFFF00]/60">{pending.length} pending</span> · {orders.length} total
          </p>
        </div>
        <button onClick={fetchOrders} disabled={refreshing}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] tracking-wider transition-colors ${refreshing ? 'opacity-50' : ''}`}>
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label:'Total Orders',   value: orders.length,  color:'text-white' },
          { label:'Pending Review', value: pending.length, color:'text-yellow-400' },
          { label:'Approved',       value: orders.filter(o=>o.status==='approved'||o.status==='shipped'||o.status==='delivered').length, color:'text-green-400' },
          { label:'Flagged',        value: flagged.length, color:'text-red-400' },
        ].map((s,i) => (
          <div key={i} className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <p className="text-[9px] tracking-wider text-white/25 uppercase">{s.label}</p>
            <p className={`font-mono text-xl mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-white/20">
          <CheckCircle2 className="w-10 h-10 text-[#DFFF00]/20 mb-3" />
          <p className="text-[12px] tracking-wider uppercase">No orders in the system yet</p>
          <p className="text-[10px] text-white/15 mt-1">Orders will appear here when customers place them</p>
        </div>
      )}

      {orders.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-4">
          {/* LEFT — Queue */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase font-medium">Order Queue</span>
              <span className="text-[10px] text-white/20 font-mono">{orders.length} orders</span>
            </div>
            <div className="divide-y divide-white/[0.04] max-h-[480px] overflow-y-auto">
              <AnimatePresence>
                {orders.map(order => {
                  const isSelected = order.id === selectedId;
                  const statusCls = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;
                  return (
                    <motion.button key={order.id} layout
                      initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                      onClick={() => { setSelectedId(order.id); setFlagVisible(false); }}
                      className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                        isSelected ? 'bg-[#DFFF00]/[0.05] border-l-2 border-[#DFFF00]/50' : 'hover:bg-white/[0.02] border-l-2 border-transparent'
                      }`}>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-4 h-4 text-white/20" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="font-mono tracking-wider text-[12px] text-white/70 truncate">
                            {order.product_name || 'Custom Order'}
                          </span>
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase ${statusCls}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/35 truncate">{order.customerName}</p>
                        <p className="text-[10px] text-white/20 font-mono mt-0.5">
                          ₹{Number(order.price||0).toLocaleString('en-IN')} · {new Date(order.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — Inspection */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
            {active ? (
              <div className="flex flex-col h-full">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3 min-w-0">
                    <Eye className="w-4 h-4 text-[#DFFF00]/60 flex-shrink-0" />
                    <span className="font-mono text-[13px] text-[#DFFF00] truncate">{active.id.slice(0,8).toUpperCase()}</span>
                    <span className="text-[10px] text-white/25 uppercase hidden sm:block truncate">{active.product_name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/20 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px]">{new Date(active.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>

                {/* Blueprint image */}
                <div className="p-5">
                  <div className="relative w-full aspect-[16/7] rounded-lg border border-white/[0.06] overflow-hidden bg-white/[0.015]">
                    {active.blueprint_url ? (
                      <img src={active.blueprint_url} alt="Blueprint" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/20">
                        <ImageIcon className="w-10 h-10" />
                        <span className="text-[10px] tracking-wider uppercase">No Blueprint Uploaded</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 px-3 py-1.5 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-[9px] text-white/40 uppercase tracking-wider">Customer Blueprint</span>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="px-5 pb-4">
                  <p className="text-[9px] tracking-[0.15em] text-white/25 uppercase mb-2.5">Auto QC Checklist</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {CHECKLIST.map(item => {
                      const pass = checkValue(active, item.key);
                      return (
                        <div key={item.key} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border ${
                          pass ? 'bg-emerald-500/[0.06] border-emerald-500/20 text-emerald-400' : 'bg-red-500/[0.06] border-red-500/20 text-red-400'
                        }`}>
                          {pass ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
                          <item.icon className="w-3 h-3 opacity-60 flex-shrink-0" />
                          <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Customer info */}
                <div className="px-5 pb-3 space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <User className="w-3 h-3 text-white/20" />
                    <span className="text-white/50">{active.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-3 h-3" />
                    <span className="text-white/25">{active.customerEmail}</span>
                  </div>
                  {active.shipping_address && (
                    <div className="flex items-start gap-2 text-[11px]">
                      <span className="w-3 h-3" />
                      <span className="text-white/20 leading-relaxed">{active.shipping_address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="w-3 h-3" />
                    <span className="text-[#DFFF00]/60 font-mono">₹{Number(active.price||0).toLocaleString('en-IN')}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border uppercase font-semibold ${STATUS_COLORS[active.status] ?? STATUS_COLORS.pending}`}>
                      {active.status}
                    </span>
                  </div>
                </div>

                {/* Flag input */}
                <AnimatePresence>
                  {flagVisible && (
                    <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                      className="px-5 overflow-hidden">
                      <textarea value={flagText} onChange={e => setFlagText(e.target.value)}
                        placeholder="Describe the issue or required revisions..."
                        className="w-full h-20 px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[13px] text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-[#DFFF00]/30 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                {(active.status === 'pending' || active.status === 'processing') && (
                  <div className="flex gap-3 px-5 py-4 mt-auto border-t border-white/[0.06]">
                    <button onClick={handleFlag}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-500/[0.08] text-red-400 text-[11px] font-semibold tracking-wider uppercase hover:bg-red-500/[0.15] transition-colors">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {flagVisible ? 'Submit Flag' : 'Flag Revision'}
                    </button>
                    <button onClick={handleAuthorize}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#DFFF00] text-[#08080A] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#DFFF00]/90 transition-colors shadow-[0_0_20px_rgba(223,255,0,0.15)]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Authorize
                    </button>
                  </div>
                )}

                {active.status === 'approved' && (
                  <div className="px-5 py-4 mt-auto border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Order approved and sent to production
                    </div>
                  </div>
                )}

                {active.status === 'rejected' && (
                  <div className="px-5 py-4 mt-auto border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-red-400 text-[11px] font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      Order flagged for revision
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-white/20">
                <CheckCircle2 className="w-8 h-8 text-[#DFFF00]/20 mb-3" />
                <p className="text-[11px] tracking-wider uppercase">Select an order to inspect</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flagged section */}
      <AnimatePresence>
        {flagged.length > 0 && (
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1.5 h-6 rounded-full bg-red-500" />
              <h3 className="text-[12px] font-semibold tracking-[0.12em] text-red-400/70 uppercase">
                Flagged Orders ({flagged.length})
              </h3>
            </div>
            <div className="space-y-2">
              {flagged.map(item => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-3 rounded-lg border border-red-500/10 bg-red-500/[0.02]">
                  <span className="font-mono text-[12px] text-red-400/60">{item.id.slice(0,8).toUpperCase()}</span>
                  <span className="text-[11px] text-white/30 flex-1 truncate">{item.customerName} — {item.product_name}</span>
                  <button onClick={() => { setSelectedId(item.id); setFlagVisible(false); }}
                    className="text-[10px] text-white/30 hover:text-white border border-white/10 px-2 py-1 rounded">
                    View
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
