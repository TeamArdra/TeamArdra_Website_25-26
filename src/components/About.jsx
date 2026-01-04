"use client";
import {motion} from "framer-motion";

export default function About() {
  return (
    <section className="relative w-full bg-black text-white py-32 px-[7.5%]">
      
      {/* Section Title */}
      <div className="text-center mb-20">
        <motion.h2
            className="font-nico text-6xl tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            [ABOUT US]
        </motion.h2>

      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-10 items-center">

        {/* Left Text */}
        <div className="lg:col-span-5">
          <motion.p
            className="
                font-audiowide
                text-blue-500
                uppercase
                tracking-[0.15em]
                leading-[1.8]
                text-3xl
            "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            >
                Team Ardra was founded to foster technical innovation in aviation
                at VIT. Comprising dedicated students, the team designs, develops,
                and deploys UAVs, aiming to advance technology while honing
                aerospace and autonomy skills.
        </motion.p>

        </div>

        {/* Right Image */}
        <div className="lg:col-span-3 flex justify-center">
         <motion.img
            src="/about.jpeg"
            alt="Team Ardra Member"
            className="
                w-[400px]
                rounded-xl
                object-cover
            "
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
        />

        </div>

      </div>
    </section>
  );
}
