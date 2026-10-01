"use client";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Reveal, { SectionTitle } from "@/components/Reveal";

// the details modal (and its animation code) loads only when it's first needed
const DroneModal = dynamic(() => import("@/components/DroneModal"), { ssr: false });

const DRONE_DATA = {
  HEX: {
    name: "HEX",
    image: "/drone.webp",
    imgScale: 1,
    chips: ["Autonomous", "Hexacopter", "8 kg Payload"],
    specs: [
      "35 min endurance",
      "22 m/s speed",
      "18 m/s wind resistance",
      "8 kg payload",
      "3 km range",
    ],
  },
  KUROGANE: {
    name: "KUROGANE",
    image: "/kurogane.webp",
    imgScale: 1.2,
    chips: ["Autonomous", "Vision Nav", "Competition"],
    specs: [
      "Autonomous quadcopter",
      "Vision-based navigation",
      "Competition-grade frame",
      "High stability platform",
      "Long endurance UAV",
    ],
  },
  "M.I.R.A.D": {
    name: "M.I.R.A.D",
    image: "/MIRAD.webp",
    imgScale: 1.35,
    chips: ["Modular", "ISR", "Rapid Deploy"],
    specs: [
      "Modular ISR drone",
      "Rapid deployment",
      "Extended range",
      "Mission adaptable",
    ],
  },
};

export default function OurDrones() {
  // undefined until the first "View Details" tap, so the modal code isn't
  // fetched up front; null afterwards keeps it mounted for the exit animation
  const [selectedDrone, setSelectedDrone] = useState();
  const drones = Object.values(DRONE_DATA);

  return (
    <section
      id="drones"
      className="relative w-full bg-black py-20 md:py-[120px] overflow-hidden"
    >
      {/* blueprint grid + aurora backdrop */}
      <div className="absolute inset-0 aurora" aria-hidden />
      <div className="absolute inset-0 blueprint-grid opacity-60" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionTitle index="/ 03" label="Engineered In-House" title="Our Drones" />

        <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {drones.map((drone, i) => (
            <Reveal
              key={drone.name}
              from={i === 0 ? "left" : i === 2 ? "right" : "up"}
              delay={i * 0.15}
              className="relative z-[1] hover:z-40"
            >
              <button
                type="button"
                onClick={() => setSelectedDrone(drone)}
                className="glass glass-hover group w-full h-full p-7 flex flex-col text-left"
              >
                {/* image (escapes the card and zooms over neighbours on hover) */}
                <span className="relative h-[260px] md:h-[200px] flex items-center justify-center mb-6 [overflow:visible]">
                  <Image
                    src={drone.image}
                    alt={`${drone.name} drone`}
                    width={760}
                    height={520}
                    style={{ "--rest-scale": drone.imgScale }}
                    className="drone-img max-h-[260px] md:max-h-[200px] w-auto object-contain origin-center group-hover:drop-shadow-[0_0_45px_rgba(30,111,255,0.7)] relative z-30"
                  />
                </span>

                {/* name */}
                <span className="block font-orbitron text-[var(--text-primary)] text-xl uppercase tracking-wider">
                  {drone.name}
                </span>

                {/* spec chips */}
                <span className="mt-4 flex flex-wrap gap-2">
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
                </span>

                {/* view details */}
                <span className="mt-auto pt-6 font-space text-sm uppercase tracking-[0.12em] text-[var(--accent-2)] group-hover:text-white transition-colors">
                  View Details →
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedDrone !== undefined && <DroneModal
        drone={selectedDrone}
        drones={drones}
        setDrone={setSelectedDrone}
        onClose={() => setSelectedDrone(null)}
      />}
    </section>
  );
}
