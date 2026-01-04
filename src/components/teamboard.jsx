"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";

// Mock Data
const TEAM_MEMBERS = [
  { id: 1, name: "MEMBER ONE" },
  { id: 2, name: "MEMBER TWO" },
  { id: 3, name: "MEMBER THREE" },
  { id: 4, name: "MEMBER FOUR" },
  { id: 5, name: "MEMBER FIVE" },
];

export default function TeamBoard() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate every 3 seconds (unless paused/dragging)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  // Handlers to cycle through cards
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  // Drag Logic: Detect swipe direction
  const onDragEnd = (event, info) => {
    const swipeThreshold = 50;
    // If dragged Left (< -50), go Next
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } 
    // If dragged Right (> 50), go Prev
    else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
    // Resume auto-play after drag
    setIsPaused(false);
  };

  // Helper: Position calculation with WIDER spacing
  const getCardStyle = (index) => {
    const total = TEAM_MEMBERS.length;
    let distance = (index - activeIndex + total) % total;
    if (distance > 2) distance -= total; // Normalize to -2, -1, 0, 1, 2

    // 1. CENTER CARD
    if (distance === 0) {
      return {
        x: 0,
        scale: 1.1, // Slightly larger center
        zIndex: 50,
        opacity: 1,
        rotateY: 0,
        bg: "#04115A",
      };
    }
    // 2. IMMEDIATE NEIGHBORS (Wider Spacing)
    else if (Math.abs(distance) === 1) {
      return {
        x: distance * 380, // INCREASED from 220 to 400
        scale: 0.85,
        zIndex: 30,
        opacity: 0.9,
        rotateY: distance > 0 ? -15 : 15,
        bg: "#2563eb", // Bright Blue
      };
    }
    // 3. FAR NEIGHBORS (Far Edges)
    else {
      return {
        x: distance * 340, // Tucked slightly behind neighbors
        scale: 0.6,
        zIndex: 10,
        opacity: 0.4,
        rotateY: distance > 0 ? -30 : 30,
        bg: "#04115A",
      };
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20">
      
      {/* HEADER */}
      <motion.h2
        className="text-white font-audiowide text-2xl md:text-4xl tracking-widest uppercase mb-4 z-20 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        [TEAM BOARD]
      </motion.h2>

      <motion.p className="text-white font-ocr text-sm md:text-xl tracking-[0.2em] mb-12 z-20 pointer-events-none">
        position
      </motion.p>

      {/* SVG BACKGROUND LINES */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none">
           <path d="M0,300 L300,200 L600,100 L900,200 L1200,300" stroke="#0ea5e9" strokeWidth="1" fill="none" opacity="0.4" />
           <line x1="600" y1="100" x2="600" y2="600" stroke="#0ea5e9" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* INTERACTIVE DRAG AREA */}
      <motion.div 
        className="relative z-10 flex items-center justify-center h-[500px] w-full max-w-[90%] perspective-1000 cursor-grab active:cursor-grabbing"
        
        // ENABLE DRAGGING
        drag="x" 
        dragConstraints={{ left: 0, right: 0 }} // Snap back effect
        dragElastic={0.05} // Stiff resistance
        onDragStart={() => setIsPaused(true)}
        onDragEnd={onDragEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {TEAM_MEMBERS.map((member, index) => {
          const style = getCardStyle(index);
          const isCenter = style.zIndex === 50;

          return (
            <motion.div
              key={member.id}
              className={`absolute w-64 h-80 md:w-80 md:h-96 rounded-3xl border border-blue-500/30 flex flex-col items-center justify-center shadow-lg backdrop-blur-sm transition-colors duration-500`}
              
              // ANIMATE POSITION
              animate={{
                x: style.x,
                scale: style.scale,
                zIndex: style.zIndex,
                opacity: style.opacity,
                rotateY: style.rotateY,
                backgroundColor: style.bg,
                boxShadow: isCenter 
                    ? "0 0 50px rgba(4,17,90,0.8)" 
                    : "0 0 10px rgba(0,0,0,0.5)"
              }}
              
              // HOVER STYLES (Only when hovering the specific card)
              whileHover={{
                scale: style.scale * 1.05,
                borderColor: "#38bdf8",
                boxShadow: "0 0 40px rgba(56, 189, 248, 0.6)",
              }}

              transition={{
                duration: 0.6,
                ease: "easeInOut", // Snappy transition
              }}
            >
              {/* IMAGE PLACEHOLDER */}
              <div className="w-full h-full relative">
                 {/* <img src="..." className="object-cover rounded-3xl opacity-80" /> */}
              </div>

              {/* NAME LABEL */}
              <motion.div 
                className="absolute bottom-8 w-full text-center pointer-events-none"
                animate={{ opacity: isCenter ? 1 : 0 }} 
                transition={{ duration: 0.3 }}
              >
                 <p className="font-ocr text-white text-lg tracking-widest uppercase">
                    {member.name}
                 </p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* RIBBON */}
      <div className="absolute z-20 bottom-[5%] left-[-10%] w-[120%] rotate-[-2deg] bg-[#04115A] border-y border-blue-500/30 py-3 overflow-hidden pointer-events-none">
        <div className="w-max">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["10%", "-10%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <span key={i} className="font-nico text-xl md:text-2xl text-white tracking-[0.3em] uppercase">
                WE MAKE IT FLY.
              </span>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}