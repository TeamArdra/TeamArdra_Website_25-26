"use client";

import EventGallery from '@/components/EventGallery';
import React from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  return (
    <div className='bg-black overflow-x-hidden'>

      {/* ================= HEADING ================= */}
      <div className="text-center mx-4 sm:mx-8 md:mx-12 lg:mx-20 my-10 sm:my-12 md:my-16 lg:my-20">
        <motion.h2
          className="font-nico text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          [EVENTS AND OUTREACH]
        </motion.h2>
      </div>

      {/* ================= GALLERY ================= */}
      <EventGallery />

      {/* ================= STRIP 1 ================= */}
      {/* <div className="w-full overflow-hidden mt-10">
        <div className="-rotate-3 bg-[#04115A] py-2">
          <motion.div
            className="flex gap-12 whitespace-nowrap w-max"
            animate={{ x: [0, -300] }}
            transition={{
              duration: 16,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              team ardra.
            </span>
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              team ardra.
            </span>
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              team ardra.
            </span>
            <span className="font-nico text-2xl text-[#f8f8e3] tracking-[0.3em] uppercase">
              team ardra.
            </span>
          </motion.div>
        </div>
      </div> */}

      {/* ================= STRIP 2 ================= */}
      {/* <div className="w-full overflow-hidden">
        <div className="rotate-3 bg-[#f8f8e3] py-2">
          <motion.div
            className="flex gap-12 whitespace-nowrap w-max"
            animate={{ x: [0, -300] }}
            transition={{
              duration: 16,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
            <span className="font-nico text-2xl text-[#04115A] tracking-[0.3em] uppercase">
              THROTTLING TOWARDS EXCELLENCE.
            </span>
          </motion.div>
        </div>
      </div> */}

    </div>
  );
};

export default Page;
