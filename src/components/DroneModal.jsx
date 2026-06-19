"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function DroneModal({ drone, drones, setDrone, onClose }) {
  const directionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const index = drone ? drones.findIndex((d) => d.name === drone.name) : -1;

  const go = (dir) => {
    if (index < 0) return;
    directionRef.current = dir;
    setDrone(drones[(index + dir + drones.length) % drones.length]);
  };

  useEffect(() => {
    if (!drone) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [drone]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {drone && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
          {/* backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            className="relative w-full max-w-5xl glass overflow-hidden"
            style={{ borderRadius: "24px" }}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.25}
            onDragEnd={(e, info) => {
              if (isMobile && info.offset.y > 120) onClose();
            }}
          >
            {/* close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* ===== IMAGE ===== */}
              <div className="relative flex items-center justify-center p-8 md:p-12 min-h-[260px] md:min-h-[480px] overflow-hidden">
                {/* accent glow + ring */}
                <div
                  className="absolute inset-0"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(circle at 50% 45%, rgba(30,111,255,0.22), transparent 65%)",
                  }}
                />
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full"
                  aria-hidden
                  style={{ border: "1px solid rgba(77,166,255,0.25)" }}
                />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={drone.name}
                    src={drone.image}
                    alt={drone.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="relative z-10 w-[80%] max-w-sm object-contain drop-shadow-[0_20px_60px_rgba(30,111,255,0.45)]"
                  />
                </AnimatePresence>
              </div>

              {/* ===== DETAILS ===== */}
              <div className="relative p-7 md:p-10 flex flex-col border-t md:border-t-0 md:border-l border-white/10">
                <span className="font-mono text-[var(--accent-2)] uppercase tracking-[0.2em] text-xs">
                  Team Ardra · UAV
                </span>

                <AnimatePresence mode="wait">
                  <motion.h2
                    key={drone.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-2 font-orbitron uppercase tracking-wider text-3xl md:text-4xl gradient-text pb-1"
                  >
                    {drone.name}
                  </motion.h2>
                </AnimatePresence>

                {/* chips */}
                {drone.chips && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {drone.chips.map((chip) => (
                      <span
                        key={chip}
                        className="font-space text-[0.7rem] uppercase tracking-[0.1em] text-[var(--text-secondary)] px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {/* specs */}
                <div className="mt-7 flex flex-col gap-3">
                  <p className="font-mono uppercase tracking-[0.18em] text-[0.7rem] text-[var(--text-secondary)]">
                    Specifications
                  </p>
                  {drone.specs.map((spec, i) => (
                    <motion.div
                      key={`${drone.name}-${spec}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <span className="font-orbitron text-[var(--accent)]/70 text-sm w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-inter text-[var(--text-primary)] text-sm md:text-base">
                        {spec}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* navigation */}
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => go(-1)}
                      aria-label="Previous drone"
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => go(1)}
                      aria-label="Next drone"
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <span className="font-mono text-xs tracking-[0.2em] text-[var(--text-secondary)]">
                    {String(index + 1).padStart(2, "0")} / {String(drones.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
