"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsapClient";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

function useWorksParallax(sectionRef) {
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      gsap.fromTo(
        "#worksBg",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );
}

export default function Works() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);
  useWorksParallax(sectionRef);

  return (
    <section className="works" ref={sectionRef}>
      <div className="works-bg" id="worksBg">
        <picture>
          <source media="(max-width: 900px)" srcSet="/img/flex-location-mobile.jpg" />
          <img src="/img/flex-location.jpg" alt="Ravi training outdoors" loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="wrap works-content">
        <p className="eyebrow reveal" data-reveal>
          How It Works
        </p>
        <h2 className="split-heading">He Trains You Wherever You Are</h2>
        <p className="reveal" data-reveal>
          No gym membership required. Ravi comes to your apartment or your own gym, so training
          fits your life — not the other way around.
        </p>
        <div className="placeholder-chip reveal" data-reveal>
          <span className="dot" />
          Service areas &amp; weekly availability — coming soon
        </div>
      </div>
    </section>
  );
}
