import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu, X, Shield, FileSearch, Banknote, Truck, Sun, Moon,
  LayoutDashboard, Users, Bell, RefreshCw, TrendingUp,
  CheckCircle2, Clock, AlertTriangle, Package, LogOut,
  ChevronRight, Zap, Eye, ArrowUpRight, UserCheck,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import IntakePipeline from '../components/IntakePipeline';
import PayoutMatrix from '../components/PayoutMatrix';
import VendorFleet from '../components/VendorFleet';

/* ─── Types ─── */
type TabId = 'overview' | 'intake' | 'payout' | 'fleet' | 'vendors' | 'customers';

interface StatsData {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  activeVendors: number;
  totalCustomers: number;
  ordersThisWeek: number;
}

interface RecentOrder {
  id: string;
  product_name: string;
  price: number;
  status: string;
  created_at: string;
  customerName: string;
}

interface VendorRow {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface CustomerRow {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  orderCount?: number;
}

/* ─── Theme ─── */
function useTheme(dark: boolean) {
  return {
    bg:        dark ? 'bg-[#08080A]'             : 'bg-[#F7F6F3]',
    sidebar:   dark ? 'bg-[#0D0D0F]'             : 'bg-white',
    card:      dark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-[#E8E6E0]',
    border:    dark ? 'border-white/[0.08]'       : 'border-[#E8E6E0]',
    text:      dark ? 'text-white/90'             : 'text-[#1a1a18]',
    textMut:   dark ? 'text-white/40'             : 'text-[#888880]',
    textDim:   dark ? 'text-white/20'             : 'text-[#BBBBBB]',
    accent:    dark ? 'bg-[#DFFF00]'              : 'bg-[#1a1a18]',
    accentT:   dark ? 'text-[#08080A]'            : 'text-white',
    accentHl:  dark ? 'text-[#DFFF00]'            : 'text-[#1a1a18]',
    navActive: dark
      ? 'bg-[#DFFF00]/[0.08] border border-[#DFFF00]/20 text-[#DFFF00]'
      : 'bg-[#1a1a18]/[0.06] border border-[#1a1a18]/10 text-[#1a1a18]',
    navIdle:   dark
      ? 'text-white/35 hover:text-white/60 hover:bg-white/[0.03] border border-transparent'
      : 'text-[#888880] hover:text-[#1a1a18] hover:bg-black/[0.03] border border-transparent',
    pill:      dark ? 'bg-white/5 text-white/50 border-white/10'      : 'bg-black/5 text-[#555] border-black/10',
    pillAct:   dark ? 'bg-[#DFFF00] text-[#08080A] border-transparent' : 'bg-[#1a1a18] text-white border-transparent',
    input:     dark
      ? 'bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-[#DFFF00]/30'
      : 'bg-white border-[#E8E6E0] text-[#1a1a18] placeholder:text-[#BBBBBB] focus:border-[#1a1a18]/30',
    table:     dark ? 'border-white/[0.06]' : 'border-[#E8E6E0]',
    tableRow:  dark ? 'hover:bg-white/[0.02] border-white/[0.04]' : 'hover:bg-[#F7F6F3] border-[#E8E6E0]',
    badge: {
      pending:    dark ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' : 'text-yellow-700 bg-yellow-50 border-yellow-200',
      approved:   dark ? 'text-green-400 bg-green-400/10 border-green-400/20'   : 'text-green-700 bg-green-50 border-green-200',
      shipped:    dark ? 'text-purple-400 bg-purple-400/10 border-purple-400/20': 'text-purple-700 bg-purple-50 border-purple-200',
      delivered:  dark ? 'text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20'  : 'text-lime-700 bg-lime-50 border-lime-200',
      rejected:   dark ? 'text-red-400 bg-red-400/10 border-red-400/20'        : 'text-red-700 bg-red-50 border-red-200',
      processing: dark ? 'text-blue-400 bg-blue-400/10 border-blue-400/20'     : 'text-blue-700 bg-blue-50 border-blue-200',
    },
  };
}

const fmt = (v: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

/* ─── Overview Tab ─── */
function OverviewTab({ dark, t }: { dark: boolean; t: ReturnType<typeof useTheme> }) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recent, setRecent] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ordersRes, profilesRes] = await Promise.all([
        supabase.from('apparel_orders').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id, full_name, role, email'),
      ]);

