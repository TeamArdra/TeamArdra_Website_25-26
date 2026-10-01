import Hero from "@/components/Hero";
import About from "@/components/About";
import Board from "@/components/Board";
import OurDrones from "@/components/OurDrones";
import Achievements from "@/components/Achivements";
import CompsAndSpons from "@/components/CompsAndSpons";
import EventGallery from "@/components/EventGallery";
import Contactus from "@/components/Contactus";
import { SITE_URL } from "./site";

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Team Ardra",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  email: "teamardra@vit.ac.in",
  sameAs: [
    "https://www.instagram.com/teamardra",
    "https://www.linkedin.com/company/team-ardra",
  ],
  parentOrganization: { "@type": "Organization", name: "SEDS VIT", url: "https://sedsvit.in" },
};

function Divider() {
  return (
    <div className="relative bg-black">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="glow-divider" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
      />
      <Hero />
      <About />
      <Divider />
      <Board />
      <Divider />
      <OurDrones />
      <Divider />
      <Achievements />
      <Divider />
      <CompsAndSpons />
      <Divider />
      <EventGallery />
      <Divider />
      <Contactus />
    </div>
  );
}
