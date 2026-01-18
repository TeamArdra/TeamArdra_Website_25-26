"use client";

import EventGallery from '@/components/EventGallery';
import React from 'react';
import { motion } from 'framer-motion';

const Page = () => {
  return (
    <div className='bg-black'>
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
      <EventGallery />
      <div
              className="
                relative top-[15%] left-[-10%]
                w-[200%] -rotate-3
                bg-[#04115A] py-2 overflow-hidden
              "
            >
              <div className="w-max">
                <motion.div
                  className="flex gap-12 whitespace-nowrap"
                  animate={{ x: [80, -80] }}
                  transition={{
                    duration: 16,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror",
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
                </motion.div>
              </div>
            </div>
      
            <div
              className="
                relative top-[15%] right-[10%]
                w-[200%] rotate-3
                bg-[#f8f8e3] py-2 overflow-hidden
              "
            >
              <div className="w-max">
                <motion.div
                  className="flex gap-12 whitespace-nowrap"
                  animate={{ x: [80, -80] }}
                  transition={{
                    duration: 16,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "mirror",
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
                </motion.div>
              </div>
            </div>
    </div>
  );
};

export default Page;
