"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const teamImages = [
  "/team/team1.jpeg",
  "/team/team2.jpeg",
  "/team/team3.jpeg",
  "/team/team4.jpeg",
  "/team/team5.jpeg",
  "/team/team6.jpeg",
  "/team/team7.jpeg",
  "/team/team8.jpeg",
  "/team/team9.jpeg",
];

export default function MeetTheTeam() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % teamImages.length);
    }, 4000); // 4 seconds per image

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-black py-32 overflow-hidden">

      {/* Section Title */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="font-nico text-5xl tracking-widest text-white">
          [MEET THE TEAM]
        </h2>
      </div>

      {/* Decorative Arcs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full border border-blue-700/30" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full border border-blue-700/30" />
      </div>

      {/* Rotating Image Frame */}
      <div className="relative z-10 flex justify-center">
        <div className="relative p-2 w-full max-w-[1500px] aspect-[16/9] overflow-hidden">

          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={teamImages[index]}
              alt="Team Ardra"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
          </AnimatePresence>

        </div>
      </div>

     {/* Ribbon: Throttling Towards Excellence */}
    <div className="absolute z-20 top-[87%] left-0 w-full rotate-[3deg]">
        <div className="w-[120%] -ml-[10%] bg-[#04115A] py-2 overflow-hidden">
            <motion.div
                className="flex gap-20 whitespace-nowrap px-8"
                animate={{ x: ["-10%", "10%"] }}
                transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
                }}
                >
                {Array.from({ length: 6 }).map((_, i) => (
                    <span
                        key={i}
                        className="font-nico text-white tracking-[0.35em] uppercase"
                    >
                Throttling Towards Excellence
                </span>
                ))}
            </motion.div>
        </div>
    </div>


      {/* Ribbon: team ardra. */}
    <div className="absolute z-20 top-[95%] left-0 w-full rotate-[-1deg]">
        <div className="w-[120%] -ml-[10%] bg-[#04115A] py-2 overflow-hidden">
             <motion.div
                className="flex gap-20 whitespace-nowrap px-8"
                animate={{ x: ["10%", "-10%"] }}
                transition={{
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <span
                        key={i}
                        className="font-ocr text-white tracking-[0.35em] lowercase"
                    >
                    Team Ardra
                    </span>
                ))}
            </motion.div>
        </div>
    </div>


    </section>
  );
}
