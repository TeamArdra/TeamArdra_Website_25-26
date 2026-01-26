"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// DATA ARRAY
const blogPosts = [
  {
    id: 1,
    date: 'January 4, 2026',
    categories: ['Drone'], 
    image: '/contactus_drone.png', 
    title: 'Turtle',
    description: 'Turtles are ancient reptiles, recognizable by their unique bony shells, that thrive in diverse global ecosystems, from oceans to deserts, and include tortoises.',
    link: '#'
  },
  {
    id: 2,
    date: 'February 10, 2026',
    categories: ['Artificial Intelligence'],
    image: '/contactus_drone.png',
    title: 'AI in Mapping Technologies',
    description: 'Exploring how neural networks are revolutionizing the way we map terrain using autonomous drone swarms.',
    link: '#'
  },
  {
    id: 3,
    date: 'March 15, 2026',
    categories: ['Structures', 'Projects'],
    image: '/contactus_drone.png',
    title: 'Structural Integrity of UAVs',
    description: 'A deep dive into the carbon fiber composites used in our latest heavy-lift drone prototype.',
    link: '#'
  },
  {
    id: 4,
    date: 'April 2, 2026',
    categories: ['Electronics', 'Drone', 'Artificial Intelligence', 'Projects', 'Structures'],
    image: '/contactus_drone.png',
    title: 'Advanced Flight Controllers',
    description: 'Understanding the PID loops and sensor fusion algorithms that keep our drones stable in high winds.',
    link: '#'
  },
];

// FILTER CATEGORIES
const categoriesTop = ["Drone", "Mapping", "Artificial Intelligence"];
const categoriesBottom = ["Electronics", "Structures", "Projects"];

const Blogs = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Toggle Logic
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category] 
    );
  };

  // Filter Logic
  const filteredPosts = useMemo(() => {
    if (selectedCategories.length === 0) return blogPosts;
    return blogPosts.filter(post => 
      post.categories.some(cat => selectedCategories.includes(cat))
    );
  }, [selectedCategories]);

  const CategoryButton = ({ cat }) => {
    const isActive = selectedCategories.includes(cat);
    return (
      <button
        onClick={() => toggleCategory(cat)}
        className={`px-4 py-1 rounded-full text-[10px] md:text-xs uppercase tracking-wider font-medium border transition-all duration-300 whitespace-nowrap ${
          isActive
            ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]'
            : 'bg-transparent border-gray-600 text-gray-400 hover:border-white hover:text-white'
        }`}
      >
        {cat}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-500 pb-20">
      
      {/* Top Blue Bar */}
      <div className="w-full h-1 bg-[#0066FF] shadow-[0_0_15px_rgba(0,102,255,0.8)] mb-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-8 pb-12 relative"
        >
           
          <h1 
            className="text-6xl md:text-9xl font-nico tracking-widest text-[#0066FF] relative z-10"
          >
            BLOGS
          </h1>
        </motion.div>

        {/* Filter Bar Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <h2 
            className="text-2xl md:text-3xl font-nico uppercase tracking-wider text-white"
          >
            Medium Posts
          </h2>

          <div className="flex flex-col items-center gap-3 ml-auto">
            {/* Row 1 */}
            <div className="flex gap-2">
              {categoriesTop.map(cat => <CategoryButton key={cat} cat={cat} />)}
            </div>
            {/* Row 2 */}
            <div className="flex gap-2">
              {categoriesBottom.map(cat => <CategoryButton key={cat} cat={cat} />)}
            </div>
          </div>
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-700">
          <AnimatePresence mode='popLayout'>
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group border-b border-r border-gray-700 bg-[#0A0A0A] flex flex-col h-full p-6 relative"
              >
                {/* Card Header */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-white text-xs font-mono uppercase tracking-widest font-bold mt-1">
                    {post.date}
                  </span>
                  
                  <div className="flex flex-wrap gap-2 justify-end max-w-[60%]">
                    {post.categories.map(c => (
                       <span 
                         key={c}
                         className="px-3 py-1 rounded-full border border-white text-[10px] uppercase tracking-wider text-white whitespace-nowrap"
                       >
                         {c}
                       </span>
                    ))}
                  </div>
                </div>

                {/* Image Area */}
                <div className="w-full aspect-video overflow-hidden mb-6 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover "
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 
                    className="text-xl font-bold text-white mb-4 leading-tight"
                  >
                    {post.title}
                  </h3>
                  
                  <p 
                    className="text-gray-400 text-xs leading-relaxed mb-8 flex-grow"
                    style={{ fontFamily: '"Akatab", sans-serif' }}
                  >
                    {post.description}
                  </p>

                  <a 
                    href={post.link} 
                    className="inline-block text-white text-xs font-bold uppercase underline underline-offset-4 decoration-1 hover:text-[#0066FF] hover:decoration-[#0066FF] transition-all w-max mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Empty State Message */}
        {filteredPosts.length === 0 && (
           <div className="text-center py-20 text-gray-500 font-mono">
             No posts found for the selected categories.
           </div>
        )}

      </div>
    </div>
  );
};

export default Blogs;