"use client";
import { useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const FOCUSABLE =
  'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function DroneModal({ drone, drones, setDrone, onClose }) {
  const titleId = useId();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const open = Boolean(drone);

  const index = drone ? drones.findIndex((d) => d.name === drone.name) : -1;

  const go = (dir) => {
    if (index < 0) return;
    setDrone(drones[(index + dir + drones.length) % drones.length]);
  };

  // while open: lock page scroll and focus Close; on close, undo both and
  // return focus to the card that opened the modal
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    const body = document.body.style;
    const prev = [body.overflow, body.paddingRight];
    // pad by the scrollbar width so the page doesn't jump sideways
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.overflow = "hidden";
    if (scrollbar) body.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus({ preventScroll: true });
    // phone back gesture / button closes the modal instead of leaving the site
    window.history.pushState({ droneModal: true }, "");
    const onPop = () => onClose();
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // closed via the UI: drop the history entry we added
      if (window.history.state?.droneModal) window.history.back();
      [body.overflow, body.paddingRight] = prev;
      opener?.focus?.({ preventScroll: true });
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // keyboard: Esc closes, arrows switch drones, Tab stays inside the dialog
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key !== "Tab" || !panelRef.current) return;
      const els = panelRef.current.querySelectorAll(FOCUSABLE);
      const first = els[0];
      const last = els[els.length - 1];
      const inside = panelRef.current.contains(document.activeElement);
      if (!inside || (e.shiftKey && document.activeElement === first)) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
            aria-hidden="true"
            className="absolute inset-0 bg-black/90 md:bg-black/85 md:backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-5xl glass overflow-hidden"
            // transition:none — .glass's CSS transform transition would smear framer's animation
            style={{ borderRadius: "24px", background: "rgba(12,14,22,0.96)", transition: "none" }}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* close (pinned while the content scrolls) */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-colors"
              style={{ background: "rgba(10,12,20,0.85)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <X size={20} />
            </button>

            {/* scrolls inside the panel when the screen is shorter than the content */}
            <div className="max-h-[calc(100svh-2rem)] sm:max-h-[calc(100svh-3rem)] overflow-y-auto overscroll-contain">
              <div className="grid md:grid-cols-2">
                {/* ===== IMAGE ===== */}
                <div className="relative flex items-center justify-center p-6 md:p-12 min-h-[230px] md:min-h-[480px] overflow-hidden">
                  {/* accent glow + ring */}
                  <div
                    className="absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(circle at 50% 45%, rgba(30,111,255,0.22), transparent 65%)",
                    }}
                  />
                  {/* sized to the viewport's shorter axis so it never gets clipped */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(56vw,15rem)] md:w-[78%] aspect-square rounded-full"
                    aria-hidden
                    style={{ border: "1px solid rgba(77,166,255,0.25)" }}
                  />
                  {/* gentle CSS float (compositor) around the framer entrance */}
                  <div className="relative z-10 w-[80%] max-w-[17rem] md:max-w-sm animate-float-sm">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={drone.name}
                        src={drone.image}
                        alt={`${drone.name} drone`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="w-full object-contain drop-shadow-[0_20px_60px_rgba(30,111,255,0.45)]"
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* ===== DETAILS ===== */}
                <div className="relative p-6 md:p-10 flex flex-col border-t md:border-t-0 md:border-l border-white/10">
                  <span className="font-mono text-[var(--accent-2)] uppercase tracking-[0.2em] text-xs">
                    Team Ardra · UAV
                  </span>

                  {/* title, chips and specs switch together with the image */}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={drone.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h2
                        id={titleId}
                        className="mt-2 font-orbitron uppercase tracking-wider text-3xl md:text-4xl gradient-text pb-1"
                      >
                        {drone.name}
                      </h2>

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
                      <div className="mt-7 flex flex-col gap-3 min-h-[10.5rem]">
                        <p className="font-mono uppercase tracking-[0.18em] text-[0.7rem] text-[var(--text-secondary)]">
                          Specifications
                        </p>
                        {drone.specs.map((spec, i) => (
                          <div key={spec} className="flex items-center gap-3">
                            <span className="font-orbitron text-[var(--accent)]/70 text-sm w-6 shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-inter text-[var(--text-primary)] text-sm md:text-base">
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* navigation */}
                  <div className="mt-auto pt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous drone"
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next drone"
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors"
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
