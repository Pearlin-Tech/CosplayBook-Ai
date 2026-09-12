import { r as reactExports } from "../_libs/react.mjs";
const KEY = "hv:designs";
function useSavedDesigns() {
  const [items, setItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
  }, []);
  const persist = (next) => {
    setItems(next);
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  };
  const save = reactExports.useCallback(
    (d) => {
      const item = { ...d, id: `dsn_${Date.now()}`, savedAt: Date.now() };
      persist([item, ...items]);
      return item;
    },
    [items]
  );
  const remove = reactExports.useCallback((id) => persist(items.filter((i) => i.id !== id)), [items]);
  const clear = reactExports.useCallback(() => persist([]), []);
  return { items, save, remove, clear };
}
export {
  useSavedDesigns as u
};
