"use client";
import ImageCard from "./ImageCard";
import { motion } from "framer-motion";
const Comps = [
  {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    alt: "Forest road",
  },
  {
    url: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    alt: "Mountain landscape",
  },
  {
    url: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
    alt: "City skyline",
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Sunset hills",
  },
  {
    url: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
    alt: "Ocean cliffs",
  },
];

const Sponsors = [
  {
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    alt: "Forest road",
  },
  {
    url: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    alt: "Mountain landscape",
  },
  {
    url: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
    alt: "City skyline",
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Sunset hills",
  }
];

export default function CompsAndSpons() {
  return (
    <div className="relative">
      {/* Decorative blue circles (use /circle.png; fallback to existing Ellipse 32) */}
      <img
        aria-hidden="true"
        src="/Ellipse 32.png"
        alt=""
        className="absolute w-64 h-64 pointer-events-none top-24 left-0"
      />
      <img
        aria-hidden="true"
        src="/Ellipse 28.png"
        alt=""
        className="absolute w-64 h-64 pointer-events-none top-24 right-0"
      />
      <img
        aria-hidden="true"
        src="/Ellipse 30.png"
        alt=""
        className="absolute w-64 h-64 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-3/5 left-1/2"
      />
      <img
        src='Ellipse 31.png'
        alt="decor"
        className="absolute w-64 h-64 pointer-events-none bottom-12 left-0"
      />
      <div className="text-center m-20">
        <motion.h2
          className="font-nico text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          [COMPETITIONS]
        </motion.h2>
      </div>
        <div className="flex flex-wrap gap-10 px-10 justify-center">
      {Comps.map((img, index) => (
        <ImageCard
          key={index}
          url={img.url}
          alt={img.alt}
        />
      ))}
    </div>
    <div className="text-center m-20">
        <motion.h2
          className="font-nico text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          [OUR SPONSORS]
        </motion.h2>
      </div>
      <div className="flex flex-wrap gap-10 px-10 justify-center">
      {Sponsors.map((img, index) => (
        <ImageCard
          key={index}
          url={img.url}
          alt={img.alt}
        />
      ))}
    </div>
      {/* Decorative bottom-right image */}
      
    </div>
    
  );
}
