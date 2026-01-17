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

      {/* Blue Circle (no pulse) */}
         <motion.div
        className="absolute top-20 md:top-5 left-1/2 -translate-x-1/2 z-30 h-[12rem] w-[12rem] md:h-[20rem] md:w-[20rem] rounded-full bg-[#031680] flex items-center justify-center overflow-hidden"
        >
          {/* Rotating text that orbits inside the circle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            style={{ rotate: 0 }}
          >
            <svg viewBox="0 0 220 220" className="w-full h-full max-w-full max-h-full">
              <defs>
                <path id="text-circle" d="M110,110 m0,-85 a85,85 0 1,1 0,170 a85,85 0 1,1 0,-170" />
              </defs>
              <text className="font-nico fill-white text-[clamp(12px,1.4vw,20px)] tracking-[0.3em] uppercase" textAnchor="middle">
                <textPath href="#text-circle" startOffset="50%">
                  WE MAKE IT FLY • WE MAKE IT FLY
                </textPath>
              </text>
            </svg>
          </motion.div>
        </motion.div>


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
        className="relative z-50 font-anton text-white text-6xl md:text-[12rem] tracking-widest text-center top-[33%] md:top-[40%]"
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
          absolute top-[15%] left-[-10%]
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

          <div
        className="
          absolute top-[55%] left-[-10%]
          w-[200%] rotate-[-10deg]
          bg-[#f8f8e3] py-2 overflow-hidden
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
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
          </motion.div>
        </div>
      </div>
      

    </section>
  );
}
