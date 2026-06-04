import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * ImageReveal — clip-path curtain reveal + slow parallax zoom on scroll.
 * Wrap an <img> (or any visual). The child receives its own slow upward drift
 * while the container reveals via an inset clip.
 */
export function ImageReveal({
  children,
  className,
  parallax = 60,
  zoom = 1.15,
}: {
  children: ReactNode;
  className?: string;
  parallax?: number;
  zoom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [zoom, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className={cn("overflow-hidden relative", className)}
    >
      <motion.div style={{ y, scale }} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
