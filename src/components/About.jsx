"use client";
import Image from "next/image";
import Reveal, { SectionTitle } from "@/components/Reveal";

const STATS = [
  { label: "Established", value: "2019" },
  { label: "Chapter", value: "SEDS VIT" },
  { label: "Institution", value: "VIT Vellore" },
  { label: "Domains", value: "UAVs" },
  { label: "Main Specialty", value: "Autonomous Drones" },
  { label: "Team Size", value: "16" },
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-black py-20 md:py-[120px] overflow-hidden noise">
      <div className="absolute inset-0 aurora-soft" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionTitle index="/ 01" label="Who We Are" title="About Us" align="left" />

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: text + stats */}
          <div>
            <Reveal from="up">
              <p className="font-sora font-light text-[var(--text-secondary)] text-base md:text-lg leading-[1.95] tracking-[0.01em] max-w-xl">
                Team Ardra was founded to foster technical innovation in aviation
                at VIT. Comprising dedicated students, the team designs, develops,
                and deploys UAVs, aiming to advance technology while honing
                aerospace and autonomy skills.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} from="up" delay={i * 0.08}>
                  <div className="glass glass-hover p-5 h-full">
                    <p className="font-mono text-[var(--accent-2)]/70 text-[0.62rem] uppercase tracking-[0.18em]">
                      {stat.label}
                    </p>
                    <p className="font-orbitron text-[var(--text-primary)] text-lg md:text-xl mt-2 leading-tight">
                      {stat.value}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT: image */}
          <Reveal from="right" className="relative">
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                border: "1px solid rgba(30,111,255,0.4)",
                boxShadow: "0 0 40px rgba(30,111,255,0.2)",
              }}
            >
              <Image
                src="/Main.jpeg"
                alt="Team Ardra members with their drone"
                width={720}
                height={520}
                className="w-full h-auto object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
