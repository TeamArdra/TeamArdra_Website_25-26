"use client";

import React from 'react';
import TeamBoard from './teamboard';
import { motion } from 'framer-motion';
// The component name must start with a capital letter
const Board = () => {
  return (
    <div>
      <TeamBoard/>
      <div
        className="
          relative top-[15%] left-[-10%]
          w-[200%] rotate-[-3deg]
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
          w-[200%] rotate-[3deg]
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

export default Board;
