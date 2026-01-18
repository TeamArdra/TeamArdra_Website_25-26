"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "OUR DRONES", href: "/drones" },
    { name: "ACHIEVEMENTS", href: "/achievements" },
    { name: "BLOGS", href: "/blogs" },
    { name: "EVENTS AND OUTREACH", href: "/outreach" },
    { name: "CONTACT US", href: "/contact" },
  ];

  // Animation variants for the menu overlay
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for menu items
  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <nav className="text-white w-full sticky top-0 z-100 shadow-lg bg-black border-b border-gray-800">
      <div className="w-full px-4 font-anton">
        <div className="flex items-center justify-between h-24 relative">
          {/* Logo Section */}
          <div className="flex shrink-0 z-20">
            <Link href="/" className="flex items-center p-0">
              <Image
                src="/logo.png"
                alt="Team Ardra"
                width={85}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu (ABSOLUTE CENTERED & SPREAD OUT) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 ml-24">
            <div className="flex items-center space-x-20">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-Anton text-white hover:text-blue-400 text-sm font-anton tracking-widest uppercase transition-colors duration-200 whitespace-nowrap ${
                      active ? "border-b-2 border-blue-400 pb-1" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden z-50 ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed inset-0 bg-black z-50 flex flex-col top-20"
          >
            {/* Menu Items Container */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 space-y-8 top-30">
              {navLinks.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-anton text-white hover:text-blue-400 transition-colors tracking-widest uppercase ${
                        active ? "border-b-2 border-blue-400 pb-1" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Section with Logo and Copyright */}
            <motion.div
              variants={itemVariants}
              className="pb-8 flex flex-col items-center space-y-4"
            >
              <Image
                src="/logo.png"
                alt="Team Ardra"
                width={100}
                height={50}
                className="object-contain opacity-80"
              />
              <p className="text-gray-400 text-sm tracking-wide">
                Team Ardra © 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}