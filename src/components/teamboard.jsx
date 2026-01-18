"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  { id: 1, name: "MEMBER ONE", role: "POSITION 1", image: "/team/team1.jpeg" },
  { id: 2, name: "MEMBER TWO", role: "POSITION 2", image: "/team/team2.jpeg" },
  { id: 3, name: "MEMBER THREE", role: "POSITION 3", image: "/team/team3.jpeg" },
  { id: 4, name: "MEMBER FOUR", role: "POSITION 4", image: "/team/team4.jpeg" },
  { id: 5, name: "MEMBER FIVE", role: "POSITION 5", image: "/team/team5.jpeg" },
];

// BoardCard component - only shows image
function BoardCard({ member, index, width, height }) {
  return (
    <div
      className="flex-shrink-0 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm"
      style={{ 
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <div className="w-full h-full flex items-center justify-center p-6">
        {/* Image only */}
        <div className="w-full h-full rounded-2xl flex items-center justify-center overflow-hidden">
          {/* show member image; fall back to a generic placeholder if missing */}
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// Custom hook for screen size
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  
  React.useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return screenSize;
};

export default function TeamBoard() {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const screenSize = useScreenSize();
  const [activeMember, setActiveMember] = useState(TEAM_MEMBERS[0]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const carousel = carouselRef.current;
    if (!container || !carousel) return;

    const cards = gsap.utils.toArray(carousel.children);
    const totalCards = cards.length;
    
    // Responsive card dimensions
    const cardWidth = screenSize === 'mobile' ? 280 : screenSize === 'tablet' ? 320 : 380;
    const cardGap = screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 40 : 80;
    const totalWidth = (cardWidth * totalCards) + (cardGap * (totalCards - 1));
    const containerWidth = container.offsetWidth;
    
    // Calculate initial offset to center the first card with buffer at start
    const bufferSpace = cardWidth * 0.5;
    const initialOffset = containerWidth / 2 - cardWidth / 2 + bufferSpace;
    
    // Calculate scroll distance with buffer at the end
    const scrollDistance = totalWidth - containerWidth + initialOffset + (cardWidth / 2) + bufferSpace;

    // Set initial position of carousel
    gsap.set(carousel, {
      x: initialOffset
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8,
        start: "center center",
        end: () => `+=${scrollDistance * 2}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const containerCenter = containerWidth / 2;
          let closestCard = null;
          let closestDistance = Infinity;
          
          requestAnimationFrame(() => {
            cards.forEach((card, idx) => {
              const cardRect = card.getBoundingClientRect();
              const containerRect = container.getBoundingClientRect();
              const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
              
              const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
              const clampedDistance = Math.min(distanceFromCenter, 1);
              
              // Track closest card to center
              const absoluteDistance = Math.abs(cardCenter - containerCenter);
              if (absoluteDistance < closestDistance) {
                closestDistance = absoluteDistance;
                closestCard = idx;
              }
              
              // Scale effect
              const minScale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.65 : 0.6;
              const maxScale = screenSize === 'mobile' ? 1.1 : screenSize === 'tablet' ? 1.25 : 1.4;
              const scaleCurve = 1 - Math.pow(clampedDistance, 1.4);
              const scale = minScale + (scaleCurve * (maxScale - minScale));
              
              // Opacity effect
              const minOpacity = screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.45 : 0.3;
              const maxOpacity = 1;
              const opacityCurve = 1 - Math.pow(clampedDistance, 0.75);
              const opacity = minOpacity + (opacityCurve * (maxOpacity - minOpacity));
              
              // Blur effect
              const maxBlur = screenSize === 'mobile' ? 1.5 : screenSize === 'tablet' ? 2.5 : 4;
              const blur = Math.pow(clampedDistance, 2) * maxBlur;
              
              // Y offset
              const maxYOffset = screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 35 : 55;
              const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
              
              // Rotation
              const maxRotation = screenSize === 'mobile' ? 0 : screenSize === 'tablet' ? 12 : 18;
              const rotationY = clampedDistance * maxRotation;
              
              gsap.set(card, {
                scale: scale,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                y: yOffset,
                zIndex: Math.round((1 - clampedDistance) * 100),
                transformOrigin: "center center",
                rotationY: rotationY,
              });
            });
            
            // Update active member based on closest card
            if (closestCard !== null && TEAM_MEMBERS[closestCard]) {
              setActiveMember(TEAM_MEMBERS[closestCard]);
            }
          });
        }
      }
    });

    tl.to(carousel, {
      x: initialOffset - scrollDistance,
      ease: "none",
      duration: 1
    });

    // Initial card effects setup
    const setupInitialCardEffects = () => {
      const containerCenter = containerWidth / 2;
      
      cards.forEach((card) => {
        const setupCard = () => {
          const cardRect = card.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2 - containerRect.left;
          const distanceFromCenter = Math.abs(cardCenter - containerCenter) / containerCenter;
          const clampedDistance = Math.min(distanceFromCenter, 1);
          
          const minScale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.65 : 0.6;
          const maxScale = screenSize === 'mobile' ? 1.1 : screenSize === 'tablet' ? 1.25 : 1.4;
          const scaleCurve = 1 - Math.pow(clampedDistance, 1.4);
          const scale = minScale + (scaleCurve * (maxScale - minScale));
          
          const minOpacity = screenSize === 'mobile' ? 0.6 : screenSize === 'tablet' ? 0.45 : 0.3;
          const opacity = minOpacity + ((1 - Math.pow(clampedDistance, 0.75)) * (1 - minOpacity));
          
          const blur = Math.pow(clampedDistance, 2) * (screenSize === 'mobile' ? 1.5 : screenSize === 'tablet' ? 2.5 : 4);
          const maxYOffset = screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 35 : 55;
          const yOffset = Math.sin(clampedDistance * Math.PI / 2) * maxYOffset;
          
          const maxRotation = screenSize === 'mobile' ? 0 : screenSize === 'tablet' ? 12 : 18;
          
          gsap.set(card, {
            scale: scale,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            y: yOffset,
            zIndex: Math.round((1 - clampedDistance) * 100),
            transformOrigin: "center center",
            rotationY: clampedDistance * maxRotation,
          });
        };
        
        requestAnimationFrame(() => {
          requestAnimationFrame(setupCard);
        });
      });
    };

    setTimeout(setupInitialCardEffects, 100);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [screenSize]);

  const getCardWidth = () => {
    return screenSize === 'mobile' ? 240 : screenSize === 'tablet' ? 280 : 320;
  };

  const getGap = () => {
    return screenSize === 'mobile' ? 20 : screenSize === 'tablet' ? 40 : 80;
  };

  const getCardHeight = () => {
    return screenSize === 'mobile' ? 200 : 350;
  };

  return (
    <section 
      ref={containerRef}
      className="font-nico relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20 bg-black"
    >
      {/* HEADER */}
      <div className="text-center mb-20">
        <h2
          className="font-nico text-6xl tracking-widest"
        >
          [THE BOARD]
        </h2>
      </div>
      
      {/* POSITION - Above carousel */}
      <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase mb-4 z-20 pointer-events-none transition-all duration-300">
        {activeMember.role}
      </p>

      {/* BG TRIANGLES - decorative triangles behind content */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <Image src="/board-triangles-right.png" alt="Decorative Triangles Left" width={400} height={400} className="absolute left-0 top-1/2 transform -translate-y-1/2" />
        <Image src="/board-triangles-left.png" alt="Decorative Triangles Right" width={400} height={400} className="absolute right-0 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* CAROUSEL CONTAINER */}
      <div className="z-10 relative w-full perspective-1000">
        <div className="w-full overflow-hidden flex items-center py-3 px-4">
          <div
            ref={carouselRef}
            className="flex items-center"
            style={{ 
              width: `${TEAM_MEMBERS.length * (getCardWidth() + getGap())}px`,
              gap: `${getGap()}px`,
              willChange: 'transform',
              transformStyle: 'preserve-3d'
            }}
          >
            {TEAM_MEMBERS.map((member, index) => (
              <BoardCard
                key={member.id}
                member={member}
                index={index}
                width={getCardWidth()}
                height={getCardHeight()}
              />
            ))}
          </div>
        </div>
      </div>

      {/* NAME - Below carousel */}
      <div className="z-20 mt-4 text-center pointer-events-none">
        <h3 className="text-white text-sm md:text-base tracking-widest uppercase transition-all duration-300">
          {activeMember.name}
        </h3>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/40 text-xs tracking-wider uppercase pointer-events-none">
        Scroll to explore 
      </div>
    </section>
  );
}