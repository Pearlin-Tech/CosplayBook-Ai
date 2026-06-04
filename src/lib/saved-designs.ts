import { useEffect, useState, useCallback } from "react";

export type SavedDesign = {
  id: string;
  garmentId: string;
  garmentName: string;
  colorName: string;
  colorHex: string;
  materialName: string;
  size: string;
  placement: string;
  text: string;
  printMethod: string;
  price: number;
  thumb: string;
  savedAt: number;
};

const KEY = "hv:designs";

export function useSavedDesigns() {
  const [items, setItems] = useState<SavedDesign[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (next: SavedDesign[]) => {
    setItems(next);
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  };

  const save = useCallback(
    (d: Omit<SavedDesign, "id" | "savedAt">) => {
      const item: SavedDesign = { ...d, id: `dsn_${Date.now()}`, savedAt: Date.now() };
      persist([item, ...items]);
      return item;
    },
    [items],
  );
  const remove = useCallback((id: string) => persist(items.filter((i) => i.id !== id)), [items]);
  const clear = useCallback(() => persist([]), []);

  return { items, save, remove, clear };
}
