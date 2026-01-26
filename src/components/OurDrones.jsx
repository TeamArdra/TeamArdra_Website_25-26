"use client";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import DroneModal from "@/components/DroneModal";

/* ================= DRONE DATA ================= */
const DRONE_DATA = {
  HEX: {
    name: "HEX",
    image: "/drone.png",
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
    image: "/kurogane.png",
    specs: [
      "Autonomous hexacopter",
      "Vision-based navigation",
      "Competition-grade frame",
      "High stability platform",
      "Long endurance UAV",
    ],
  },
  "M.I.R.A.D": {
    name: "M.I.R.A.D",
    image: "/MIRAD.png",
    specs: [
      "Modular ISR drone",
      "Rapid deployment",
      "Extended range",
      "Mission adaptable",
    ],
  },
};

/* ================= CURSOR TILT ================= */
function useTilt(maxTilt = 22) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-50, 50], [-maxTilt, maxTilt]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 4);
    y.set((e.clientY - rect.top - rect.height / 2) / 4);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave };
}

export default function OurDrones() {
  const [selectedDrone, setSelectedDrone] = useState(null);

  const drones = [
    { key: "HEX", img: "/drone.png", size: "w-[19rem]", tilt: useTilt(22) },
    { key: "KUROGANE", img: "/kurogane.png", size: "w-[21rem]", tilt: useTilt(24) },
    { key: "M.I.R.A.D", img: "/MIRAD.png", size: "w-[19rem]", tilt: useTilt(22) },
  ];

  return (
    <section className="relative w-full bg-black py-28 md:py-40 overflow-hidden">

      {/* ================= TITLE ================= */}
      <div className="text-center mb-20 md:mb-28">
        <h2 className="font-nico text-4xl md:text-5xl tracking-widest text-white">
          [OUR DRONES]
        </h2>
      </div>

      {/* ================= DESKTOP LAYOUT (UNCHANGED) ================= */}
      <div className="relative hidden md:flex justify-center items-center gap-44">
        {drones.map((d) => (
          <DroneCard key={d.key} d={d} setSelectedDrone={setSelectedDrone} />
        ))}
      </div>

      {/* ================= MOBILE CAROUSEL ================= */}
      <div
        className="
          md:hidden
          relative
          overflow-x-auto
          flex
          snap-x snap-mandatory
          gap-6
          px-[calc((100vw-18rem)/2)]
          scrollbar-none
        "
      >
        {drones.map((d) => (
          <div
            key={d.key}
            className="shrink-0 snap-center flex justify-center"
          >
            <DroneCard
              d={d}
              setSelectedDrone={setSelectedDrone}
              mobile
            />
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <DroneModal
        drone={selectedDrone}
        drones={Object.values(DRONE_DATA)}
        setDrone={setSelectedDrone}
        onClose={() => setSelectedDrone(null)}
      />
    </section>
  );
}

/* ================= DRONE CARD ================= */
function DroneCard({ d, setSelectedDrone, mobile = false }) {
  return (
    <div className="relative flex items-center justify-center">

      {/* Ring */}
      <div
        className={`
          absolute rounded-full
          ${mobile
            ? "w-[22rem] h-[22rem]"
            : "w-[44rem] h-[44rem]"}
          border border-sky-400/50
          shadow-[0_0_120px_rgba(56,189,248,0.35)]
        `}
      />

      {/* Cabinet */}
      <motion.div
        className={`
          relative z-10 cursor-pointer
          ${mobile ? "w-[18rem] h-[22rem]" : "w-[28rem] h-[34rem]"}
          perspective-[1800px]
        `}
        style={{ rotateX: d.tilt.rotateX, rotateY: d.tilt.rotateY }}
        onMouseMove={d.tilt.handleMouseMove}
        onMouseLeave={d.tilt.handleMouseLeave}
        onClick={() => setSelectedDrone(DRONE_DATA[d.key])}
      >
        <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-[#0b1220] to-[#05070d] border border-white/15 flex items-center justify-center">
          <div className="relative w-[88%] h-[88%] rounded-[1.8rem] bg-[linear-gradient(135deg,rgba(120,180,255,0.32),rgba(60,130,200,0.18))] backdrop-blur-2xl border border-sky-400/40 flex items-center justify-center">
            <h1 className="absolute top-6 text-white font-nico text-xl tracking-widest">
              {d.key}
            </h1>
          </div>
        </div>

        {/* Drone Image */}
        <img
          src={d.img}
          alt={d.key}
          className={`absolute left-1/2 -translate-x-1/2 bottom-[18%] ${mobile ? "w-48" : d.size}`}
        />
      </motion.div>
    </div>
  );
}
