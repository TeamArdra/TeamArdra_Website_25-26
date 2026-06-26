"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_LINKS = [
  { name: "HOME", href: "#home" },
  { name: "BOARD", href: "#board" },
  { name: "OUR DRONES", href: "#drones" },
  { name: "ACHIEVEMENTS", href: "#achievements" },
  { name: "EVENTS & OUTREACH", href: "#events" },
  { name: "CONTACT US", href: "#contact" },
];

// section ids tracked for active-link highlighting
const SECTION_IDS = [
  "home",
  "about",
  "board",
  "drones",
  "achievements",
  "events",
  "contact",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // top scroll-progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // background opacity shift past the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scrollspy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // map the visible "about" section to the HOME link area; keep mapping simple
  const isActive = (href) => {
    const id = href.replace("#", "");
    if (id === "home") return active === "home" || active === "about";
    return active === id;
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[1000] transition-colors duration-300 border-b"
      style={{
        // near-opaque solid bg instead of a blurred backdrop — a fixed
        // backdrop-filter re-rasterises every scroll frame and stutters the page
        backgroundColor: scrolled ? "rgba(5,6,12,0.99)" : "rgba(5,6,12,0.95)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* animated sweeping sheen along the bottom border */}
      <span className="nav-sheen" aria-hidden />

      <div className="w-full px-4 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center shrink-0"
            aria-label="Team Ardra home"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="/logo.png"
              alt="Team Ardra logo"
              width={200}
              height={88}
              className="object-contain h-12 md:h-16 w-auto animate-glow-pulse"
              style={{ width: "auto" }}
              priority
            />
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`font-space text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap ${
                    isActive(link.href)
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--accent-2)]"
                  }`}
                >
                  {link.name}
                </a>
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* right side: SEDS badge (all sizes) + mobile toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://sedsvit.in"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Image
                src="/seds_1.jpeg"
                alt="SEDS VIT"
                width={240}
                height={78}
                className="object-contain h-10 md:h-14 w-auto rounded"
                style={{ width: "auto" }}
              />
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden text-[var(--text-primary)] p-1.5"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* scroll-progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] origin-left"
        style={{
          scaleX: progress,
          width: "100%",
          background:
            "linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent))",
          boxShadow: "0 0 10px rgba(30,111,255,0.6)",
        }}
        aria-hidden
      />

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: "rgba(10,10,15,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <motion.ul
              className="flex flex-col px-6 py-6 gap-5"
              initial="closed"
              animate="open"
              transition={{ staggerChildren: 0.06 }}
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block font-space text-sm uppercase tracking-[0.12em] ${
                      isActive(link.href)
                        ? "text-[var(--accent-2)]"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
