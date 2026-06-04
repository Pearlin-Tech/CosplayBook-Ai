import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  config: string;
  price: number;
  qty: number;
  image: string;
};

type Store = {
  cart: CartItem[];
  add: (i: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useStore = create<Store>((set, get) => ({
  cart: [],
  add: (i) =>
    set((s) => {
      const existing = s.cart.find((c) => c.id === i.id);
      if (existing) {
        return { cart: s.cart.map((c) => (c.id === i.id ? { ...c, qty: c.qty + i.qty } : c)) };
      }
      return { cart: [...s.cart, i] };
    }),
  remove: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
  setQty: (id, qty) =>
    set((s) => ({ cart: s.cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)) })),
  clear: () => set({ cart: [] }),
  count: () => get().cart.reduce((a, b) => a + b.qty, 0),
  subtotal: () => get().cart.reduce((a, b) => a + b.price * b.qty, 0),
}));
