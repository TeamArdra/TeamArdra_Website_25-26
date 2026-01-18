"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ subsets: ["latin"], weight: ["400"], display: "swap" });

const EventGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const events = [
    {
      id: 1,
      name: 'Summer Music Festival',
      cover: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop'
      ],
      description: 'An incredible outdoor music festival featuring top artists from around the world. Experience three days of non-stop entertainment, food, and unforgettable memories.'
    },
    {
      id: 2,
      name: 'Tech Conference 2024',
      cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop'
      ],
      description: 'Join industry leaders and innovators for cutting-edge talks on AI, blockchain, and the future of technology. Network with professionals and explore the latest innovations.'
    },
    {
      id: 3,
      name: 'Art & Design Expo',
      cover: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=1200&h=800&fit=crop'
      ],
      description: 'Discover contemporary art and design from emerging and established artists. Interactive installations, live demonstrations, and exclusive gallery showings await you.'
    },
    {
      id: 4,
      name: 'Food & Wine Festival',
      cover: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&h=800&fit=crop'
      ],
      description: 'Savor exquisite cuisines from world-renowned chefs paired with premium wines. Cooking demonstrations, tastings, and culinary workshops throughout the weekend.'
    }
  ];

  useEffect(() => {
    if (selectedEvent) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => 
          (prev + 1) % events.find(e => e.id === selectedEvent).images.length
        );
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [selectedEvent, events]);

  const handleEventClick = (eventId) => {
    setSelectedEvent(eventId);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    const event = events.find(e => e.id === selectedEvent);
    setCurrentSlide(prev => (prev + 1) % event.images.length);
  };

  const prevSlide = () => {
    const event = events.find(e => e.id === selectedEvent);
    setCurrentSlide(prev => (prev - 1 + event.images.length) % event.images.length);
  };

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 text-[#f8f8e2]">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className={`${audiowide.className} text-4xl font-bold mb-8 text-center text-[#f8f8e2]`}>Event Gallery</h1> */}
        
        <div className={`flex flex-col ${selectedEvent ? 'md:flex-row' : ''} gap-6`}>
          {/* Main Content Area */}
          {selectedEvent && (
            <div className="flex-1 order-1 md:order-0">
              <div className="bg-[#231f1f] rounded-3xl overflow-hidden shadow-2xl">
                {/* Slideshow */}
                <div className="relative aspect-video bg-black">
                  <img
                    src={selectedEventData.images[currentSlide]}
                    alt={`${selectedEventData.name} - Slide ${currentSlide + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedEventData.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-2 h-2 rounded-full transition ${
                          idx === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h2 className={`${audiowide.className} text-3xl font-bold mb-4 text-[#f8f8e2]`}>
                    {selectedEventData.name}
                  </h2>
                  <p className={`font-nico text-[#f8f8e2] text-lg leading-relaxed`}>
                    {selectedEventData.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Event Thumbnails */}
          <div className={`
            ${selectedEvent 
              ? 'md:w-80 flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 order-2 md:order-0' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            }
          `}>
            {events.map(event => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className={`
                  relative cursor-pointer group overflow-hidden rounded-lg shadow-lg
                  transition-all duration-300 hover:shadow-2xl hover:scale-105
                  ${selectedEvent 
                    ? 'flex shrink-0 w-64 md:w-full' 
                    : ''
                  }
                  ${selectedEvent === event.id ? 'ring-4 ring-blue-500' : ''}
                `}
              >
                <div className="aspect-video relative">
                  <img
                    src={event.cover}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <h3 className={`${audiowide.className} absolute bottom-4 left-4 right-4 text-[#f8f8e2] font-bold text-lg md:text-xl`}>
                    {event.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventGallery;