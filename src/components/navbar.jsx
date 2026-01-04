"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "OUR DRONES", href: "/our-drones" },
    { name: "MEET THE TEAM", href: "/team" },
    { name: "ACHIEVEMENTS", href: "/achievements" },
    { name: "SPONSOR", href: "/sponsor" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-md text-white w-full sticky top-0 z-50 shadow-lg">
      <div className="w-full px-4 font-anton "> 
        <div className="flex items-center justify-between h-24 relative">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 z-20">
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

          {/* 2. Desktop Menu (ABSOLUTE CENTERED & SPREAD OUT) */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-16">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-Anton text-white hover:text-blue-400 text-sm font-anton tracking-widest uppercase transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Mobile Menu Button (Stays on the Right) */}
          <div className="flex md:hidden z-20 ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu Dropdown (Unchanged) */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-Anton hover:bg-gray-800 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}