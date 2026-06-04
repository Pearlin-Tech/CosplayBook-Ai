import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * ScanLine — horizontal glow sweep triggered when `trigger` changes.
 * Mounted once, sweeps top → bottom, fades out.
 */
export function ScanLine({ trigger }: { trigger: unknown }) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    setKey((k) => k + 1);
  }, [trigger]);

  return (
    <motion.div
      key={key}
      initial={{ y: "-10%", opacity: 0 }}
      animate={{ y: "110%", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1], times: [0, 0.15, 0.85, 1] }}
      className="pointer-events-none absolute inset-x-0 z-20 h-[40%]"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(212,255,0,0.05) 30%, rgba(212,255,0,0.5) 50%, rgba(212,255,0,0.05) 70%, transparent 100%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
