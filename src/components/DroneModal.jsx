"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function DroneModal({
  drone,
  drones,
  setDrone,
  onClose,
}) {
  const directionRef = useRef(0);

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
          >
            {/* 🔑 isolate enables HUD blending */}
            <div className="relative w-full h-full bg-[#03060c] text-sky-100 overflow-hidden isolate">
                {/* ================= HUD GRID OVERLAY ================= */}
                <motion.div
                    className="absolute inset-0 z-[2] pointer-events-none"
                    animate={{ backgroundPosition: ["0px 0px", "120px 120px"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
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
                {/* Central HUD glow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(circle at center, rgba(56,189,248,0.16), transparent 65%)",
                        }}
                    />
                </motion.div>
{/* ================= END HUD GRID ================= */}
                {/* ================= ADVANCED HUD ELEMENTS ================= */}
<div className="absolute inset-0 z-[3] pointer-events-none">

  {/* ===== Corner HUD Brackets ===== */}
  {[
    "top-8 left-8 border-t border-l",
    "top-8 right-8 border-t border-r",
    "bottom-8 left-8 border-b border-l",
    "bottom-8 right-8 border-b border-r",
  ].map((pos, i) => (
    <div
      key={i}
      className={`absolute ${pos} w-10 h-10 border-sky-400/40`}
    />
  ))}

  {/* ===== Subtle Noise Shimmer ===== */}
  <div
    className="absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"4\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.4\"/></svg>')",
    }}
  />

  {/* ===== Target Reticle (center-left) ===== */}
  <motion.div
    className="absolute left-[26%] top-1/2 -translate-x-1/2 -translate-y-1/2"
    animate={{ rotate: 360 }}
    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
  >
    <div className="w-[320px] h-[320px] rounded-full border border-sky-400/35" />
    <div className="absolute inset-[20%] rounded-full border border-sky-400/20" />
  </motion.div>

  {/* ===== Target Lock Pulse ===== */}
  <motion.div
    className="absolute left-[26%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-sky-400/40"
    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* ===== Altitude / Telemetry Ticks ===== */}
  <div className="absolute right-[18%] top-1/2 -translate-y-1/2 h-[60%] w-px bg-sky-400/30">
    {Array.from({ length: 14 }).map((_, i) => (
      <div
        key={i}
        className="absolute left-0 w-3 h-px bg-sky-400/40"
        style={{ top: `${i * 7}%` }}
      />
    ))}
  </div>

</div>
{/* ================= END ADVANCED HUD ================= */}


              {/* HEADER */}
              <header className="relative z-10 grid grid-cols-3 items-center px-16 py-10 border-b border-sky-400/20">
                <div />

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={drone.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="text-center font-nico text-6xl tracking-[0.25em] text-sky-100"
                  >
                    [{drone.name}]
                  </motion.h1>
                </AnimatePresence>

                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="text-sky-300 hover:text-sky-400 transition"
                  >
                    <X size={40} />
                  </button>
                </div>
              </header>

              {/* MAIN */}
              <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-[calc(100%-10rem)]">

                {/* LEFT : DRONE */}
                <div className="flex items-center justify-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={drone.name}
                      src={drone.image}
                      alt={drone.name}
                      initial={{
                        opacity: 0,
                        x: directionRef.current * 60,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -14, 0],
                      }}
                      exit={{
                        opacity: 0,
                        x: -directionRef.current * 60,
                      }}
                      transition={{
                        opacity: { duration: 0.25 },
                        x: { duration: 0.25, ease: "easeOut" },
                        y: {
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className="
                        relative z-10
                        w-[80%] max-w-4xl
                        object-contain
                        drop-shadow-[0_80px_140px_rgba(56,189,248,0.25)]
                      "
                    />
                  </AnimatePresence>
                </div>

                {/* RIGHT : SPECS */}
                <div className="relative flex items-center px-24 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={drone.name}
                      initial={{
                        opacity: 0,
                        x: directionRef.current * 40,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: -directionRef.current * 40,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative z-10 grid gap-10 font-ocr uppercase tracking-widest text-xl w-full"
                    >
                      {drone.specs.map((spec, i) => (
                        <motion.div
                          key={spec}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                          className="
                            flex items-start gap-8
                            border-l-2 border-sky-400/50
                            pl-8
                          "
                        >
                          <span className="font-nico text-sky-400/70 text-2xl min-w-[3rem]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sky-200">
                            {spec}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>

              {/* FOOTER */}
              <footer className="relative z-10 py-6 text-center border-t border-sky-400/20 font-nico text-xl tracking-[0.4em] text-sky-300">
                ← / → NAVIGATE · ESC CLOSE · WE MAKE IT FLY
              </footer>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
