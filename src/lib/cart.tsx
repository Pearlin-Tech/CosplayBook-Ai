import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  config: string;
  price: number;
  qty: number;
  image: string;
};

type Ctx = {
  cart: CartItem[];
  add: (i: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = useCallback((i: CartItem) => {
    setCart((s) => {
      const ex = s.find((c) => c.id === i.id);
      if (ex) return s.map((c) => (c.id === i.id ? { ...c, qty: c.qty + i.qty } : c));
      return [...s, i];
    });
  }, []);
  const remove = useCallback((id: string) => setCart((s) => s.filter((c) => c.id !== id)), []);
  const setQty = useCallback(
    (id: string, qty: number) => setCart((s) => s.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c))),
    [],
  );
  const clear = useCallback(() => setCart([]), []);

  const count = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <CartContext.Provider value={{ cart, add, remove, setQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
