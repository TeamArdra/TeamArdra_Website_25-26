"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function DroneModal({
  drone,
  drones,
  setDrone,
  onClose,
}) {
  const directionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile only (NO effect on desktop)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!drone) return;

    function handleKey(e) {
      const index = drones.findIndex((d) => d.name === drone.name);

      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        directionRef.current = 1;
        setDrone(drones[(index + 1) % drones.length]);
      }

      if (e.key === "ArrowLeft") {
        directionRef.current = -1;
        setDrone(drones[(index - 1 + drones.length) % drones.length]);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [drone, drones, setDrone, onClose]);

  return (
    <AnimatePresence>
      {drone && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* FULL SCREEN PANEL */}
          <motion.div
            className="fixed inset-0 z-[1000]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            /* MOBILE ONLY: swipe down to close */
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (isMobile && info.offset.y > 120) {
                onClose();
              }
            }}
          >
            <div className="relative w-full h-full bg-[#03060c] text-sky-100 overflow-hidden isolate">

              {/* ================= HUD GRID ================= */}
              <motion.div
                className="absolute inset-0 z-[2] pointer-events-none"
                animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px)
                  `,
                  backgroundSize: "48px 48px",
                  maskImage:
                    "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.4) 60%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0.4) 60%, transparent 75%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(56,189,248,0.16), transparent 65%)",
                  }}
                />
              </motion.div>

              {/* ================= ADVANCED HUD ================= */}
              <div className="absolute inset-0 z-[3] pointer-events-none">
                {[
                  "top-4 left-4 md:top-8 md:left-8 border-t border-l",
                  "top-4 right-4 md:top-8 md:right-8 border-t border-r",
                  "bottom-4 left-4 md:bottom-8 md:left-8 border-b border-l",
                  "bottom-4 right-4 md:bottom-8 md:right-8 border-b border-r",
                ].map((pos, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-6 h-6 md:w-10 md:h-10 border-sky-400/40`}
                  />
                ))}

                <motion.div
                  className="hidden md:block absolute left-[26%] top-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-[320px] h-[320px] rounded-full border border-sky-400/35" />
                  <div className="absolute inset-[20%] rounded-full border border-sky-400/20" />
                </motion.div>

                <div className="hidden md:block absolute right-[18%] top-1/2 -translate-y-1/2 h-[60%] w-px bg-sky-400/30">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 w-3 h-px bg-sky-400/40"
                      style={{ top: `${i * 7}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* ================= HEADER ================= */}
              <header className="
                relative z-10
                flex items-center justify-center
                md:grid md:grid-cols-3
                px-6 md:px-16
                py-6 md:py-10
                border-b border-sky-400/20
              ">
                <div />

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={drone.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="
                      absolute md:static
                      left-1/2 -translate-x-1/2 md:translate-x-0
                      text-center
                      font-nico
                      text-3xl md:text-6xl
                      tracking-[0.2em] md:tracking-[0.25em]
                      text-sky-100
                    "
                  >
                    [{drone.name}]
                  </motion.h1>
                </AnimatePresence>

                {/* CLOSE BUTTON — DESKTOP ONLY */}
                <div className="hidden md:flex justify-end">
                  <button
                    onClick={onClose}
                    className="text-sky-300 hover:text-sky-400 transition"
                  >
                    <X size={28} className="md:size-10" />
                  </button>
                </div>
              </header>

              {/* ================= MAIN ================= */}
              <main className="relative z-10 flex flex-col md:grid md:grid-cols-2 h-[calc(100%-7rem)] md:h-[calc(100%-10rem)]">

                <div className="flex items-center justify-center py-8 md:py-0">
                  <motion.img
                    key={drone.name}
                    src={drone.image}
                    alt={drone.name}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[85%] max-w-xs md:max-w-4xl object-contain drop-shadow-[0_60px_120px_rgba(56,189,248,0.25)]"
                  />
                </div>

                <div className="flex items-start md:items-center px-6 md:px-24 pb-8 md:pb-0">
                  <div className="grid gap-6 md:gap-10 font-ocr uppercase tracking-widest text-sm md:text-xl w-full">
                    {drone.specs.map((spec, i) => (
                      <div
                        key={spec}
                        className="flex items-start gap-4 md:gap-8 border-l-2 border-sky-400/50 pl-4 md:pl-8"
                      >
                        <span className="font-nico text-sky-400/70 text-lg md:text-2xl min-w-[2rem]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sky-200">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </main>

              {/* ================= FOOTER ================= */}
              <footer className="relative z-10 py-4 md:py-6 text-center border-t border-sky-400/20 font-nico text-xs md:text-xl tracking-[0.3em] md:tracking-[0.4em] text-sky-300">
                ← / → NAVIGATE · ESC CLOSE
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
