"use client";
import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

// `scale` normalises how big each mark reads inside its fixed box
const SPONSORS = [
  { src: "/Solidworks.png", name: "SolidWorks", scale: 1.35 },
  { src: "/anys.png", name: "Ansys", scale: 1.0 },
  { src: "/altium.png", name: "Altium", scale: 1.3 },
  { src: "/protoworks.png", name: "Protoworks", scale: 1.4 },
];

const COMPETITIONS = [
  { src: "/spros.png", name: "SPROS" },
  { src: "/cognizance.png", name: "Cognizance" },
  { src: "/Aerothon.png", name: "Aerothon" },
  { src: "/techfest.png", name: "Techfest" },
  { src: "/IROC.png", name: "IROC" },
];

// dark/detailed logos that disappear on the dark glass — set them on a light tile
// so they stay visible in their original colours
const TILE_LOGOS = new Set(["SPROS", "IROC", "Techfest"]);

// dark sponsor logos that vanish under grayscale+brightness (black stays black);
// render these as a white silhouette so the wordmark is legible on the dark glass
const DARK_SPONSORS = new Set(["Ansys", "Protoworks"]);

export default function CompsAndSpons() {
  // duplicate each list for seamless infinite marquees
  const sponsorRow = [...SPONSORS, ...SPONSORS];
  const compRow = [...COMPETITIONS, ...COMPETITIONS];

  // tap-to-reveal colour on touch devices (mirrors the desktop hover)
  const [activeSponsors, setActiveSponsors] = useState(() => new Set());
  const toggleSponsor = (name) =>
    setActiveSponsors((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  return (
    <section className="relative w-full bg-black py-20 md:py-[120px] overflow-hidden">
      <div className="absolute inset-0 aurora-soft" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        {/* ===== SPONSORS ===== */}
        <Reveal from="up" className="text-center">
          <h3 className="font-mono uppercase tracking-[0.25em] text-[var(--accent-2)]/80 text-xs">
            Our Sponsors &amp; Partners
          </h3>
        </Reveal>

        <div className="mt-10 relative overflow-hidden">
          {/* edge fades */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(90deg, #000, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(270deg, #000, transparent)" }}
          />

          <div className="flex w-max animate-marquee">
            {sponsorRow.map((s, i) => {
              const isDark = DARK_SPONSORS.has(s.name);
              const active = activeSponsors.has(s.name);
              return (
                <button
                  type="button"
                  key={`${s.name}-${i}`}
                  onClick={() => toggleSponsor(s.name)}
                  aria-label={`Show ${s.name}`}
                  className="glass mx-4 px-8 py-5 flex items-center justify-center shrink-0 cursor-pointer"
                  style={{ borderRadius: "9999px" }}
                >
                  {/* fixed-size box so every logo occupies the same footprint;
                      per-logo scale evens out the visual weight of each mark.
                      Dark logos are drawn as a soft grey silhouette (a white
                      silhouette at low opacity) so they stay faintly visible and
                      lift on tap/hover — same monochrome feel as the others. */}
                  <span className="flex items-center justify-center w-40 h-14 md:w-48 md:h-16 overflow-visible">
                    <Image
                      src={s.src}
                      alt={s.name}
                      width={260}
                      height={100}
                      style={{ transform: `scale(${s.scale})` }}
                      className={`max-h-full max-w-full w-auto h-auto object-contain transition-all duration-300 ${
                        isDark
                          ? active
                            ? "[filter:brightness(0)_invert(1)] opacity-90"
                            : "[filter:brightness(0)_invert(1)] opacity-50 hover:opacity-90"
                          : active
                          ? "grayscale-0 brightness-100"
                          : "grayscale brightness-150 hover:grayscale-0 hover:brightness-100"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===== COMPETITIONS (reverse-scrolling marquee) ===== */}
        <Reveal from="up" className="text-center mt-24">
          <h3 className="font-mono uppercase tracking-[0.25em] text-[var(--accent-2)]/80 text-xs">
            Competitions We&apos;ve Flown
          </h3>
        </Reveal>

        {/* py gives the hover-lift room so the card top isn't clipped */}
        <div className="mt-12 relative overflow-hidden py-5">
          {/* edge fades */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(90deg, #000, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
            style={{ background: "linear-gradient(270deg, #000, transparent)" }}
          />

          <div className="flex w-max animate-marquee" style={{ animationDirection: "reverse" }}>
            {compRow.map((c, i) => (
              <div
                key={`${c.name}-${i}`}
                className="glass glass-hover group w-56 md:w-64 mx-4 shrink-0 h-48 md:h-52 flex flex-col items-center justify-center gap-4 p-6"
              >
                {TILE_LOGOS.has(c.name) ? (
                  <div className="flex items-center justify-center bg-white rounded-xl px-4 py-3 h-20 md:h-24 transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={c.src}
                      alt={c.name}
                      width={180}
                      height={100}
                      className="max-h-full w-auto object-contain"
                    />
                  </div>
                ) : (
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={180}
                    height={100}
                    className="h-20 md:h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-primary)]">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
