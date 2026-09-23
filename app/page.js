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

      {/* Sections (Results, Gallery, How It Works, Achievements, Testimonials,
          final CTA, Footer) land here in Tasks 25-27. */}
      <div style={{ height: "60vh" }} />
    </>
  );
}
