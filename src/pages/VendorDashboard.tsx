import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Users, DollarSign, Settings, Menu, X,
  Shield, TrendingUp, Clock, CheckCircle2, Truck,
  AlertTriangle, RefreshCw, LogOut, BarChart2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

/* ─── Types ─────────────────────────────────────────────────── */
interface VendorOrder {
  id: string;
  product_name: string;
  price: number;
  status: string;
  created_at: string;
  shipping_address: string | null;
  blueprint_url: string | null;
  customerName: string;
}

const fmt = (v: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0
}).format(v);

const STATUS_COLORS: Record<string, string> = {
  pending:    'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  processing: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  approved:   'text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20',
  shipped:    'text-purple-400 bg-purple-400/10 border-purple-400/20',
  delivered:  'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  rejected:   'text-red-400 bg-red-400/10 border-red-400/20',
};

type Tab = 'orders' | 'production' | 'earnings' | 'settings';

const NAV: { id: Tab; label: string; icon: React.FC<any> }[] = [
  { id: 'orders',     label: 'Order Queue',   icon: Package },
  { id: 'production', label: 'Production',    icon: Truck },
  { id: 'earnings',   label: 'Earnings',      icon: DollarSign },
  { id: 'settings',   label: 'Settings',      icon: Settings },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function VendorDashboard() {
  const navigate   = useNavigate();
  const [tab,         setTab]         = useState<Tab>('orders');
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [orders,      setOrders]      = useState<VendorOrder[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);
  const [vendorName,  setVendorName]  = useState('');
  const [vendorEmail, setVendorEmail] = useState('');

  /* ── Load ── */
  const fetchData = async () => {
    setRefreshing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate('/login'); return; }

      // Load vendor profile
      const { data: profile } = await supabase
        .from('profiles').select('full_name, email').eq('id', session.user.id).single();
      if (profile) {
        setVendorName(profile.full_name || 'Vendor');
        setVendorEmail(profile.email || session.user.email || '');
      }

      // Load approved orders (vendor sees orders assigned/approved for production)
      const { data: raw } = await supabase
        .from('apparel_orders')
        .select('*')
        .in('status', ['approved', 'processing', 'shipped', 'delivered'])
        .order('created_at', { ascending: false });

      if (!raw) { setOrders([]); return; }

      const uids = [...new Set(raw.map(o => o.user_id))];
      const { data: profs } = await supabase
        .from('profiles').select('id, full_name').in('id', uids);
      const pm: Record<string, string> = {};
      profs?.forEach(p => { pm[p.id] = p.full_name || 'Customer'; });

      setOrders(raw.map(o => ({
        id:              o.id,
        product_name:    o.product_name || 'Custom Order',
        price:           Number(o.price) || 0,
        status:          o.status,
        created_at:      o.created_at,
        shipping_address: o.shipping_address,
        blueprint_url:   o.blueprint_url,
        customerName:    pm[o.user_id] || 'Customer',
      })));
    } catch (e: any) { console.error(e.message); }
    finally { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { fetchData(); }, []);

  /* ── Handlers ── */
  const markShipped = async (id: string) => {
    try {
      await supabase.from('apparel_orders').update({ status: 'shipped' }).eq('id', id);
      setOrders(p => p.map(o => o.id === id ? { ...o, status: 'shipped' } : o));
    } catch (e: any) { alert(e.message); }
  };

  const markDelivered = async (id: string) => {
    try {
      await supabase.from('apparel_orders').update({ status: 'delivered' }).eq('id', id);
      setOrders(p => p.map(o => o.id === id ? { ...o, status: 'delivered' } : o));
    } catch (e: any) { alert(e.message); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  /* ── Derived ── */
  const totalEarnings  = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.price * 0.75, 0);
  const pendingOrders  = orders.filter(o => o.status === 'approved' || o.status === 'processing');
  const inProduction   = orders.filter(o => o.status === 'processing');
  const dispatched     = orders.filter(o => o.status === 'shipped');

  const handleTabChange = (t: Tab) => { setTab(t); setMobileOpen(false); };

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#08080A] text-white antialiased">

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#08080A] border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#DFFF00] flex items-center justify-center">
            <span className="text-[#08080A] text-xs font-black">HV</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] text-white/90 uppercase">Vendor Portal</p>
            <p className="text-[9px] text-[#DFFF00] uppercase tracking-wider truncate max-w-[160px]">{vendorName}</p>
          </div>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-white/50">
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile pill tabs */}
      <div className="lg:hidden fixed top-[52px] left-0 right-0 z-40 flex gap-2 px-4 py-2.5 bg-[#08080A] border-b border-white/[0.06] overflow-x-auto" style={{ scrollbarWidth:'none' }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => handleTabChange(item.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap flex-shrink-0 transition-all ${
              tab === item.id ? 'bg-[#DFFF00] text-[#08080A]' : 'bg-white/5 text-white/50 border border-white/10'
            }`}>
            <item.icon className="w-3 h-3" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[260px] bg-[#08080A] border-r border-white/[0.08] flex-col z-50">
        <div className="px-6 py-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#DFFF00] flex items-center justify-center">
              <span className="text-[#08080A] text-sm font-black">HV</span>
            </div>
            <div>
              <h1 className="text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase">Vendor Portal</h1>
              <p className="text-[9px] tracking-[0.15em] text-[#DFFF00] uppercase mt-0.5 truncate max-w-[140px]">{vendorName}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(item => {
            const isActive = tab === item.id;
            return (
              <button key={item.id} onClick={() => handleTabChange(item.id)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  isActive ? 'text-[#DFFF00]' : 'text-white/50 hover:text-white/70 hover:bg-white/[0.03]'
                }`}>
                {isActive && (
                  <motion.div layoutId="vendor-active"
                    className="absolute inset-0 rounded-lg bg-[#DFFF00]/[0.08] border border-[#DFFF00]/[0.15]"
                    transition={{ type:'spring', stiffness:400, damping:30 }} />
                )}
                <item.icon className="relative w-4 h-4 flex-shrink-0" />
                <span className="relative text-[11px] font-medium tracking-[0.12em]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-3">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-[11px] tracking-wider">Sign Out</span>
          </button>
        </div>

        <div className="px-5 py-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse" />
            <span className="text-[10px] tracking-[0.1em] text-white/40 uppercase">Online</span>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
            <motion.aside initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }}
              transition={{ type:'spring', stiffness:300, damping:30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50 bg-[#08080A] border-r border-white/[0.08] flex flex-col">
              <div className="px-5 py-5 border-b border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-white/90 uppercase">Vendor Portal</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/30 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV.map(item => (
                  <button key={item.id} onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      tab === item.id ? 'bg-[#DFFF00]/[0.08] border border-[#DFFF00]/15 text-[#DFFF00]' : 'text-white/50 hover:text-white/70'
                    }`}>
                    <item.icon className="w-4 h-4" />
                    <span className="text-[11px] font-medium tracking-[0.12em]">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="px-3 pb-4">
                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/30 hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span className="text-[11px]">Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="lg:ml-[260px] min-h-screen pt-[52px] lg:pt-0">
        <div className="lg:hidden h-[44px]" />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}>

              {/* ── ORDER QUEUE ── */}
              {tab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
                        <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">Order Queue</h2>
                      </div>
                      <p className="text-[12px] text-white/35 ml-5">
                        Approved orders ready for production — <span className="text-[#DFFF00]/60">{pendingOrders.length} pending</span>
                      </p>
                    </div>
                    <button onClick={fetchData} disabled={refreshing}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] transition-colors ${refreshing ? 'opacity-50' : ''}`}>
                      <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label:'New Orders',   value: pendingOrders.length,  color:'text-[#DFFF00]' },
                      { label:'In Production',value: inProduction.length,   color:'text-blue-400' },
                      { label:'Dispatched',   value: dispatched.length,     color:'text-purple-400' },
                      { label:'Delivered',    value: orders.filter(o=>o.status==='delivered').length, color:'text-emerald-400' },
                    ].map((s,i) => (
                      <div key={i} className="px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                        <p className="text-[9px] tracking-wider text-white/25 uppercase">{s.label}</p>
                        <p className={`font-mono text-xl mt-1 ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-white/20 border border-white/[0.06] rounded-xl">
                      <Package className="w-10 h-10 text-[#DFFF00]/10 mb-3" />
                      <p className="text-[11px] tracking-wider uppercase">No orders assigned yet</p>
                      <p className="text-[10px] text-white/15 mt-1">Approved orders will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map(order => (
                        <motion.div key={order.id} layout
                          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 sm:p-5">
                          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="font-mono text-sm text-[#DFFF00]/80">{order.id.slice(0,8).toUpperCase()}</span>
                                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded border uppercase ${STATUS_COLORS[order.status] ?? STATUS_COLORS.pending}`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-white/70 text-sm truncate">{order.product_name}</p>
                              <p className="text-white/30 text-xs mt-0.5">Customer: {order.customerName}</p>
                              {order.shipping_address && (
                                <p className="text-white/20 text-xs mt-0.5 truncate">Ship to: {order.shipping_address}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <p className="font-mono text-lg text-white/60">{fmt(order.price * 0.75)}</p>
                              <div className="flex gap-2">
                                {order.status === 'approved' && (
                                  <button onClick={() => markShipped(order.id)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-purple-400/20 bg-purple-400/[0.06] text-[10px] text-purple-400 uppercase tracking-wider hover:bg-purple-400/[0.12] transition-colors whitespace-nowrap">
                                    <Truck className="w-3 h-3" /> Dispatch
                                  </button>
                                )}
                                {order.status === 'shipped' && (
                                  <button onClick={() => markDelivered(order.id)}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] text-[10px] text-emerald-400 uppercase tracking-wider hover:bg-emerald-400/[0.12] transition-colors whitespace-nowrap">
                                    <CheckCircle2 className="w-3 h-3" /> Mark Delivered
                                  </button>
                                )}
                                {order.status === 'delivered' && (
                                  <span className="flex items-center gap-1 text-emerald-400/50 text-[10px]">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {order.blueprint_url && (
                            <div className="mt-3 pt-3 border-t border-white/[0.06]">
                              <a href={order.blueprint_url} target="_blank" rel="noreferrer"
                                className="text-[10px] text-[#DFFF00]/50 hover:text-[#DFFF00] transition-colors uppercase tracking-wider">
                                View Blueprint →
                              </a>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── PRODUCTION ── */}
              {tab === 'production' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
                    <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">Production Schedule</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label:'Awaiting Production', orders: pendingOrders, color:'text-yellow-400', borderColor:'border-yellow-400/20' },
                      { label:'In Production',        orders: inProduction,  color:'text-blue-400',   borderColor:'border-blue-400/20' },
                      { label:'Dispatched',           orders: dispatched,    color:'text-purple-400', borderColor:'border-purple-400/20' },
                    ].map(col => (
                      <div key={col.label} className={`rounded-2xl border ${col.borderColor} bg-white/[0.02] p-4`}>
                        <p className={`text-[10px] font-semibold uppercase tracking-wider mb-3 ${col.color}`}>{col.label} ({col.orders.length})</p>
                        <div className="space-y-2">
                          {col.orders.length === 0 ? (
                            <p className="text-white/20 text-xs text-center py-4">Empty</p>
                          ) : col.orders.map(o => (
                            <div key={o.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                              <p className="font-mono text-[11px] text-white/60">{o.id.slice(0,8).toUpperCase()}</p>
                              <p className="text-white/40 text-[10px] truncate mt-0.5">{o.product_name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── EARNINGS ── */}
              {tab === 'earnings' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
                    <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">Earnings</h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { label:'Total Earned',    value: fmt(totalEarnings),                                                       color:'text-[#DFFF00]' },
                      { label:'Orders Completed',value: String(orders.filter(o=>o.status==='delivered').length),                  color:'text-white' },
                      { label:'Pending Payout',  value: fmt(pendingOrders.reduce((s,o) => s + o.price * 0.75, 0)),               color:'text-yellow-400' },
                    ].map((s,i) => (
                      <div key={i} className="px-4 py-4 rounded-xl border border-white/[0.08] bg-white/[0.03]">
                        <p className="text-[9px] tracking-wider text-white/25 uppercase">{s.label}</p>
                        <p className={`font-mono text-xl mt-1 ${s.color}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
                    <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.01]">
                      <p className="text-[10px] tracking-[0.15em] text-white/30 uppercase">Transaction History</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px]">
                        <thead>
                          <tr className="border-b border-white/[0.06]">
                            {['Order','Product','Retail','Your Cut (75%)','Status'].map(h => (
                              <th key={h} className="px-4 py-3 text-left text-[9px] tracking-[0.13em] text-white/25 uppercase font-medium">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id} className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors">
                              <td className="px-4 py-3.5 font-mono text-[11px] text-[#DFFF00]/70">{order.id.slice(0,8).toUpperCase()}</td>
                              <td className="px-4 py-3.5 text-[11px] text-white/50 truncate max-w-[120px]">{order.product_name}</td>
                              <td className="px-4 py-3.5 font-mono text-[11px] text-white/50">{fmt(order.price)}</td>
                              <td className="px-4 py-3.5 font-mono text-[12px] text-[#DFFF00]/70">{fmt(order.price * 0.75)}</td>
                              <td className="px-4 py-3.5">
                                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded border uppercase ${STATUS_COLORS[order.status] ?? STATUS_COLORS.pending}`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {orders.length === 0 && (
                            <tr><td colSpan={5} className="px-4 py-12 text-center text-white/20 text-xs">No transactions yet</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SETTINGS ── */}
              {tab === 'settings' && (
                <div className="space-y-5 max-w-lg">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-1.5 h-6 rounded-full bg-[#DFFF00]" />
                    <h2 className="text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase">Workshop Settings</h2>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                    <h3 className="text-white/70 text-sm font-medium mb-4">Account Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Workshop Name</label>
                        <p className="text-white/60 text-sm">{vendorName}</p>
                      </div>
                      <div>
                        <label className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">Email</label>
                        <p className="text-white/60 text-sm">{vendorEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
                    <h3 className="text-white/70 text-sm font-medium mb-4">Payout Info</h3>
                    <p className="text-white/30 text-xs">Bank account and UPI details — coming soon.</p>
                  </div>

                  <button onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-400/60 border border-red-400/10 px-4 py-2.5 rounded-xl hover:text-red-400 hover:border-red-400/20 transition-all">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
