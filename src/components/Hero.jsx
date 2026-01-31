"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  const droneControls = useAnimation();

  useEffect(() => {
    droneControls
      .start({
        y: -10,
        opacity: 1,
        transition: {
          duration: 1.2,
          ease: "easeOut",
        },
      })
      .then(() => {
        droneControls.start({
          y: [-10, -20, -10],
          transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          },
        });
      });
  }, [droneControls]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden">

      {/* Blue Circle */}
       <motion.div
        className="absolute z-0 h-105 w-105 rounded-full bg-[#061045]"
        animate={{
            scale: [1, 1.05, 1],
        }}
        transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity,
        }}
        />


      {/* Micro Text */}
      

      {/* Year */}
      

      {/* Title */}
      <motion.h1
        className="
          relative z-10 font-anton text-white
          text-[clamp(6rem,17vw,17rem)]
          tracking-widest text-center
        "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        TEAM ARDRA
      </motion.h1>

      {/* Drone */}
      <motion.img
        src="/drone.png"
        alt="Drone"
        className="absolute z-20 w-105"
        initial={{ y: 300, opacity: 0 }}
        animate={droneControls}
      />

      {/* YELLOW RIBBON */}
      <div
        className="
          absolute z-0 top-[4%] left-[-10%]
          w-[200%] rotate-[-8deg]
          bg-[#f8f8e3] py-2 overflow-hidden
        "
      >
        <div className="w-max">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [-80, 80] }}
            transition={{
              duration: 14,
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <span className="font-nico text-2xl text-black tracking-[0.3em] uppercase">
              Throttling Towards Excellence
            </span>
            <span className="font-nico text-2xl text-black tracking-[0.3em] uppercase">
              Throttling Towards Excellence
            </span>
            <span className="font-nico text-2xl text-black tracking-[0.3em] uppercase">
              Throttling Towards Excellence
            </span>
          </motion.div>
        </div>
      </div>

      {/* BLUE RIBBON */}
      <div
        className="
          absolute z-0 top-[65%] left-[-10%]
          w-[200%] rotate-[-8deg]
          bg-[#04115a] py-2 overflow-hidden
        "
      >
        <div className="w-max">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: [80, -80] }}
            transition={{
              duration: 16,
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <span className="font-nico text-2xl text-amber-100 tracking-[0.3em] uppercase">
              Throttling Towards Excellence
            </span>
            <span className="font-nico text-2xl text-amber-100 tracking-[0.3em] uppercase">
              Throttling Towards Excellence
            </span>
            <span className="font-nico text-2xl text-amber-100 tracking-[0.3em] uppercase">
              Throttling Towards Excellence
            </span>
          </motion.div>
        </div>
      </div>

    </section>
  );
}