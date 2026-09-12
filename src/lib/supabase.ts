import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: any;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('⚠️ Missing Supabase env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Running in fallback mode.');
  
  // Create a safe dummy client that does not crash synchronously
  const createChainableMock = (): any => {
    return new Proxy(() => {}, {
      get: (target, prop) => {
        if (prop === 'then') {
          return (resolve: any) => resolve({ data: null, error: new Error('Supabase is unavailable (missing environment variables)') });
        }
        return createChainableMock();
      },
      apply: () => {
        return createChainableMock();
      }
    });
  };

  client = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'auth') {
        return {
          getSession: async () => ({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: async () => { throw new Error('Supabase is unavailable (missing environment variables)'); },
          signUp: async () => { throw new Error('Supabase is unavailable (missing environment variables)'); },
          signOut: async () => ({ error: null })
        };
      }
      return createChainableMock();
    }
  });
}

export const supabase = client;
