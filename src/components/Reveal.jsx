"use client";
import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal wrapper.
 * Animates in when 15% enters the viewport.
 *
 * @param {"up"|"down"|"left"|"right"|"scale"|"blur"} from  entry style
 * @param {number} delay  stagger delay in seconds
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
  as = "div",
  amount = 0.15,
}) {
  const offset = 40;
  const initials = {
    up: { opacity: 0, y: offset },
    down: { opacity: 0, y: -offset },
    left: { opacity: 0, x: -offset },
    right: { opacity: 0, x: offset },
    scale: { opacity: 0, scale: 0.92 },
    blur: { opacity: 0, y: 24, filter: "blur(12px)" },
  };

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={initials[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
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
