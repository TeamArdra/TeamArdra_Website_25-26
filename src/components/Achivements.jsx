"use client";
import Image from "next/image";
import Reveal, { SectionTitle } from "@/components/Reveal";

const TIMELINE = [
  {
    year: "2026",
    items: [
      {
        title: "Finalists in ISDC '26",
        desc: "Team Ardra qualified as finalists at ISDC 2026, carrying forward the team's strong track record in autonomous flight and mission execution against the best student teams in the country.",
        images: ["/Main.jpeg"],
        side: "right",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Finalist of Geo-AI Hackathon, Techfest (IIT Bombay)",
        desc: "Team Ardra participated in the Geo-AI Hackathon at IIT Bombay's Techfest, developing geospatial machine learning pipelines for rural infrastructure mapping using aerial imagery.",
        images: ["/tf-1a.png", "/tf-2a.png"],
      },
      {
        title: "9th Place in ISDC'25",
        desc: "Secured 9th place at ISDC Goa 2025, showcasing strong performance in autonomous flight and drone operations among top student teams.",
        images: ["/isdc25-1a.png", "/isdc25-2a.png"],
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        title: "Winners of ISDC'24",
        desc: "Winners of ISDC '24, demonstrating excellence in autonomous drone systems and mission execution.",
        images: ["/isdc-1a.png", "/isdc-2a.png"],
      },
      {
        title: "Cognizance IITR Finals '24",
        desc: "Qualified for the Cognizance IIT Roorkee Finals 2024, demonstrating reliable system design and execution.",
        images: [],
      },
    ],
  },
  {
    year: "2021",
    items: [
      {
        title: "Finals SUAS '21 USA",
        desc: "Finalists at SUAS 2021 (USA), competing in autonomous unmanned aircraft mission challenges.",
        images: ["/suas-1a.png"],
      },
      {
        title: "3rd Place IPAS'21",
        desc: "Secured 3rd place at IPAS 2021, demonstrating strong technical performance and system reliability.",
        images: ["/ipas-1a.png", "/ipas-2a.png"],
      },
    ],
  },
];

function AchievementCard({ item, side }) {
  return (
    <div className="glass glass-hover p-6">
      {item.images.length > 0 && (
        <div className="flex gap-3 mb-4">
          {item.images.map((src) => (
            <div
              key={src}
              className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden border border-white/10 shrink-0"
            >
              <Image
                src={src}
                alt={item.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <h3 className="font-space font-bold text-[var(--text-primary)] text-lg leading-snug">
        {item.title}
      </h3>
      <p className="font-sora font-light text-[var(--text-secondary)] text-[0.95rem] mt-3 leading-[1.85] tracking-[0.01em]">
        {item.desc}
      </p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative w-full py-20 md:py-[120px] overflow-hidden"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="absolute inset-0 aurora-soft" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionTitle index="/ 04" label="Track Record" title="Our Achievements" />

        <div className="relative mt-16">
          {/* center vertical line (desktop) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{ background: "rgba(30,111,255,0.3)" }}
            aria-hidden
          />
          {/* left vertical line (mobile) */}
          <div
            className="md:hidden absolute left-4 top-0 bottom-0 w-px"
            style={{ background: "rgba(30,111,255,0.3)" }}
            aria-hidden
          />

          {TIMELINE.map((group) => (
            <div key={group.year} className="mb-16 last:mb-0">
              {/* year node */}
              <Reveal from="up" className="relative flex md:justify-center mb-10">
                <div
                  className="relative z-10 ml-12 md:ml-0 px-5 py-2 rounded-full"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid rgba(30,111,255,0.4)",
                    boxShadow: "0 0 25px rgba(30,111,255,0.2)",
                  }}
                >
                  <span className="font-orbitron text-2xl md:text-3xl text-[var(--accent)] tracking-wider">
                    {group.year}
                  </span>
                </div>
              </Reveal>

              {/* alternating items */}
              <div className="flex flex-col gap-8">
                {group.items.map((item, i) => {
                  const side = item.side || (i % 2 === 0 ? "left" : "right");
                  return (
                    <div
                      key={item.title}
                      className="relative md:grid md:grid-cols-2 md:gap-12 items-center"
                    >
                      {/* node dot */}
                      <span
                        className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-3 h-3 rounded-full z-10"
                        style={{
                          background: "var(--accent)",
                          boxShadow: "0 0 12px rgba(30,111,255,0.8)",
                        }}
                        aria-hidden
                      />
                      {side === "left" ? (
                        <>
                          <Reveal from="left" className="md:pr-4 pl-12 md:pl-0">
                            <AchievementCard item={item} side={side} />
                          </Reveal>
                          <div className="hidden md:block" />
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block" />
                          <Reveal from="right" className="md:pl-4 pl-12 md:pl-0">
                            <AchievementCard item={item} side={side} />
                          </Reveal>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
