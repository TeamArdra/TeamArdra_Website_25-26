"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactUs = () => {
  // 1. STATE MANAGEMENT: Track what the user types
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle typing in inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 2. MAILTO FUNCTION: Opens the default email client with data
  const handleSendEmail = (e) => {
    e.preventDefault(); // Stop page refresh
    const { name, email, subject, message } = formData;
    
    // Construct the email body
    const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    // Create the mailto link
    const mailtoLink = `mailto:teamardra@vit.ac.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open it
    window.location.href = mailtoLink;
  };

  // Animation Variants (Unchanged)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  };

  const fadeInScale = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500 selection:text-white pb-10 overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-12 pb-12 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-nico Atracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-lg" >
          [Contact Us]
        </h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <motion.div variants={itemVariants} className="bg-[#091243] p-8 rounded-xl shadow-2xl border border-blue-900/30 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-xl text-blue-300 font-medium" >Contact Us</h2>
              <h3 className="text-3xl font-bold text-white mt-1 tracking-wide" >Get in Touch</h3>
            </div>

            <form className="space-y-6" onSubmit={handleSendEmail}>
              <div className="group">
                <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#E2E9F8]/10 text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#E2E9F8]/10 text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div className="group">
                <label htmlFor="subject" className="block text-sm font-bold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#E2E9F8]/10 text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Subject of your message"
                />
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#E2E9F8]/10 text-white rounded-md p-3 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#091243] to-blue-900 text-white border border-blue-500/50 py-3 rounded-full hover:from-blue-800 hover:to-blue-600 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 font-bold tracking-wider flex items-center justify-center gap-2 group"
              >
                <span>Send Now</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Right Column: Info & Map */}
          <div className="flex flex-col justify-between h-full space-y-10">
            
            {/* Description Text */}
            <motion.div variants={itemVariants} className="text-gray-300 font-Aubrey text-lg leading-relaxed text-justify border-l-4 border-blue-500 pl-4 py-2 bg-white/5 rounded-r-lg">
              <p>
                Team Ardra was founded to foster technical innovation in aviation at VIT. 
                Comprising dedicated students, the team designs, develops, and deploys UAVs, 
                aiming to advance technology while honing aerospace and autonomy skills.
              </p>
            </motion.div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center" style={{ fontFamily: '"Akatab", sans-serif' }}>
              
              {/* Phone */}
              <motion.div variants={itemVariants} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full border border-gray-500 flex items-center justify-center mb-4 group-hover:border-blue-400 group-hover:bg-blue-900/20 transition-all duration-300">
                  <Phone className="w-8 h-8 text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1 group-hover:text-blue-300 transition-colors">Phone Number</h4>
                <p className="text-white text-lg">+91 0000000000</p>
              </motion.div>

              {/* Email */}
              <motion.a 
                href="mailto:teamardra@vit.ac.in" 
                variants={itemVariants}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full border border-gray-500 flex items-center justify-center mb-4 group-hover:border-blue-400 group-hover:bg-blue-900/20 transition-all duration-300">
                  <Mail className="w-8 h-8 text-gray-300 group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1 group-hover:text-blue-300 transition-colors">Email</h4>
                <p className="text-white text-lg group-hover:text-blue-400 transition-colors">teamardra@vit.ac.in</p>
              </motion.a>
            </div>

            {/* Location & Map */}
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center" >
              <div className="mb-4 group cursor-default">
                 <MapPin className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:text-red-500 group-hover:animate-bounce transition-colors" />
                 <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-blue-300 transition-colors">Our Location</h4>
                 <p className="text-gray-300 text-lg mt-1 max-w-xs mx-auto">
                   VIT, Vellore Campus, Tiruvalam Rd, Katpadi, Vellore, Tamil Nadu 632014
                 </p>
              </div>
              
              {/* Embedded Google Map */}
              <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden border-2 border-gray-700 hover:border-blue-500 transition-colors duration-300 shadow-lg mt-4 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.003673390977!2d79.15335877593256!3d12.971598687343657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad479f0ccbe067%3A0x2a60d320e8b3b350!2sVellore%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="VIT Vellore Map"
                  className="hover:filter-none transition-all duration-500"
                ></iframe>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Footer Drone Image Section - Audiowide Font */}
        <motion.div 
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 relative w-full h-64 md:h-80 rounded-2xl overflow-hidden group shadow-2xl border border-gray-800"
        >
          <img 
            src="/contactus_drone.png" 
            alt="Drone Throttling Towards Excellence" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center pl-6 md:pl-16">
            <div className="transform group-hover:translate-x-4 transition-transform duration-500">
              {/* CHANGED: Text Color to #FFF1AB */}
              <h2 className="text-2xl md:text-5xl font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-widest" 
                  style={{ color: '#FFF1AB' }}>
                Throttling Towards
              </h2>
              {/* CHANGED: Text Color to #FFF1AB */}
              <h2 className="text-2xl md:text-5xl font-bold uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-widest mt-2" 
                  style={{color: '#FFF1AB' }}>
                Excellence
              </h2>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ContactUs;