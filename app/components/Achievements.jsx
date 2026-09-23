"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal, useMediaReveal } from "@/app/hooks/useScrollReveal";

const COMPETITIONS = [
  {
    photo: "/img/achievement.jpg",
    alt: "Ravi holding his certificate and trophy at CFS Classic 2026",
    name: "CFS Classic 2026",
    detail: "Mr. Karnataka · Bib #185",
  },
  {
    photo: "/img/achievement-2.jpg",
    alt: "Ravi on stage with his medal at the Garadi Classic 2026 championship",
    name: "Garadi Classic 2026",
    detail: "Major Classic · Best of 5",
  },
];

function MedalIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8 L32 27 L43 8" />
      <circle cx="32" cy="41" r="15" />
      <path d="M32 33 L36 41 L32 49 L28 41 Z" />
    </svg>
  );
}

export default function Achievements() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);
  useMediaReveal(sectionRef);

  return (
    <section className="ach" ref={sectionRef}>
      <div className="wrap">
        <div className="ach-photo reveal-media">
          {COMPETITIONS.map((c) => (
            <Image
              key={c.photo}
              src={c.photo}
              alt={c.alt}
              width={600}
              height={880}
              style={{ width: "100%", height: "auto" }}
            />
          ))}
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
          <div className="ach-results reveal" data-reveal>
            {COMPETITIONS.map((c) => (
              <div className="ach-result" key={c.name}>
                <span className="ach-result-icon">
                  <MedalIcon />
                </span>
                <span>
                  <strong>{c.name}</strong>
                  <span className="ach-result-detail">{c.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
