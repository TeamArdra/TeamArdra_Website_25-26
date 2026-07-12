import Hero from "@/components/Hero";
import About from "@/components/About";
import Board from "@/components/Board";
import OurDrones from "@/components/OurDrones";
import Achievements from "@/components/Achivements";
import CompsAndSpons from "@/components/CompsAndSpons";
import EventGallery from "@/components/EventGallery";
import Contactus from "@/components/Contactus";
import Footer from "@/components/Footer";

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
      <Footer />
    </div>
  );
}
