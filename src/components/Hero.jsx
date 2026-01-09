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
    <section className="relative min-h-screen w-full flex justify-center overflow-hidden">

      {/* Blue Circle */}
         <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 z-30 h-[420px] w-[420px] rounded-full bg-[#031680]"
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
      <p
        className="
          absolute top-[5%] left-[7.5%]
          text-[clamp(0.8rem,0.2vw,5rem)]
          font-ocr tracking-[0.2em]
          uppercase text-white z-20
        "
      >
        <span className="text-xl">Dream. Design. Do</span>
        <span className="relative left-[16%]">What We Do</span>
        <span className="relative left-[109%]">We Make It Fly</span>
      </p>

      {/* Year */}
      <p className="absolute top-[30%] right-[8%] rotate-[80deg] font-anton text-3xl z-20">
        [2018]
      </p>

      {/* Title */}
      <motion.h1
        className="
          relative z-50 font-anton text-white
          text-[14rem]
          tracking-widest text-center top-[33%]
        "
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 20 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        TEAM ARDRA
      </motion.h1>

      {/* Drone */}
      <motion.img
        src="/drone.png"
        alt="Drone"
        className="absolute z-70 w-[420px] top-[10%] left-1/2 -translate-x-1/2"
        initial={{ y: 700, opacity: 0 }}
        animate={droneControls}
      />

      {/* YELLOW RIBBON */}
      <div
        className="
          absolute z-0 top-[20%] left-[-10%]
          w-[200%] rotate-[-12deg]
          bg-yellow-100 py-2 overflow-hidden
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
          absolute top-[45%] left-[-10%]
          w-[200%] rotate-[-12deg]
          bg-[#04115A] py-2 overflow-hidden
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
