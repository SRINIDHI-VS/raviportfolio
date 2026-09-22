import AmbientDecor from "./components/AmbientDecor";
import Cursor from "./components/Cursor";
import SiteEffects from "./components/SiteEffects";
import Nav from "./components/Nav";
import WhatsAppFab from "./components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <SiteEffects />
      <AmbientDecor />
      <Cursor />
      <WhatsAppFab />
      <Nav />

      {/* Sections (Hero, Specialties, Story, Journey, Results, Gallery, How It Works,
          Achievements, Testimonials, final CTA, Footer) land here in Tasks 23-27. */}
      <div style={{ height: "150vh" }} />
    </>
  );
}
