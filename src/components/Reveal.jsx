"use client";
import { useEffect, useRef } from "react";

/*
 * One IntersectionObserver shared by every <Reveal>. The animation itself is a
 * CSS transition (see .reveal in globals.css), so it runs on the compositor and
 * scrolling does no per-frame JavaScript work.
 */
let observer = null;
function getObserver() {
  if (!observer) {
    window.__revealReady = true; // read by the guard script in layout.js
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
  }
  return observer;
}

/**
 * Scroll-triggered reveal wrapper.
 * Animates in (once) when 15% of it enters the viewport.
 *
 * @param {"up"|"down"|"left"|"right"|"scale"} from  entry direction
 * @param {number} delay  stagger delay in seconds
 */
export default function Reveal({ children, from = "up", delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Section heading block: numbered eyebrow + accent label + gradient Orbitron H2.
 */
export function SectionTitle({
  label,
  title,
  index,
  align = "center",
  className = "",
}) {
  const isLeft = align === "left";
  const alignment = isLeft
    ? "text-left items-start"
    : "text-center items-center";

  // normalise the index into a zero-padded technical tag, e.g. "/ 01" -> "01"
  const tag = index ? index.replace(/[^\d]/g, "").padStart(2, "0") : null;

  return (
    <Reveal from="up" className={`flex flex-col ${alignment} gap-4 ${className}`}>
      <div
        className={`flex items-center gap-3 ${isLeft ? "" : "justify-center"}`}
      >
        {tag && (
          <span className="font-mono text-[var(--accent-2)] text-[0.7rem] tracking-[0.15em]">
            <span className="text-[var(--accent)]/50">[</span>
            &nbsp;{tag}&nbsp;
            <span className="text-[var(--accent)]/50">]</span>
          </span>
        )}
        <span className="h-px w-10 bg-gradient-to-r from-[var(--accent)] to-transparent" />
        {label && (
          <span className="font-mono text-[var(--text-secondary)] text-[0.7rem] sm:text-xs font-medium uppercase tracking-[0.25em]">
            {label}
          </span>
        )}
      </div>
      <h2 className="font-orbitron font-semibold uppercase text-3xl sm:text-4xl md:text-5xl tracking-wider gradient-text pb-1">
        {title}
      </h2>
    </Reveal>
  );
}
