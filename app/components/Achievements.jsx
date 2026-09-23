"use client";

import { useRef } from "react";
import { useScrollReveal, useMediaReveal } from "@/app/hooks/useScrollReveal";

export default function Achievements() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);
  useMediaReveal(sectionRef);

  return (
    <section className="ach" ref={sectionRef}>
      <div className="wrap">
        <div className="ach-photo reveal-media">
          <img
            src="/img/achievement.jpg"
            alt="Ravi at a competition with an award"
            loading="lazy"
            decoding="async"
          />
          <img
            src="/img/achievement-2.jpg"
            alt="Ravi flexing on stage at a bodybuilding competition"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="ach-copy">
          <p className="eyebrow reveal" data-reveal>
            Track Record
          </p>
          <h2 className="split-heading">Competed. Certified. Still Learning.</h2>
          <p className="reveal" data-reveal>
            Ravi has trained, competed on stage, and holds certifications in personal training —
            built on real anatomy knowledge, not a weekend course.
          </p>
          <div className="placeholder-chip reveal" data-reveal>
            <span className="dot" />
            Full certification &amp; competition list — coming soon
          </div>
        </div>
      </div>
    </section>
  );
}
