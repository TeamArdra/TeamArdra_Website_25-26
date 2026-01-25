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
      description:
        'An incredible outdoor music festival featuring top artists from around the world. Experience three days of non-stop entertainment, food, and unforgettable memories.'
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
      description:
        'Join industry leaders and innovators for cutting-edge talks on AI, blockchain, and the future of technology.'
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
      description:
        'Discover contemporary art and design from emerging and established artists.'
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
      description:
        'Savor exquisite cuisines from world-renowned chefs paired with premium wines.'
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

  const selectedEventData = events.find(e => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-black p-6 md:p-10 text-[#f8f8e2]">
      <div className="max-w-7xl mx-auto">

        <div className={`flex flex-col ${selectedEvent ? 'md:flex-row' : ''} gap-8`}>

          {/* MAIN CONTENT */}
          {selectedEvent && (
            <div className="flex-1">
              <div className="bg-[#231f1f] rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-black">
                  <img
                    src={selectedEventData.images[currentSlide]}
                    className="w-full h-full object-cover"
                    alt=""
                  />

                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (currentSlide - 1 + selectedEventData.images.length) %
                          selectedEventData.images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (currentSlide + 1) % selectedEventData.images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 p-3 rounded-full"
                  >
                    <ChevronRight />
                  </button>
                </div>

                <div className="p-8">
                  <h2 className={`${audiowide.className} text-3xl mb-4`}>
                    {selectedEventData.name}
                  </h2>
                  <p className="text-lg leading-relaxed">
                    {selectedEventData.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* EVENT CARDS */}
          <div
            className={
              selectedEvent
                ? 'md:w-96 flex md:flex-col gap-6 overflow-x-auto'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'
            }
          >
            {events.map(event => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event.id);
                  setCurrentSlide(0);
                }}
                className={`
                  cursor-pointer overflow-hidden rounded-xl shadow-xl
                  transition-all duration-300 hover:scale-105
                  ${selectedEvent === event.id ? 'ring-4 ring-blue-500' : ''}
                  ${selectedEvent ? 'w-72 md:w-full shrink-0' : ''}
                `}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={event.cover}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <h3
                    className={`${audiowide.className} absolute bottom-6 left-6 right-6 text-xl md:text-2xl`}
                  >
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
