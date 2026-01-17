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
      {/* <p
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
      </p> */}

      {/* Year */}
      {/* <motion.p
        className="absolute top-[33%] right-[5%] font-anton text-3xl z-20 text-white origin-center"
        initial={{ opacity: 0, x: 20, rotate: -5 }}
        animate={{ opacity: 1, x: 0, rotate: [-5, 3, -5] }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          x: { duration: 1, delay: 0.5 },
          rotate: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          },
        }}
      >
        [2018]
      </motion.p> */}

      {/* Title */}
      <motion.h1
        className="
          relative z-50 font-anton text-white
          text-[12rem]
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

      {/* BLUE RIBBON */}
      <div
        className="
          absolute top-[20%] left-[-10%]
          w-[200%] rotate-[-10deg]
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
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              DREAM. DESIGN. DO.
            </span>
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              DREAM. DESIGN. DO.
            </span>
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              DREAM. DESIGN. DO.
            </span>
          </motion.div>
        </div>
      </div>
      {/* YELLOW RIBBON */}
      <div
        className="
          absolute z-0 top-[45%] left-[-10%]
          w-[200%] rotate-[-10deg]
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

      

    </section>
  );
}
