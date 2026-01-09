"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="w-full bg-black text-white py-32 px-[6%]">
      
      {/* Section Title */}
      <div className="text-center mb-20">
        <motion.h2
          className="font-nico text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          [ABOUT US]
        </motion.h2>
      </div>

      {/* Outer Card */}
      <div className="bg-[#FFF2A8] rounded-3xl p-8 lg:p-12">
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
              className="rounded-xl object-cover w-full h-[280px]"
            />

            {/* Stats */}
            <div className="bg-[#0A1E5E] rounded-2xl p-6 grid grid-cols-2 gap-y-4 text-sm font-audiowide tracking-widest uppercase text-[#FFF2A8]">
              <div>Established</div>
              <div className="text-right">2019</div>

              <div>Chapter</div>
              <div className="text-right">SEDS VIT</div>

              <div>Institution</div>
              <div className="text-right">VIT Vellore</div>

              <div>Domains</div>
              <div className="text-right">UAVs</div>

              <div>Main Specialty</div>
              <div className="text-right">Autonomous Drones</div>

              <div>Team Size</div>
              <div className="text-right">32</div>

              <div>Team Motto</div>
              <div className="text-right">THROTTLING TOWARDS EXCELLENCE</div>
              
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
              className="
                font-audiowide
                text-[#FFF2A8]
                uppercase
                tracking-[0.25em]
                leading-[2]
                text-lg
              "
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
