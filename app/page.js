import AmbientDecor from "./components/AmbientDecor";
import Cursor from "./components/Cursor";
import SiteEffects from "./components/SiteEffects";
import LoadingScreen from "./components/LoadingScreen";
import Nav from "./components/Nav";
import WhatsAppFab from "./components/WhatsAppFab";
import Hero from "./components/Hero";
import Specialties from "./components/Specialties";
import Chapter from "./components/Chapter";
import Story from "./components/Story";
import Journey from "./components/Journey";
import Approach from "./components/Approach";
import Results from "./components/Results";
import Gallery from "./components/Gallery";
import Works from "./components/Works";
import Achievements from "./components/Achievements";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SiteEffects />
      <AmbientDecor />
      <Cursor />
      <WhatsAppFab />
      <Nav />

      <Hero />
      <Specialties />

      <Chapter index={0} num="01 / 05 — Origin" word="Origin" />
      <Story />
      <Journey />

      <Chapter index={1} num="02 / 05 — Philosophy" word="Philosophy" />
      <Approach />

      <Chapter index={2} num="03 / 05 — Proof" word="Proof" />
      <Results />

      <Chapter index={3} num="04 / 05 — In Action" word="In Action" />
      <Gallery />
      <Works />

      <Chapter index={4} num="05 / 05 — Record" word="Record" />
      <Achievements />
      <Testimonials />

      {/* final CTA + Footer land here in Task 27. */}
      <div style={{ height: "60vh" }} />
    </>
  );
}
