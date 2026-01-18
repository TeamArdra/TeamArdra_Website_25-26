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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function CompsAndSpons() {
  return (
    <div className="relative overflow-hidden py-10 md:py-16 lg:py-20 bg-black">
      {/* Decorative blue circles - responsive sizing */}
      <motion.img
        aria-hidden="true"
        src="/Ellipse 32.png"
        alt=""
        className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 pointer-events-none top-12 sm:top-16 md:top-24 -left-8 sm:left-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.img
        aria-hidden="true"
        src="/Ellipse 28.png"
        alt=""
        className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 pointer-events-none top-12 sm:top-16 md:top-24 -right-8 sm:right-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.img
        aria-hidden="true"
        src="/Ellipse 30.png"
        alt=""
        className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 top-1/2 md:top-3/5 left-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      />
      <motion.img
        src="Ellipse 31.png"
        alt="decor"
        className="absolute w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 pointer-events-none -bottom-8 sm:bottom-12 -left-8 sm:left-0"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

      {/* Competitions Section */}
      <div className="text-center mx-4 sm:mx-8 md:mx-12 lg:mx-20 my-10 sm:my-12 md:my-16 lg:my-20">
        <motion.h2
          className="font-nico text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          [COMPETITIONS]
        </motion.h2>
      </div>

      <motion.div 
        className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {Comps.map((img, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
          >
            <ImageCard
              url={img.url}
              alt={img.alt}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Sponsors Section */}
      <div className="text-center mx-4 sm:mx-8 md:mx-12 lg:mx-20 my-10 sm:my-12 md:my-16 lg:my-20">
        <motion.h2
          className="font-nico text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          [OUR SPONSORS]
        </motion.h2>
      </div>

      <motion.div 
        className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-10 justify-center pb-10 md:pb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {Sponsors.map((img, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
          >
            <ImageCard
              url={img.url}
              alt={img.alt}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}