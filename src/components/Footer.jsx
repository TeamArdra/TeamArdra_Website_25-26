import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

const NAV = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Our Drones", href: "#drones" },
  { name: "Achievements", href: "#achievements" },
  { name: "Events & Outreach", href: "#events" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="w-full bg-black"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* logo + tagline */}
          <div>
            <Image
              src="/logo.png"
              alt="Team Ardra logo"
              width={110}
              height={48}
              className="object-contain h-12 w-auto"
              style={{ width: "auto" }}
            />
            <p className="font-space text-[var(--text-secondary)] text-sm mt-4 max-w-xs">
              Throttling towards excellence — the UAV team of SEDS VIT Vellore.
            </p>
          </div>

          {/* quick nav */}
          <div>
            <h4 className="font-space uppercase tracking-[0.12em] text-xs text-[var(--text-primary)] mb-4">
              Navigate
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {NAV.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-space text-sm text-[var(--text-secondary)] hover:text-[var(--accent-2)] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* social */}
          <div>
            <h4 className="font-space uppercase tracking-[0.12em] text-xs text-[var(--text-primary)] mb-4">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/teamardra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="glass glass-hover w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-2)]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/team-ardra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass glass-hover w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-2)]"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-space text-xs text-[var(--text-secondary)] tracking-wide">
            © 2026 Team Ardra · SEDS VIT Vellore · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
