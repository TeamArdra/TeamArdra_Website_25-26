"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MoveLeft, MoveRight, Trophy } from "lucide-react"; // Make sure you have lucide-react or use standard svgs

// DATA: Your History of Winnings
const WINNINGS = [
  {
    id: 1,
    title: "WINNERS OF ISDC'24",
    year: "2024",
    description: "Secured 1st place internationally, showcasing our advanced drone maneuverability and autonomous navigation systems.",
    src: "/team-left.jpg", // Replace with actual image path
    color: "text-yellow-400", // Gold for winner
  },
  {
    id: 2,
    title: "9TH PLACE ISDC'25",
    year: "2025",
    description: "Competed against 100+ global teams, securing a top-10 finish with our upgraded aerodynamic chassis.",
    src: "/team-right.jpg", 
    color: "text-blue-400",
  },
  {
    id: 3,
    title: "3RD PLACE IPAS'19",
    year: "2019",
    description: "Awarded for 'Best Design' and podium finish in the precision payload drop category.",
    src: "/drone.png", 
    color: "text-amber-600", // Bronzeish
  },
  {
    id: 4,
    title: "USA COGNIZANCE",
    year: "2022",
    description: "Finalists in the highly competitive AI-driven drone league held at IIT Roorkee.",
    src: "/team-left.jpg", 
    color: "text-white",
  },
];

export default function WinningHistory() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate logic
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [autoplay, active]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % WINNINGS.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + WINNINGS.length) % WINNINGS.length);
  };

  const currentWin = WINNINGS[active];

  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* HEADER */}
      <motion.h2
        className="text-white font-audiowide text-2xl md:text-4xl tracking-widest uppercase mb-12 z-20"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        [VICTORY LOGS]
      </motion.h2>

      {/* SVG TECH LINES BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="10 10" />
            <circle cx="50%" cy="50%" r="300" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-6xl w-full px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[400px]">
          
          <AnimatePresence mode="wait">
            {/* --- LEFT SIDE: IMAGE (Flies in from Left) --- */}
            <motion.div
              key={`img-${active}`}
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -100, rotate: 5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative group"
            >
              {/* Image Card */}
              <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden border-2 border-[#04115A] shadow-[0_0_40px_rgba(4,17,90,0.6)]">
                 <motion.img
                    src={currentWin.src}
                    alt={currentWin.title}
                    className="w-full h-full object-cover"
                    // Floating Effect on the image itself
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                 />
                 {/* Overlay Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                 
                 {/* Year Badge inside Image */}
                 <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md px-4 py-2 rounded-full border border-blue-400">
                    <span className="font-audiowide text-white text-lg">{currentWin.year}</span>
                 </div>
              </div>

              {/* Decorative Elements behind image */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl border border-blue-500/30 bg-[#04115A]/50" />
            </motion.div>

            {/* --- RIGHT SIDE: TEXT (Flies in from Right) --- */}
            <motion.div
              key={`txt-${active}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
              className="flex flex-col justify-center text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Trophy className={`w-12 h-12 mb-6 ${currentWin.color}`} />
                
                <h3 className={`font-audiowide text-3xl md:text-5xl uppercase leading-tight mb-6 ${currentWin.color}`}>
                  {currentWin.title}
                </h3>
                
                <p className="font-ocr text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
                  {currentWin.description}
                </p>
              </motion.div>

              {/* CONTROLS */}
              <div className="flex gap-4 mt-12">
                <button 
                    onClick={handlePrev}
                    onMouseEnter={() => setAutoplay(false)}
                    className="p-3 rounded-full bg-slate-900 border border-slate-700 hover:bg-blue-600 hover:border-blue-500 transition-all group"
                >
                    <MoveLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                <button 
                    onClick={handleNext}
                    onMouseEnter={() => setAutoplay(false)}
                    className="p-3 rounded-full bg-slate-900 border border-slate-700 hover:bg-blue-600 hover:border-blue-500 transition-all group"
                >
                    <MoveRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}