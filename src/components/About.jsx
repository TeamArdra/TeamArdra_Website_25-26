"use client";
import { motion } from "framer-motion";
import { Aubrey, Big_Shoulders} from "next/font/google";
import localFont from "next/font/local";
const aubrey = Aubrey({ subsets: ["latin"], weight: ["400"], display: "swap" });
const bigShoulders = Big_Shoulders({ subsets: ["latin"], weight: ["400"], display: "swap" });

const ocrA= localFont({
  src: "../../public/fonts/ocraextended.woff",
  display: "swap",
});

export default function About() {
  return (
    <section className="w-full bg-black text-[#f8f8e2] py-32 px-[6%]">
      
      <div className="text-center mx-4 sm:mx-8 md:mx-12 lg:mx-20 my-10 sm:my-12 md:my-16 lg:my-20">
        <motion.h2
          className="font-nico text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          [ABOUT US]
        </motion.h2>
      </div>

      {/* Outer Card */}
      <div className="bg-[#231f1f] rounded-3xl p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT PANEL */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <img
              src="/about.jpeg"
              alt="Team Ardra"
              className="rounded-xl object-cover w-full h-70"
            />

            {/* Stats */}
            <div className="bg-[#0A1E5E] rounded-2xl p-6 grid grid-cols-2 gap-y-4 text-lg md:text-md tracking-widest uppercase text-[#F8F8E2]">
              <div className={`${bigShoulders.className}`}>Established</div>
              <div className={`text-right ${aubrey.className}`}>2019</div>

              <div className={`${bigShoulders.className}`}>Chapter</div>
              <div className={`text-right ${aubrey.className}`}>SEDS VIT</div>

              <div className={`${bigShoulders.className}`}>Institution</div>
              <div className={`text-right ${aubrey.className}`}>VIT Vellore</div>

              <div className={`${bigShoulders.className}`}>Domains</div>
              <div className={`text-right ${aubrey.className}`}>UAVs</div>

              <div className={`${bigShoulders.className}`}>Main Specialty</div>
              <div className={`text-right ${aubrey.className}`}>Autonomous Drones</div>

              <div className={`${bigShoulders.className}`}>Team Size</div>
              <div className={`text-right ${aubrey.className}`}>32</div>

              <div className={`${bigShoulders.className}`}>Team Motto</div>
              <div className={`text-right ${aubrey.className}`}>THROTTLING TOWARDS EXCELLENCE</div>
              
            </div>
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div
            className="
              bg-[#071A57]
              rounded-2xl
              border-4 border-blue-500
              p-10
              flex items-center
            "
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p
              className={`${ocrA.className} text-[#F8F8E2] uppercase tracking-[0.25em] leading-loose text-md md:text-lg`}
            >
              Team Ardra was founded to foster technical innovation in aviation at
              VIT. Comprising dedicated students, the team designs, develops, and
              deploys UAVs, aiming to advance technology while honing aerospace
              and autonomy skills.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}