      const orders = ordersRes.data || [];
      const profiles = profilesRes.data || [];
      const profileMap: Record<string, string> = {};
      profiles.forEach(p => { profileMap[p.id] = p.full_name || 'Unknown'; });

      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const totalRevenue = orders.reduce((s, o) => s + Number(o.price || 0), 0);

      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => ['pending', 'processing'].includes(o.status)).length,
        totalRevenue,
        activeVendors: profiles.filter(p => p.role === 'VENDOR').length,
        totalCustomers: profiles.filter(p => !['ADMIN', 'VENDOR'].includes(p.role)).length,
        ordersThisWeek: orders.filter(o => new Date(o.created_at) > weekAgo).length,
      });

      setRecent(orders.slice(0, 8).map(o => ({
        id: o.id,
        product_name: o.product_name || 'Custom Order',
        price: Number(o.price || 0),
        status: o.status,
        created_at: o.created_at,
        customerName: profileMap[o.user_id] || 'Unknown',
      })));
    } catch (e: any) { console.error(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const statCards = stats ? [
    { label: 'Total Orders',    value: stats.totalOrders,                  sub: `${stats.ordersThisWeek} this week`,  icon: Package,     color: dark ? 'text-[#DFFF00]' : 'text-[#1a1a18]' },
    { label: 'Pending Review',  value: stats.pendingOrders,                sub: 'awaiting approval',                  icon: Clock,       color: 'text-yellow-500' },
    { label: 'Total Revenue',   value: fmt(stats.totalRevenue),            sub: 'all time',                           icon: TrendingUp,  color: 'text-emerald-500' },
    { label: 'Active Vendors',  value: stats.activeVendors,                sub: 'registered',                         icon: UserCheck,   color: 'text-blue-500' },
    { label: 'Customers',       value: stats.totalCustomers,               sub: 'registered users',                   icon: Users,       color: 'text-purple-500' },
    { label: 'Completed',       value: stats.totalOrders - stats.pendingOrders, sub: 'processed',                     icon: CheckCircle2, color: 'text-emerald-500' },
  ] : [];

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="flex flex-col items-center gap-4">
        <div className={`w-8 h-8 border-2 rounded-full animate-spin ${dark ? 'border-[#DFFF00]/30 border-t-[#DFFF00]' : 'border-[#1a1a18]/20 border-t-[#1a1a18]'}`} />
        <p className={`text-xs tracking-widest uppercase font-mono ${t.textMut}`}>Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-semibold tracking-tight ${t.text}`}>Command Overview</h2>
          <p className={`text-sm mt-1 ${t.textMut}`}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <button onClick={fetchData} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs tracking-wider transition-colors ${t.card} ${t.textMut} hover:${t.text}`}>
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`p-4 rounded-xl border ${t.card}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] uppercase tracking-wider ${t.textMut}`}>{s.label}</span>
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
            </div>
            <p className={`text-2xl font-semibold tracking-tight ${t.text}`}>{s.value}</p>
            <p className={`text-[10px] mt-1 ${t.textDim}`}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent orders */}
      <div className={`rounded-xl border overflow-hidden ${t.card}`}>
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t.border}`}>
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${t.accentHl}`} />
            <h3 className={`text-sm font-medium ${t.text}`}>Recent Orders</h3>
          </div>
          <span className={`text-[10px] uppercase tracking-wider ${t.textDim}`}>{recent.length} shown</span>
        </div>
        {recent.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-16 ${t.textDim}`}>
            <Package className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-xs tracking-wider uppercase">No orders yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className={`border-b text-left ${t.border}`}>
                  {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map(h => (
                    <th key={h} className={`px-5 py-3 text-[10px] uppercase tracking-wider font-medium ${t.textDim}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((o, i) => (
                  <tr key={o.id} className={`border-b transition-colors ${t.tableRow} ${i === recent.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-5 py-3.5">
                      <span className={`font-mono text-xs ${t.accentHl}`}>{o.id.slice(0, 8).toUpperCase()}</span>
                    </td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.textMut}`}>{o.customerName}</span></td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.text} max-w-[140px] truncate block`}>{o.product_name}</span></td>
                    <td className="px-5 py-3.5"><span className={`font-mono text-xs ${t.text}`}>{fmt(o.price)}</span></td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[9px] font-semibold px-2 py-1 rounded border uppercase ${(t.badge as any)[o.status] ?? t.badge.pending}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.textDim}`}>{new Date(o.created_at).toLocaleDateString('en-IN')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Vendors Tab ─── */
function VendorsTab({ dark, t }: { dark: boolean; t: ReturnType<typeof useTheme> }) {
  const [vendors, setVendors] = useState<VendorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoteEmail, setPromoteEmail] = useState('');
  const [promoting, setPromoting] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('profiles').select('*').eq('role', 'VENDOR').order('created_at', { ascending: false });
      setVendors(data || []);
    } catch (e: any) { console.error(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVendors(); }, []);

  const promoteUser = async () => {
    if (!promoteEmail.trim()) return;
    setPromoting(true);
    setMsg('');
    try {
      const { data: profile, error } = await supabase.from('profiles').select('id, email').eq('email', promoteEmail.trim()).maybeSingle();
      if (error || !profile) { setMsg('User not found. Make sure they have signed up first.'); return; }
      await supabase.from('profiles').update({ role: 'VENDOR' }).eq('id', profile.id);
      setMsg(`✓ ${promoteEmail} promoted to VENDOR`);
      setPromoteEmail('');
      fetchVendors();
    } catch (e: any) { setMsg('Error: ' + e.message); }
    finally { setPromoting(false); }
  };

  const demoteVendor = async (id: string, name: string) => {
    if (!confirm(`Remove VENDOR role from ${name}?`)) return;
    await supabase.from('profiles').update({ role: 'CUSTOMER' }).eq('id', id);
    fetchVendors();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-semibold ${t.text}`}>Vendor Management</h2>
          <p className={`text-sm mt-0.5 ${t.textMut}`}>{vendors.length} registered vendors</p>
        </div>
        <button onClick={fetchVendors} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${t.card} ${t.textMut}`}>
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Promote user card */}
      <div className={`rounded-xl border p-5 ${t.card}`}>
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className={`w-4 h-4 ${t.accentHl}`} />
          <h3 className={`text-sm font-medium ${t.text}`}>Promote User to Vendor</h3>
        </div>
        <div className="flex gap-3">
          <input
            type="email"
            value={promoteEmail}
            onChange={e => setPromoteEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && promoteUser()}
            placeholder="user@email.com"
            className={`flex-1 px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${t.input}`}
          />
          <button onClick={promoteUser} disabled={promoting}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${t.accent} ${t.accentT}`}>
            {promoting ? 'Promoting...' : 'Promote'}
          </button>
        </div>
        {msg && <p className={`text-xs mt-2 ${msg.startsWith('✓') ? 'text-emerald-500' : 'text-red-500'}`}>{msg}</p>}
      </div>

      {/* Vendor list */}
      <div className={`rounded-xl border overflow-hidden ${t.card}`}>
        <div className={`px-5 py-4 border-b ${t.border}`}>
          <h3 className={`text-sm font-medium ${t.text}`}>Active Vendors</h3>
        </div>
        {loading ? (
          <div className={`flex items-center justify-center py-16 ${t.textDim}`}>
            <div className={`w-6 h-6 border-2 rounded-full animate-spin ${dark ? 'border-[#DFFF00]/20 border-t-[#DFFF00]' : 'border-[#1a1a18]/20 border-t-[#1a1a18]'}`} />
          </div>
        ) : vendors.length === 0 ? (
          <div className={`flex flex-col items-center py-16 ${t.textDim}`}>
            <Users className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-xs uppercase tracking-wider">No vendors yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${t.border}`}>
                  {['Name', 'Email', 'Joined', 'Role', 'Actions'].map(h => (
                    <th key={h} className={`px-5 py-3 text-left text-[10px] uppercase tracking-wider ${t.textDim}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vendors.map((v, i) => (
                  <tr key={v.id} className={`border-b transition-colors ${t.tableRow} ${i === vendors.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-5 py-3.5"><span className={`text-sm font-medium ${t.text}`}>{v.full_name || '—'}</span></td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.textMut}`}>{v.email}</span></td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.textDim}`}>{new Date(v.created_at).toLocaleDateString('en-IN')}</span></td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[9px] font-semibold px-2 py-1 rounded border uppercase ${dark ? 'text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20' : 'text-lime-700 bg-lime-50 border-lime-200'}`}>
                        VENDOR
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => demoteVendor(v.id, v.full_name || v.email)}
                        className={`text-[10px] px-3 py-1.5 rounded-lg border transition-colors ${dark ? 'border-red-500/20 text-red-400 hover:bg-red-500/10' : 'border-red-200 text-red-600 hover:bg-red-50'}`}>
                        Remove Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Customers Tab ─── */
function CustomersTab({ dark, t }: { dark: boolean; t: ReturnType<typeof useTheme> }) {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: profiles } = await supabase.from('profiles').select('*').not('role', 'in', '("ADMIN","VENDOR")').order('created_at', { ascending: false });
        const { data: orders } = await supabase.from('apparel_orders').select('user_id');
        const orderCount: Record<string, number> = {};
        orders?.forEach(o => { orderCount[o.user_id] = (orderCount[o.user_id] || 0) + 1; });
        setCustomers((profiles || []).map(p => ({ ...p, orderCount: orderCount[p.id] || 0 })));
      } catch (e: any) { console.error(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = customers.filter(c =>
    !search || c.full_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className={`text-xl font-semibold ${t.text}`}>Customer Registry</h2>
          <p className={`text-sm mt-0.5 ${t.textMut}`}>{customers.length} registered customers</p>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className={`w-full sm:w-64 px-4 py-2 rounded-lg border text-sm outline-none transition-colors ${t.input}`}
        />
      </div>

      <div className={`rounded-xl border overflow-hidden ${t.card}`}>
        {loading ? (
          <div className={`flex items-center justify-center py-16 ${t.textDim}`}>
            <div className={`w-6 h-6 border-2 rounded-full animate-spin ${dark ? 'border-[#DFFF00]/20 border-t-[#DFFF00]' : 'border-[#1a1a18]/20 border-t-[#1a1a18]'}`} />
          </div>
        ) : filtered.length === 0 ? (
          <div className={`flex flex-col items-center py-16 ${t.textDim}`}>
            <Users className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-xs uppercase tracking-wider">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${t.border}`}>
                  {['Name', 'Email', 'Orders', 'Joined'].map(h => (
                    <th key={h} className={`px-5 py-3 text-left text-[10px] uppercase tracking-wider ${t.textDim}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className={`border-b transition-colors ${t.tableRow} ${i === filtered.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-5 py-3.5"><span className={`text-sm font-medium ${t.text}`}>{c.full_name || '—'}</span></td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.textMut}`}>{c.email}</span></td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-mono font-semibold ${c.orderCount! > 0 ? t.accentHl : t.textDim}`}>{c.orderCount}</span>
                    </td>
                    <td className="px-5 py-3.5"><span className={`text-xs ${t.textDim}`}>{new Date(c.created_at).toLocaleDateString('en-IN')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Nav items ─── */
const NAV_ITEMS: { id: TabId; label: string; icon: any; group: string }[] = [
  { id: 'overview',   label: 'Overview',        icon: LayoutDashboard, group: 'main' },
  { id: 'intake',     label: 'Intake Pipeline', icon: FileSearch,      group: 'ops' },
  { id: 'fleet',      label: 'Vendor Fleet',    icon: Truck,           group: 'ops' },
  { id: 'payout',     label: 'Split Payout',    icon: Banknote,        group: 'ops' },
  { id: 'vendors',    label: 'Vendors',         icon: UserCheck,       group: 'people' },
  { id: 'customers',  label: 'Customers',       icon: Users,           group: 'people' },
];

const TAB_COMPONENTS: Partial<Record<TabId, any>> = {
  intake: IntakePipeline,
  payout: PayoutMatrix,
  fleet:  VendorFleet,
};

/* ─── Main Dashboard ─── */
export function AdminDashboard() {
  const [activeTab,   setActiveTab]   = useState<TabId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark,        setDark]        = useState(true);
  const t = useTheme(dark);

  const handleTabChange = (tab: TabId) => { setActiveTab(tab); setSidebarOpen(false); };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`px-5 py-5 border-b ${t.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${t.accent} flex items-center justify-center`}>
              <Shield className={`w-5 h-5 ${t.accentT}`} />
            </div>
            <div>
              <h1 className={`text-[11px] font-bold tracking-[0.18em] uppercase ${t.text}`}>HYPERVAULT</h1>
              <p className={`text-[9px] tracking-[0.12em] uppercase mt-0.5 ${t.accentHl}`}>Admin Console</p>
            </div>
          </div>
          <button onClick={() => setDark(!dark)}
            className={`w-8 h-8 rounded-lg border ${t.border} flex items-center justify-center ${t.textMut} hover:${t.text} transition-colors`}>
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {[
          { group: 'main',   label: 'Dashboard' },
          { group: 'ops',    label: 'Operations' },
          { group: 'people', label: 'People' },
        ].map(({ group, label }) => (
          <div key={group}>
            <p className={`px-4 text-[9px] font-semibold uppercase tracking-[0.18em] mb-2 ${t.textDim}`}>{label}</p>
            <div className="space-y-1">
              {NAV_ITEMS.filter(n => n.group === group).map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button key={item.id} onClick={() => handleTabChange(item.id)}
                    className={`relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-150 text-[12px] font-medium tracking-[0.04em] ${isActive ? t.navActive : t.navIdle}`}>
                    {isActive && (
                      <motion.div layoutId="sidebar-active"
                        className={`absolute inset-0 rounded-xl ${dark ? 'bg-[#DFFF00]/[0.08] border border-[#DFFF00]/[0.15]' : 'bg-[#1a1a18]/[0.06] border border-[#1a1a18]/[0.1]'}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                    <item.icon className="relative w-4 h-4 flex-shrink-0" />
                    <span className="relative">{item.label}</span>
                    {isActive && <ChevronRight className="relative w-3 h-3 ml-auto opacity-40" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className={`px-3 py-3 border-t ${t.border} space-y-1`}>
        <div className={`flex items-center gap-2 px-4 py-2 ${t.textDim}`}>
          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${dark ? 'bg-[#DFFF00]' : 'bg-emerald-500'}`} />
          <span className="text-[10px] tracking-wider uppercase">System Online</span>
        </div>
        <button onClick={handleSignOut}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[12px] transition-all ${dark ? 'text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.06]' : 'text-red-500/60 hover:text-red-600 hover:bg-red-50'} border border-transparent`}>
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'overview')  return <OverviewTab dark={dark} t={t} />;
    if (activeTab === 'vendors')   return <VendorsTab dark={dark} t={t} />;
    if (activeTab === 'customers') return <CustomersTab dark={dark} t={t} />;
    const TabComponent = TAB_COMPONENTS[activeTab];
    if (TabComponent) return <TabComponent />;
    return null;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${t.bg}`}>
      {/* Mobile top bar */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 ${t.sidebar} border-b ${t.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl ${t.accent} flex items-center justify-center`}>
            <Shield className={`w-4 h-4 ${t.accentT}`} />
          </div>
          <p className={`text-[11px] font-bold tracking-[0.15em] uppercase ${t.text}`}>HYPERVAULT</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark(!dark)}
            className={`w-8 h-8 rounded-xl border ${t.border} flex items-center justify-center ${t.textMut}`}>
            {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-9 h-9 rounded-xl border ${t.border} flex items-center justify-center ${t.textMut}`}>
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile pill tabs */}
      <div className={`lg:hidden fixed top-[52px] left-0 right-0 z-40 flex gap-2 px-4 py-2.5 ${t.sidebar} border-b ${t.border} overflow-x-auto`} style={{ scrollbarWidth: 'none' }}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => handleTabChange(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap flex-shrink-0 transition-all border ${activeTab === item.id ? t.pillAct : t.pill}`}>
            <item.icon className="w-3 h-3" />
            {item.label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:block fixed left-0 top-0 bottom-0 w-[240px] ${t.sidebar} border-r ${t.border} z-50`}>
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50 ${t.sidebar} border-r ${t.border}`}>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="lg:ml-[240px] min-h-screen pt-[52px] lg:pt-0">
        <div className="lg:hidden h-[44px]" />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
              <div data-theme={dark ? 'dark' : 'light'} className={dark ? 'text-white' : 'text-[#1a1a18]'}>
                {renderContent()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
