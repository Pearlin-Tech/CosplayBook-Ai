import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
export type SessionUser = {
  name: string;
  email: string;
  initials: string;
  vault: string;
  phone: string;
  dob: string;
  gender: string;
  emailVerified: boolean;
  tier: string;
  joined: string;
};

const DEFAULT_USER: SessionUser = {
  name: "Aarav Verma",
  email: "aarav@studio.com",
  initials: "AV",
  vault: "Nº 0247",
  phone: "+91 98765 ••• 21",
  dob: "1996-12-04",
  gender: "Prefer not to say",
  emailVerified: true,
  tier: "Atelier",
  joined: "Mar 2025",
};

type Ctx = {
  user: SessionUser | null;
  loggedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  update: (patch: Partial<SessionUser>) => void;
};

const SessionContext = createContext<Ctx | null>(null);
const KEY = "hv:session";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(DEFAULT_USER);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === "null") setUser(null);
      else if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, user ? JSON.stringify(user) : "null");
  }, [user]);

  const signIn = useCallback(() => setUser(DEFAULT_USER), []);
  const navigate = useNavigate({ strict: false });
  const signOut = useCallback(() => {
    setUser(null);
    navigate({ to: "/login" });
  }, [navigate]);
  const update = useCallback(
    (patch: Partial<SessionUser>) => setUser((u) => (u ? { ...u, ...patch } : u)),
    [],
  );

  return (
    <SessionContext.Provider value={{ user, loggedIn: !!user, signIn, signOut, update }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const c = useContext(SessionContext);
  if (!c) throw new Error("useSession must be used within SessionProvider");
  return c;
}
