"use client";
import {motion} from "framer-motion";

export default function OurDrones() {
  const leftDroneVariants = {
  hidden: { opacity: 0, x: -200, y: 80 },
  visible: {
    opacity: 1,
    x: 0,
    y: [0, -8, 0], // idle drift
    transition: {
      opacity: { duration: 0.6 },
      x: { duration: 1, ease: "easeOut" },
      y: {
        delay: 1,           // wait until fly-in finishes
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },
};

const centerDroneVariants = {
  hidden: { opacity: 0, y: 180 },
  visible: {
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      opacity: { duration: 0.6 },
      y: {
        delay: 1,
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },
};

const rightDroneVariants = {
  hidden: { opacity: 0, x: 200, y: 80 },
  visible: {
    opacity: 1,
    x: 0,
    y: [0, -8, 0],
    transition: {
      opacity: { duration: 0.6 },
      x: { duration: 1, ease: "easeOut" },
      y: {
        delay: 1,
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  },
};

  return (
    <section className="relative w-full bg-black py-32 overflow-hidden">

      {/* Section Title */}
      <div className="text-center mb-20">
        <h2 className="font-nico text-5xl tracking-widest text-white">
          [OUR DRONES]
        </h2>
      </div>
        <div className="absolute inset-0 z-0 pointer-events-none">

            {/* Left Ring */}
            <div
                className="
                absolute
                top-1/2
                left-[25%]
                -translate-x-1/2
                -translate-y-1/2
                w-[720px]
                h-[720px]
                rounded-full
                border-[2px]
                border-amber-100
                opacity-90
                "
             />

            {/* Center Ring */}
            <div
                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[720px]
                h-[720px]
                rounded-full
                border-[2px]
                border-amber-100
                opacity-90
                "
            />

            {/* Right Ring */}
            <div
                className="
                absolute
                top-1/2
                left-[75%]
                -translate-x-1/2
                -translate-y-1/2
                w-[720px]
                h-[720px]
                rounded-full
                border-[2px]
                border-amber-100
                opacity-90
                "
            />

    </div>


      {/* Cards Wrapper */}
      <div className="relative flex justify-center items-end gap-40">
        {/* Left Card */}
        <motion.div
            className="relative w-[360px] h-[440px] rounded-2xl bg-amber-100 flex items-center justify-center"
            variants={leftDroneVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(255,255,255,0.35)",
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
        >

            <h1 className="absolute top-6 text-black font-nico text-3xl z-20">
            HEX
            </h1>

        
          <motion.div
            className="
                absolute
                bottom-[12%]
                w-[220px]
                h-[28px]
                bg-black/70
                blur-xl
                rounded-full
                z-0
            "
            whileHover={{
                scale: 0.85,
                opacity: 0.8,
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
          />

           

            <motion.img
                src="/drone.png"
                alt="Drone 1"
                className="relative z-10 w-[460px] opacity-80"
                whileHover={{
                    y: -8,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                }}
            />

        </motion.div>

        {/* Center Card (Highlighted) */}
         <motion.div
            className="relative w-[360px] h-[440px] rounded-2xl bg-amber-100 flex items-center justify-center"
            variants={centerDroneVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(255,255,255,0.35)",
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <h1 className="absolute top-6 text-black font-nico text-3xl z-20">
                KUROGANE
            </h1>

           {/* Shadow */}
           <motion.div
            className="
                absolute
                bottom-[12%]
                w-[220px]
                h-[28px]
                bg-black/70
                blur-xl
                rounded-full
                z-0
            "
            whileHover={{
                scale: 0.85,
                opacity: 0.8,
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
          />
         <motion.img
            src="/kurogane.png"
            alt="Drone 1"
            className="relative z-10 w-[460px] opacity-80"
            whileHover={{
                y: -8,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
            }}
        />

        </motion.div>

        {/* Right Card */}
         <motion.div
            className="relative w-[360px] h-[440px] rounded-2xl bg-amber-100 flex items-center justify-center"
            variants={rightDroneVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{
                y: -6,
                boxShadow: "0 20px 40px rgba(255,255,255,0.35)",
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
        >
            <h1 className="absolute top-6 text-black font-nico text-3xl z-20">
                M.I.R.A.D
            </h1>

            <motion.div
            className="
                absolute
                bottom-[12%]
                w-[220px]
                h-[28px]
                bg-black/70
                blur-xl
                rounded-full
                z-0
            "
            whileHover={{
                scale: 0.85,
                opacity: 0.8,
            }}
            transition={{
                duration: 0.3,
                ease: "easeOut",
            }}
          />
            <motion.img
                src="/drone.png"
                alt="Drone 1"
                className="relative z-10 w-[460px] opacity-80"
                whileHover={{
                    y: -8,
                }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                }}
            />

        </motion.div>

      </div>

      {/* Bottom Blue Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[10px] bg-blue-700" />

    </section>
  );
}
