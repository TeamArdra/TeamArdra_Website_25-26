"use client";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import Reveal, { SectionTitle } from "@/components/Reveal";

/* ============================================================
   BOARD MEMBERS  ⟵  EDIT HERE
   ------------------------------------------------------------
   To add a real member, just fill in the fields below.
   • name      : displayed name
   • role      : their position on the board
   • image     : path to a photo in /public (e.g. "/team/team1.jpeg")
                 To add a NEW photo: drop the file into /public/team/
                 then point `image` at it, e.g. "/team/captain.jpeg"
   • instagram : full profile URL (or "" to hide the icon)
   • linkedin  : full profile URL (or "" to hide the icon)
   Add or remove objects freely — the grid reflows automatically.
   ============================================================ */
const BOARD = [
  {
    name: "Siddharth",
    role: "Captain",
    image: "/team/Sid.jpeg",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Rishit Sinha",
    role: "Vice Captain",
    image: "/team/Rish.jpeg",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Sahana",
    role: "Mechanical Lead",
    image: "/team/Sahana.jpeg",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Anmol",
    role: "Software Lead",
    image: "/team/Anmol.jpeg",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Mohak",
    role: "Autonomous Lead",
    image: "/team/Mohak.jpeg",
    instagram: "",
    linkedin: "",
  },
  {
    name: "Divyansh",
    role: "Electrical Lead",
    image: "/team/Div1.jpeg",
    instagram: "",
    linkedin: "",
  },
];

function BoardCard({ member }) {
  return (
    <div className="glass glass-hover group relative overflow-hidden h-full">
      {/* photo */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* gradient scrim */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,15,0) 40%, rgba(10,10,15,0.55) 75%, rgba(10,10,15,0.92) 100%)",
          }}
        />
        {/* accent sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(160deg, rgba(30,111,255,0.18), transparent 55%)",
          }}
        />

        {/* role chip */}
        <span
          className="absolute top-4 left-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] px-3 py-1 rounded-full text-[var(--accent-2)]"
          style={{
            background: "rgba(8,9,15,0.72)",
            border: "1px solid rgba(77,166,255,0.35)",
          }}
        >
          {member.role}
        </span>
      </div>

      {/* name + socials */}
      <div className="p-5 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-space font-bold text-[var(--text-primary)] text-lg leading-tight">
            {member.name}
          </h3>
          <p className="font-mono text-[var(--text-secondary)] text-[0.7rem] mt-1 tracking-wide">
            {member.role}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Instagram`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-2)] transition-colors"
            >
              <Instagram size={18} />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-2)] transition-colors"
            >
              <Linkedin size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Board() {
  return (
    <section id="board" className="relative w-full bg-black py-20 md:py-[120px] overflow-hidden noise">
      {/* gradient backdrop */}
      <div className="absolute inset-0 aurora" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 45%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionTitle index="/ 02" label="The People" title="Meet The Board" />

        <Reveal from="up" className="text-center mt-5">
          <p className="font-sora font-light text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-[1.9]">
            Behind every flight is a team that builds, breaks, and rebuilds. These
            are the people steering Team Ardra through every late night in the lab
            and every competition runway.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BOARD.map((member, i) => (
            <Reveal
              key={i}
              from={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
              delay={(i % 3) * 0.12}
            >
              <BoardCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
