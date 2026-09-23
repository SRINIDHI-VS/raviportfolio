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
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

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

      <Chapter index={0} num="01 / 03 — Origin" word="Origin" photo="/img/gallery-6.jpg" />
      <Story />
      <Journey />
      <Approach />

      <Chapter index={1} num="02 / 03 — Proof" word="Proof" photo="/img/gallery-2.jpg" />
      <Results />
      <Gallery />
      <Works />

      <Chapter index={2} num="03 / 03 — Record" word="Record" photo="/img/gallery-3.jpg" />
      <Achievements />
      <Testimonials />

      <FinalCta />
      <Footer />
    </>
  );
}
