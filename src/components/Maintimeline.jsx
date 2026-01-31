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
            FINALIST OF GEO-AI HACKOTHON, TECHFEST
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/tf-1a.png" 
              alt="ISDC 2025 Team"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(59,130,246,0.2)] border border-blue-500/20"
            />
            <img
              src="/tf-2a.png"
              alt="Drone Prototype 2025"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(59,130,246,0.2)] border border-blue-500/20"
            />
          </div>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Team Ardra participated in the Geo-AI Hackathon at IIT Bombay’s Techfest, developing geospatial machine learning pipelines for rural infrastructure mapping using aerial imagery.
          </p>
          <h3 className="text-2xl md:text-4xl font-audiowide text-blue-400 mb-4">
            9TH PLACE IN ISDC'25
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Secured 9th place at ISDC Goa 2025, showcasing strong performance in autonomous flight and drone operations among top student teams.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/isdc25-1a.png" 
              alt="ISDC 2025 Team"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(59,130,246,0.2)] border border-blue-500/20"
            />
            <img
              src="/isdc25-2a.png"
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
            Winners of ISDC ’24, demonstrating excellence in autonomous drone systems and mission execution.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/isdc-1a.png" 
              alt="Winning Moment"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
            <img
              src="/isdc-2a.png"
              alt="Team Celebration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
          </div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-yellow-400 mb-4">
            COGNIZANCE  IITR FINALS ‘24
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Qualified for the Cognizance IIT Roorkee Finals 2024, demonstrating reliable system design and execution.
          </p>
        </div>
        
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-white mb-4">
              FINALS  SUAS ’21 USA
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Finalists at SUAS 2021 (USA), competing in autonomous unmanned aircraft mission challenges.
          </p>
          <div className="grid grid-cols-1 gap-4">
             <img
              src="/suas-1a.png" 
              alt="Winning Moment"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
          </div>
          <h3 className="text-2xl md:text-4xl font-audiowide text-yellow-400 mb-4">
            3RD PLACE  IPAS'21
          </h3>
          <p className="text-neutral-300 font-ocr text-sm md:text-base mb-8 tracking-wider">
            Secured 3rd place at IPAS 2021, demonstrating strong technical performance and system reliability.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/ipas-1a.png" 
              alt="Winning Moment"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
            <img
              src="/ipas-2a.png"
              alt="Team Celebration"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(250,204,21,0.2)] border border-yellow-500/20"
            />
          </div>
        </div>
      ),
    },
    {
    },
  ];

  return (
    <div className="w-full bg-black font-sans py-20">
      <div className="text-center mx-4 sm:mx-8 md:mx-12 lg:mx-20 my-10 sm:my-12 md:my-16 lg:my-20">
              <motion.h2
                className="font-nico text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                [OUR ACHIEVEMENTS]
              </motion.h2>
            </div>
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
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

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
                <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
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
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-2 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-neutral-700 to-transparent to-99%  [mask-linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-2 bg-linear-to-b from-blue-500 via-blue-400 to-transparent rounded-full"
            transition={{
              duration: 0.4,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
};