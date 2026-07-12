"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HeroBackground from "@/components/HeroBackground";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // subtle parallax: drone drifts up & fades, content lifts as you scroll
  const droneY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const droneOpacity = useTransform(scrollYProgress, [0, 0.8], [0.9, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-svh w-full flex items-start md:items-center overflow-hidden bg-black noise"
    >
      {/* canvas "flight radar" background */}
      <HeroBackground />
      {/* vignette to keep hero text legible over the canvas */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 25% 50%, rgba(0,0,0,0.6), transparent 70%)",
        }}
      />

      {/* floating drone with scroll parallax */}
      <motion.div
        style={{ y: droneY, opacity: droneOpacity }}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-[55%] max-w-3xl"
      >
        <div className="animate-float">
          <Image
            src="/drone.png"
            alt="Team Ardra autonomous drone"
            width={900}
            height={600}
            priority
            className="w-full h-auto object-contain"
            style={{ filter: "drop-shadow(0 0 50px rgba(30,111,255,0.55))" }}
          />
        </div>
      </motion.div>

      {/* content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10 w-full pt-24"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-space text-[var(--text-secondary)] uppercase tracking-[0.2em] text-xs sm:text-sm mb-4 flex items-center gap-3"
          >
            <span className="inline-block h-px w-8 bg-[var(--accent)]/60" />
            SEDS VIT Vellore
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="relative font-orbitron font-bold uppercase leading-[0.95] tracking-[0.08em] text-[2.5rem] sm:text-6xl lg:text-7xl xl:text-[7rem]"
          >
            {/* glow layer */}
            <span
              aria-hidden
              className="absolute inset-0 blur-2xl opacity-40 text-[var(--accent)]"
            >
              Team Ardra
            </span>
            <span className="relative gradient-text">Team Ardra</span>
          </motion.h1>

          {/* tagline — scrolling ticker, wide enough that the whole phrase reads */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="mt-6 overflow-hidden w-full max-w-2xl border-y border-white/10 py-2.5"
          >
            <div className="flex w-max animate-marquee whitespace-nowrap">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-orbitron text-white uppercase tracking-[0.16em] text-base sm:text-lg mx-8 drop-shadow-[0_0_16px_rgba(30,111,255,0.4)]"
                >
                  Team Ardra · Throttling Towards Excellence ·
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="group font-space font-medium uppercase tracking-[0.12em] text-sm px-7 py-3 rounded text-white transition-all duration-300 hover:brightness-110"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 24px rgba(30,111,255,0.4)",
              }}
            >
              Explore <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#drones"
              className="font-space font-medium uppercase tracking-[0.12em] text-sm px-7 py-3 rounded border border-white/20 text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent-2)] transition-all duration-300"
            >
              Our Drones ↓
            </a>
          </motion.div>

        </div>
      </motion.div>

      {/* mobile-only drone — lower-centre so the radar sweep circles around it */}
      <motion.div
        className="md:hidden absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 z-[3] w-[90%] max-w-[360px] pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.55 }}
      >
        <div className="animate-float">
          <Image
            src="/drone.png"
            alt="Team Ardra autonomous drone"
            width={600}
            height={420}
            priority
            className="w-full h-auto object-contain"
            style={{ filter: "drop-shadow(0 0 35px rgba(30,111,255,0.55))" }}
          />
        </div>
      </motion.div>

      {/* live-coordinates HUD chip (VIT Vellore) */}
      <div
        className="absolute bottom-6 left-4 md:bottom-8 md:left-10 z-[6] flex items-center gap-2.5 md:gap-3 glass px-3 py-2 md:px-4 md:py-2.5"
        style={{ borderRadius: "12px" }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-2)] opacity-60 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </span>
        <div className="leading-tight">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-[var(--accent-2)]">
            VIT Vellore · Live
          </p>
          <p className="font-mono text-[0.72rem] tracking-wide text-[var(--text-primary)]">
            12.9692°&nbsp;N · 79.1559°&nbsp;E
          </p>
        </div>
      </div>

      {/* scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[var(--accent-2)] flex flex-col items-center gap-2"
      >
        <span className="font-space text-[0.6rem] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
          Scroll
        </span>
        <ChevronDown className="animate-bounce-chevron" size={28} />
      </a>
    </section>
  );
}
