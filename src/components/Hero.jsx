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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Blue Circle */}
       <motion.div
        className="absolute z-0 h-[420px] w-[420px] rounded-full bg-blue-700/90"
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
          absolute top-[32%] left-[7.5%]
          text-[clamp(0.8rem,0.2vw,5rem)]
          font-ocr tracking-[0.2em]
          uppercase text-white z-20
        "
      >
        <span className="text-xl">Dream. Design. Do</span>
        <span className="relative left-[16%]">What We Do</span>
        <span className="relative left-[209%]">We Make It Fly</span>
      </p>

      {/* Year */}
      <p className="absolute top-[70%] right-0 rotate-[90deg] font-anton text-3xl z-20">
        [2018]
      </p>

      {/* Title */}
      <motion.h1
        className="
          relative z-10 font-anton text-white
          text-[clamp(4rem,20vw,19rem)]
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
        className="absolute z-20 w-[420px]"
        initial={{ y: 300, opacity: 0 }}
        animate={droneControls}
      />

      {/* YELLOW RIBBON */}
      <div
        className="
          absolute z-0 top-[35%] left-[-10%]
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
          absolute top-[60%] left-[-10%]
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
