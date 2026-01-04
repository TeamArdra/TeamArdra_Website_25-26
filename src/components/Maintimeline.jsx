"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
export default function WinningTimeline() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-blue-400 mb-4">
            9TH PLACE ISDC'25
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Competed against 100+ global teams, securing a top-10 finish with our upgraded aerodynamic chassis and autonomous navigation systems.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/team-left.jpg" 
              alt="ISDC 2025 Team"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(59,130,246,0.2)] border border-blue-500/20"
            />
            <img
              src="/drone.png"
              alt="Drone Prototype 2025"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(59,130,246,0.2)] border border-blue-500/20"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-yellow-400 mb-4">
            WINNERS OF ISDC'24
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Secured 1st place internationally. This was a landmark victory for Team Ardra, showcasing superior maneuverability and payload delivery.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/team-right.jpg" 
              alt="Winning Moment"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
            <img
              src="/team-left.jpg"
              alt="Team Celebration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-white mb-4">
            USA COGNIZANCE & SUAS
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Finalists in the highly competitive AI-driven drone league held at IIT Roorkee and showcased semi-autonomous flight capabilities.
          </p>
          <div className="grid grid-cols-2 gap-4">
             <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-[#04115A] border border-blue-500/30 flex items-center justify-center">
                <span className="font-ocr text-blue-300 text-xs">USA FINALIST</span>
             </div>
             <div className="h-20 md:h-44 lg:h-60 w-full rounded-lg bg-[#04115A] border border-blue-500/30 flex items-center justify-center">
                <span className="font-ocr text-blue-300 text-xs">IITR EVENT</span>
             </div>
          </div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-amber-600 mb-4">
            3RD PLACE SUAS'19
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Awarded for 'Best Design' and podium finish in the precision payload drop category during our early years.
          </p>
           <div className="grid grid-cols-2 gap-4">
            <img
              src="/drone.png"
              alt="Early Prototype"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(217,119,6,0.2)] border border-amber-600/20"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-black font-sans py-20">
      <h2 className="text-white font-audiowide text-2xl md:text-4xl tracking-widest uppercase mb-10 text-center">
         [VICTORY LOGS]
      </h2>
      <Timeline data={data} />
    </div>
  );
}
export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Sticky Date/Title Section */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 font-audiowide">
                {item.title}
              </h3>
            </div>

            {/* Content Section */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 font-audiowide">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        
        {/* The Animated Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};