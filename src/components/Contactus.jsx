"use client";
import { useState } from "react";
import { Phone, MapPin, Mail, Instagram, Linkedin } from "lucide-react";
import Reveal, { SectionTitle } from "@/components/Reveal";

const CONTACT_EMAIL = "teamardra@vit.ac.in";
const PHONES = [
  { label: "+91 86103 79392", href: "tel:+918610379392" },
  { label: "+91 82813 82419", href: "tel:+918281382419" },
];

export default function Contactus() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend — open the user's mail client addressed to the team.
    const subject = encodeURIComponent(
      `Website enquiry from ${form.name || "a visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    // keep what they typed: if no mail app picks up the link, nothing is lost
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.05)] border-b border-white/15 focus:border-[var(--accent-2)] outline-none px-3 py-3 font-inter text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] rounded-t transition-colors";

  return (
    <section id="contact" className="relative w-full bg-black py-20 md:py-[120px] overflow-hidden noise">
      <div className="absolute inset-0 aurora" aria-hidden />
      <div className="absolute inset-0 hero-spotlight opacity-60" aria-hidden />
      <div className="relative z-10 mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionTitle index="/ 06" label="Get In Touch" title="Contact Us" />

        <div className="mt-14 grid lg:grid-cols-2 gap-12">
          {/* LEFT: details */}
          <Reveal from="left" className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-[var(--accent)] shrink-0 mt-1" size={22} />
              <div>
                <p className="font-space uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)] mb-1">
                  Address
                </p>
                <p className="font-inter text-[var(--text-primary)]">
                  VIT, Vellore Campus, Vellore, Tamil Nadu 632014
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-[var(--accent)] shrink-0 mt-1" size={22} />
              <div>
                <p className="font-space uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)] mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-block py-1.5 break-all font-inter text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-[var(--accent)] shrink-0 mt-1" size={22} />
              <div>
                <p className="font-space uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)] mb-1">
                  Phone
                </p>
                {PHONES.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="block py-1.5 font-inter text-[var(--text-primary)] hover:text-[var(--accent-2)] transition-colors"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-space uppercase tracking-[0.12em] text-xs text-[var(--text-secondary)] mb-3">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/teamardra"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="glass glass-hover w-11 h-11 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-2)]"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/company/team-ardra"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass glass-hover w-11 h-11 flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent-2)]"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: form */}
          <Reveal from="right">
            <form onSubmit={handleSubmit} className="glass p-7 md:p-9 flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="font-orbitron uppercase tracking-[0.12em] text-sm px-7 py-3 rounded text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_24px_rgba(30,111,255,0.45)]"
                style={{ background: "var(--accent)" }}
              >
                Send Message
              </button>
              {sent && (
                <p className="font-inter text-sm text-[var(--accent-2)]">
                  Opening your mail app… If nothing happened, write to us at {CONTACT_EMAIL}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
