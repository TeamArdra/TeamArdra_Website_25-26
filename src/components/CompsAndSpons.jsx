"use client";
import ImageCard from "./ImageCard";
import { motion } from "framer-motion";

const Comps = [
  { url: "/spros.png", alt: "Spros" },
  { url: "/cognizance.png", alt: "Cognizance" },
  { url: "/Aerothon.png", alt: "City skyline" },
  { url: "/techfest.png", alt: "Sunset hills" },
  { url: "/IROC.png", alt: "Ocean cliffs" },
];

const Sponsors = [
  { url: "/Solidworks.png", alt: "Forest road" },
  { url: "/anys.png", alt: "Mountain landscape" },
  { url: "/altium.png", alt: "City skyline" },
  { url: "/protoworks.png", alt: "Sunset hills" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CompsAndSpons() {
  return (
    <div className="relative overflow-hidden py-10 md:py-16 lg:py-20 bg-black">

      {/* Competitions */}
      <div className="text-center my-16">
        <motion.h2
          className="font-nico text-4xl md:text-5xl lg:text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          [COMPETITIONS]
        </motion.h2>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-6 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {Comps.map((img, i) => (
          <motion.div key={i} variants={cardVariants}>
            <ImageCard url={img.url} alt={img.alt} />
          </motion.div>
        ))}
      </motion.div>

      {/* Sponsors */}
      <div className="text-center my-16">
        <motion.h2
          className="font-nico text-4xl md:text-5xl lg:text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          [OUR SPONSORS]
        </motion.h2>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-6 px-6 pb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {Sponsors.map((img, i) => (
          <motion.div key={i} variants={cardVariants}>
            <ImageCard url={img.url} alt={img.alt} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
