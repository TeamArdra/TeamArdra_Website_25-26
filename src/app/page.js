import Hero from "@/components/Hero";
import About from "@/components/About";
import OurDrones from "@/components/OurDrones";
import MeetTheTeam from "@/components/MeetTheTeam";
import TeamBoard from "@/components/teamboard";
import Achievements from "@/components/Achivements";
import Maintimeline from "@/components/Maintimeline";
import Blogs from "@/components/blogs";
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <OurDrones />
      <MeetTheTeam />
      <TeamBoard />
      <Achievements />
      <Blogs />
      <Maintimeline />
    </>
  )
}
