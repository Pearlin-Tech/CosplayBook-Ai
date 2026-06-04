import { motion, useMotionValue, useSpring } from "framer-motion";
import { forwardRef, ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  radius?: number;
  strength?: number;
  as?: "button" | "div" | "a";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
};

/**
 * MagneticButton — pointer attraction within `radius` px.
 * Spring-eased translation, plus subtle inner shimmer on hover.
 */
export const MagneticButton = forwardRef<HTMLDivElement, Props>(function MagneticButton(
  { children, className, radius = 90, strength = 0.35, onClick, type },
  ref,
) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = localRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const r = Math.max(rect.width, rect.height) / 2 + radius;
    if (dist < r) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={(el) => {
        localRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn("inline-block will-change-transform", className)}
    >
      <motion.div style={{ x: useSpring(x, { stiffness: 150, damping: 15 }), y: useSpring(y, { stiffness: 150, damping: 15 }) }}>
        {children}
      </motion.div>
      {type === "submit" && <button type="submit" className="sr-only" />}
    </motion.div>
  );
});
