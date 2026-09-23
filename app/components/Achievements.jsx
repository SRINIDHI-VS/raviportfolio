"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal, useMediaReveal } from "@/app/hooks/useScrollReveal";

export default function Achievements() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);
  useMediaReveal(sectionRef);

  return (
    <section className="ach" ref={sectionRef}>
      <div className="wrap">
        <div className="ach-photo reveal-media">
          <Image
            src="/img/achievement.jpg"
            alt="Ravi at a competition with an award"
            width={600}
            height={880}
            style={{ width: "100%", height: "auto" }}
          />
          <Image
            src="/img/achievement-2.jpg"
            alt="Ravi flexing on stage at a bodybuilding competition"
            width={600}
            height={880}
            style={{ width: "100%", height: "auto" }}
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
