"use client";
import { useEffect } from "react";

// Infinite CSS animations that can't run on the compositor (the heading sheen
// animates background-position) or that move very wide layers (the marquees)
// keep costing work every frame even while scrolled out of view. Pause each one
// while it's off-screen; it resumes before it scrolls back in.
const SELECTOR = ".gradient-text, .animate-marquee, .animate-marquee-fast";

export default function PauseOffscreen() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("anim-paused", !e.isIntersecting);
      },
      { rootMargin: "150px 0px" }
    );
    document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
