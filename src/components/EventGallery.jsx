"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const EventGallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const events = [
    {
      id: 1,
      name: "Outreach @ Takshilah School",
      cover: "/takshilah.png",
      images: ["/takshilah-1.png", "/takshilah-2.png", "/takshilah-3.png"],
      description:
        "Team Ardra had the opportunity to engage with the students of the Takshilah Global School, Ambur, through an interactive session on drones covering types, flight physics, space related concepts, and real-world applications. The speakers shared hands-on experiences, and an enthusiastic Q&A reflected the impact of the session. We thank SEDS VIT for their support and the school and students for their warm welcome and curiosity. Here's to inspiring future innovators.",
    },
    {
      id: 2,
      name: "GRAVITAS 2025",
      cover: "/gravitas.png",
      images: ["/gravitas-1.png", "/gravitas-2.png", "/gravitas-3.png"],
      description:
        "During Gravitas at VIT, Team Ardra showcased its autonomous drine systems to an enthusiastic audience over three days...",
    },
    {
      id: 3,
      name: "STAR PARTY",
      cover: "/Starparty.png",
      images: ["/Starparty-1.png", "/Starparty-2.png", "/Starparty-3..png"],
      description:
        "At the SEDS VIT Star Party (Sept 26–28), Team Ardra showcased a live drone flight...",
    },
    {
      id: 4,
      name: "ASTSF 2025",
      cover: "/ASTSF.png",
      images: ["/ASTSF-1.png", "/ASTSF-2.png"],
      description:
        "Team Ardra had the privilege of showcasing our innovations at the INYAS ASTSF 2025...",
    },
  ];

  useEffect(() => {
    if (!selectedEvent) return;

    const interval = setInterval(() => {
      const event = events.find((e) => e.id === selectedEvent);
      setCurrentSlide((prev) => (prev + 1) % event.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedEvent, events]);

  const selectedEventData = events.find((e) => e.id === selectedEvent);

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 text-[#f8f8e2]">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${
            selectedEvent ? "md:flex-row" : ""
          } gap-6 md:gap-8`}
        >
          {/* ================= MAIN VIEW ================= */}
          {selectedEvent && (
            <div className="flex-1">
              <div className="bg-[#231f1f] rounded-3xl overflow-hidden shadow-2xl">
                {/* SLIDESHOW */}
                <div className="relative aspect-video">
                  <img
                    src={selectedEventData.images[currentSlide]}
                    className="w-full h-full object-cover"
                  />

                  {/* MOBILE + DESKTOP CONTROLS (same logic, better touch on mobile) */}
                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (currentSlide - 1 + selectedEventData.images.length) %
                          selectedEventData.images.length
                      )
                    }
                    className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-black/60 p-4 md:p-3 rounded-full"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentSlide(
                        (currentSlide + 1) %
                          selectedEventData.images.length
                      )
                    }
                    className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-black/60 p-4 md:p-3 rounded-full"
                  >
                    <ChevronRight />
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-4 md:p-6">
                  <h2
                    className={`${audiowide.className} text-2xl md:text-3xl mb-4`}
                  >
                    {selectedEventData.name}
                  </h2>
                  <p className="font-nico text-base md:text-lg leading-relaxed">
                    {selectedEventData.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= EVENT LIST ================= */}
          <div
            className={
              selectedEvent
                ? `
                  md:w-96
                  flex md:flex-col
                  gap-4 md:gap-6
                  overflow-x-auto md:overflow-y-auto
                  md:h-[calc(100vh-6rem)]
                  pr-2
                `
                : `
                  grid grid-cols-2
                  gap-4 md:gap-8
                `
            }
          >
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event.id);
                  setCurrentSlide(0);
                }}
                className={`
                  cursor-pointer
                  rounded-xl
                  overflow-hidden
                  shadow-lg
                  transition-all
                  hover:scale-105
                  min-w-[70%] md:min-w-0
                  ${
                    selectedEvent === event.id
                      ? "ring-4 ring-blue-500"
                      : ""
                  }
                `}
              >
                <div className="aspect-video relative">
                  <img
                    src={event.cover}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                  <h3
                    className={`${audiowide.className} absolute bottom-3 left-3 right-3 text-sm md:text-lg`}
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
