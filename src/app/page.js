import Hero from "@/components/Hero";
import About from "@/components/About";
import OurDrones from "@/components/OurDrones";
import MeetTheTeam from "@/components/MeetTheTeam";
import TeamBoard from "@/components/teamboard";
import Achievements from "@/components/Achivements";
import Maintimeline from "@/components/Maintimeline";
import Blogs from "@/components/blogs";
import Board from "@/components/Board";
import CompsAndSpons from "@/components/CompsAndSpons";
export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <About />
      {/* <OurDrones /> */}
      {/* <MeetTheTeam /> */}
      <Board/>
      <CompsAndSpons/>
      {/* <Achievements /> */}
      {/* <Blogs /> */}
      {/* <Maintimeline /> */}
    </div>
  )
}
