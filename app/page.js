import dynamic from "next/dynamic";
import AmbientDecor from "./components/AmbientDecor";
import Cursor from "./components/Cursor";
import SiteEffects from "./components/SiteEffects";
import LoadingScreen from "./components/LoadingScreen";
import Nav from "./components/Nav";
import WhatsAppFab from "./components/WhatsAppFab";
import Hero from "./components/Hero";

// Everything below is below the initial viewport. Splitting it into its own JS chunks (instead
// of one bundle with Hero/Nav) keeps the script the phone has to parse and run before it can
// paint the hero section small — that upfront script cost was the biggest piece of the page's
// load-speed problem. HTML for all of it is still fully server-rendered (ssr defaults to true),
// so nothing is missing from the page or search engines; only when each section's own JS wires
// up is deferred a little.
const Specialties = dynamic(() => import("./components/Specialties"));
const Chapter = dynamic(() => import("./components/Chapter"));
const Story = dynamic(() => import("./components/Story"));
const Journey = dynamic(() => import("./components/Journey"));
const Approach = dynamic(() => import("./components/Approach"));
const Results = dynamic(() => import("./components/Results"));
const Gallery = dynamic(() => import("./components/Gallery"));
const Works = dynamic(() => import("./components/Works"));
const Achievements = dynamic(() => import("./components/Achievements"));
const Testimonials = dynamic(() => import("./components/Testimonials"));
const FinalCta = dynamic(() => import("./components/FinalCta"));
const Footer = dynamic(() => import("./components/Footer"));

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
