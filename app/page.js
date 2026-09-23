import AmbientDecor from "./components/AmbientDecor";
import Cursor from "./components/Cursor";
import SiteEffects from "./components/SiteEffects";
import LoadingScreen from "./components/LoadingScreen";
import Nav from "./components/Nav";
import WhatsAppFab from "./components/WhatsAppFab";
import Hero from "./components/Hero";
import Specialties from "./components/Specialties";

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

      {/* Sections (Story, Journey, Results, Gallery, How It Works, Achievements,
          Testimonials, final CTA, Footer) land here in Tasks 24-27. */}
      <div style={{ height: "60vh" }} />
    </>
  );
}
