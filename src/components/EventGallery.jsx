"use client";
import Image from "next/image";
import Reveal, { SectionTitle } from "@/components/Reveal";

const EVENTS = [
  { title: "Outreach @ Takshilah School", src: "/takshilah.png" },
  { title: "GRAVITAS 2025", src: "/gravitas.png" },
  { title: "Star Party", src: "/Starparty.png" },
  { title: "ASTSF 2025", src: "/ASTSF.png" },
];

export default function EventGallery() {
  return (
    <section id="events" className="relative w-full bg-black py-20 md:py-[120px] overflow-hidden noise">
      <div className="absolute inset-0 aurora" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionTitle index="/ 05" label="Beyond The Build" title="Events & Outreach" />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {EVENTS.map((ev, i) => (
            <Reveal key={ev.title} from="up" delay={i * 0.1}>
              <div className="glass glass-hover overflow-hidden h-full">
                {/* contain on a dark panel so the whole photo is visible (not cropped) */}
                <div className="relative w-full h-64 bg-[#06080f]">
                  <Image
                    src={ev.src}
                    alt={ev.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-space font-bold text-[var(--text-primary)] text-lg">
                    {ev.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* marquee banner */}
      <div className="relative z-10 mt-20 overflow-hidden border-y border-white/10 py-4">
        <div className="flex w-max animate-marquee-fast">
          {[0, 1].map((g) => (
            <div key={g} className="flex shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={`${g}-${i}`}
                  className="font-orbitron text-white uppercase tracking-[0.25em] text-sm md:text-base mx-6"
                >
                  Team Ardra · Throttling Towards Excellence ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
