import React from 'react';
import { BenchNine} from "next/font/google";

const benchNine = BenchNine({ subsets: ["latin"], weight: ["400"], display: "swap" });


const Footer = () => {
  return (
    <footer className="w-full bg-black text-white pt-12 pb-0 bottom-0">
      
      <div className="max-w-7xl mx-auto">
        
        
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="hidden md:block w-1/3">
            <p className="text-white font-nico text-lg leading-relaxed">
              PROJECTS<br />
              RESEARCH<br />
              NEW APPROACH
            </p>
            <p className={`text-white ${benchNine.className} text-lg mt-4`}>BEYOND LIMITS</p>
          </div>

          <div className="ml-22 md:ml-0 md:w-1/3 mt-6 md:mt-0">
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="text-center md:text-right">
                <p className="font-audiowide text-sm uppercase">Address -</p>
                <p className="font-audiowide text-sm mt-1">
                  VIT, Vellore Campus,
                  <br /> Vellore, Tamil Nadu 632014
                </p>

                <div className="mt-4">
                  <p className="font-audiowide text-sm">Contact us:</p>
                  <div className="flex flex-col items-center md:items-end mt-1 gap-0 md:gap-2">
                    <div className="flex items-center justify-center md:justify-end gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.8z" />
                      </svg>
                      <span className="font-audiowide text-sm">+91 74729 47974</span>
                    </div>

                    <div className="flex items-center justify-center md:justify-end gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.8z" />
                      </svg>
                      <span className="font-audiowide text-sm">+91 88585 84438</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-end gap-5 md:gap-3 mt-4 mb-4 md:mb-0">
                <a href="mailto:info@teamardra.example" aria-label="Email" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>

                <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </a>

                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v13H0V8zm7 0h4.8v1.8h.1c.7-1.2 2.4-2.5 4.9-2.5C22 7.3 24 9.4 24 13.6V21H19v-6.6c0-1.6 0-3.7-2.3-3.7-2.3 0-2.6 1.8-2.6 3.6V21H7V8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
        </div>

        <div className='relative'>
          <img
        aria-hidden="true"
        src="/Ellipse 33.png"
        alt=""
        className="absolute w-64 h-64 pointer-events-none transform -translate-x-1/2 translate-y-1/4 bottom-0 left-1/3"
      />
        </div>
      </div>
        <p className="text-center text-white font-audiowide text-5xl md:text-[12rem] mt-0 pb-0">
          TEAM ARDRA
        </p>
    </footer>
  );
};

export default Footer;
