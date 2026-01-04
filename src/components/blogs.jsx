"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Blogs() {
  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden py-20 bg-black">
      
      {/* TITLE */}
      <motion.h2
        className="text-white font-audiowide text-2xl md:text-4xl tracking-widest uppercase mb-16 z-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        [BLOGS]
      </motion.h2>

      {/* BACKGROUND GRID (Optional, matches your theme) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* CENTERED BLOG CARD */}
      <motion.div
        className="relative z-20 w-full max-w-md p-8 bg-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // FLOATING ANIMATION
        animate={{
            y: [0, -15, 0],
        }}
        // HOVER EFFECT
        whileHover={{
            scale: 1.05,
            boxShadow: "0 0 50px rgba(255,255,255,0.3)",
        }}
      >
        <Link href="/blog-post-link" className="block h-full w-full">
            <h3 className="font-ocr text-black text-xl md:text-2xl tracking-widest uppercase leading-relaxed">
                TITLE OF THE BLOG
            </h3>
        </Link>
      </motion.div>

      {/* RIBBON: THROTTLING TOWARDS EXCELLENCE */}
      <div className="absolute z-20 bottom-[10%] left-0 w-full rotate-[-2deg]">
        <div className="w-[120%] -ml-[10%] bg-[#FDF6C7] py-2 overflow-hidden border-y border-yellow-500/30">
          <motion.div
            className="flex gap-20 whitespace-nowrap px-8"
            animate={{ x: ["10%", "-10%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Duplicate the text for seamless looping */}
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="font-ocr text-black tracking-[0.2em] uppercase text-lg md:text-xl"
              >
                THROTTLING TOWARDS EXCELLENCE
              </span>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}