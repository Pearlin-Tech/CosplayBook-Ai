import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { supabase } from './lib/supabase';
import { Shield, Mail, Lock, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';

export function AuthGateway() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, phone_number: phone } },
        });
        if (error) throw error;

        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            email,
            full_name: fullName,
            phone_number: phone,
            role: 'CUSTOMER',
          });
        }

        alert('Account created! You can now log in.');
        setIsSignUp(false);

      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        let role = '';
        for (let i = 0; i < 3; i++) {
          const { data: p } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle();
          if (p?.role) { role = String(p.role).toUpperCase(); break; }
          await new Promise(r => setTimeout(r, 600));
        }

        console.log('Final role:', role);
        if (role === 'ADMIN')       navigate({ to: '/admin' });
        else if (role === 'VENDOR') navigate({ to: '/vendor' });
        else                        navigate({ to: '/' });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] flex items-center justify-center p-4 antialiased selection:bg-[#DFFF00]/30 selection:text-white">
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md shadow-2xl">

        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#DFFF00]/10 flex items-center justify-center border border-[#DFFF00]/20 mb-4">
            <Shield className="w-5 h-5 text-[#DFFF00]" />
          </div>
          <h2 className="text-xl font-bold font-mono tracking-tight text-white">
            {isSignUp ? 'CREATE_CREATOR_LEDGER' : 'CORE_NETWORK_GATEWAY'}
          </h2>
          <p className="text-zinc-500 font-mono text-[10px] mt-1 uppercase tracking-widest">
            {isSignUp ? 'Establish platform identity keys' : 'Secure Vault Authentication Protocol'}
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-red-400 font-mono text-[10px] uppercase tracking-wide">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleAuthentication} className="space-y-4">
          {isSignUp && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Identity Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tony Stark"
                    className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-[#DFFF00]/50 transition-colors" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Comms Link (Phone)</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-[#DFFF00]/50 transition-colors" />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Secure Email Ledger</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@domain.com"
                className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-[#DFFF00]/50 transition-colors" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Cryptographic Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white/[0.01] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-mono text-white placeholder-zinc-700 focus:outline-none focus:border-[#DFFF00]/50 transition-colors" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-white text-[#08080A] font-mono font-bold text-xs uppercase py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'EXECUTING...' : isSignUp ? 'INITIALIZE_ACCOUNT' : 'REQUEST_SYSTEM_ACCESS'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
            className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest hover:text-[#DFFF00] transition-colors">
            {isSignUp ? 'Already mapped? Request Sign-In' : 'New Identity? Initialize Onboarding Grid'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button onClick={() => navigate({ to: '/' })}
            className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest hover:text-zinc-400 transition-colors">
            ← Browse as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
