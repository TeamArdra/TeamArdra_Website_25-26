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

/* ================= CURSOR TILT + REFRACTION ================= */
function useTilt(maxTilt = 22) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-50, 50], [-maxTilt, maxTilt]);

  const refractX = useTransform(x, [-50, 50], [-14, 14]);
  const refractY = useTransform(y, [-50, 50], [-14, 14]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 4);
    y.set((e.clientY - rect.top - rect.height / 2) / 4);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return {
    rotateX,
    rotateY,
    refractX,
    refractY,
    handleMouseMove,
    handleMouseLeave,
  };
}

export default function OurDrones() {
  const [selectedDrone, setSelectedDrone] = useState(null);

  const drones = [
    {
      key: "HEX",
      img: "/drone.png",
      size: "w-[19rem]",
      tilt: useTilt(22),
      variants: {
        hidden: { opacity: 0, x: -220, y: 90 },
        visible: {
          opacity: 1,
          x: 0,
          y: [0, -10, 0],
          transition: {
            x: { duration: 1.1, ease: "easeOut" },
            y: { delay: 1, duration: 4, repeat: Infinity },
          },
        },
      },
    },
    {
      key: "KUROGANE",
      img: "/kurogane.png",
      size: "w-[21rem]",
      tilt: useTilt(24),
      variants: {
        hidden: { opacity: 0, y: 340 },
        visible: {
          opacity: 1,
          y: [0, -12, 0],
          transition: {
            opacity: { duration: 0.6, delay: 0.4 },
            y: { delay: 1.4, duration: 4, repeat: Infinity },
          },
        },
      },
    },
    {
      key: "M.I.R.A.D",
      img: "/MIRAD.png",
      size: "w-[19rem]",
      tilt: useTilt(22),
      variants: {
        hidden: { opacity: 0, x: 220, y: 90 },
        visible: {
          opacity: 1,
          x: 0,
          y: [0, -10, 0],
          transition: {
            opacity: { duration: 0.6, delay: 0.8 },
            x: { duration: 1.1, delay: 0.8 },
            y: { delay: 1.8, duration: 4.5, repeat: Infinity },
          },
        },
      },
    },
  ];

  return (
    <section className="relative w-full bg-black py-40 overflow-hidden">

      {/* ================= TITLE ================= */}
      <div className="text-center mb-28">
        <h2 className="font-nico text-5xl tracking-widest text-white">
          [OUR DRONES]
        </h2>
      </div>

      {/* ================= DRONE CARDS ================= */}
      <div className="relative flex justify-center items-center gap-44">

        {drones.map((d) => (
          <div key={d.key} className="relative flex items-center justify-center">

            {/* Ring */}
            <div className="
              absolute
              w-[44rem] h-[44rem]
              rounded-full
              border-2 border-sky-400/60
              shadow-[0_0_140px_rgba(56,189,248,0.35)]
            " />

            {/* Cabinet */}
            <motion.div
              className="relative w-[28rem] h-[34rem] perspective-[1800px] z-10 cursor-pointer"
              style={{ rotateX: d.tilt.rotateX, rotateY: d.tilt.rotateY }}
              onMouseMove={d.tilt.handleMouseMove}
              onMouseLeave={d.tilt.handleMouseLeave}
              onClick={() => setSelectedDrone(DRONE_DATA[d.key])}
            >
              {/* Shell */}
              <div className="
                absolute inset-0
                rounded-[2.5rem]
                bg-gradient-to-br from-[#0b1220] to-[#05070d]
                border border-white/15
                shadow-[0_70px_160px_rgba(0,0,0,0.9)]
                flex items-center justify-center
              ">

                {/* Glass */}
                <div className="
                  relative w-[88%] h-[88%]
                  rounded-[2rem]
                  bg-[linear-gradient(135deg,rgba(120,180,255,0.32),rgba(60,130,200,0.18))]
                  backdrop-blur-2xl
                  border border-sky-400/40
                  shadow-[inset_0_0_50px_rgba(90,170,255,0.35)]
                  overflow-hidden
                  flex items-center justify-center
                ">
                  <h1 className="absolute top-8 text-white font-nico text-3xl tracking-widest z-20">
                    {d.key}
                  </h1>
                </div>

                {/* Base */}
                <div className="absolute -bottom-7 w-[78%] h-7 bg-gradient-to-b from-black/70 to-black rounded-b-2xl blur-sm" />
              </div>

              {/* Drone */}
              <motion.img
                src={d.img}
                alt={d.key}
                className={`absolute z-50 left-1/2 -translate-x-1/2 bottom-[20%] ${d.size}`}
                variants={d.variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
              />
            </motion.div>
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

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-3 bg-blue-700" />
    </section>
  );
}
