"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const SPECIALTIES = [
  { label: "Online Training", photo: null },
  { label: "Group Classes", photo: null },
  { label: "Body Transformation", photo: "/img/client-somashekar.jpg" },
  { label: "Weight Management", photo: "/img/gallery-6.jpg" },
  { label: "Athletic Fitness", photo: "/img/flex-location.jpg" },
  { label: "Diet & Nutrition", photo: null },
  { label: "Crossfit Friendly", photo: null },
  { label: "30/10 Tabata", photo: null },
  { label: "Strengthening", photo: "/img/svc-strength.jpg" },
  { label: "Stretching", photo: null },
  { label: "Animal Cardio", photo: null },
  { label: "Zumba", photo: null },
  { label: "Resistance Band", photo: "/img/svc-band.jpg" },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function SpecCard({ s }) {
  if (s.photo) {
    return (
      <div className="spec-card has-photo reveal" data-reveal>
        <Image
          src={s.photo}
          alt={s.label}
          fill
          sizes="(max-width: 820px) 46vw, (max-width: 1200px) 23vw, 280px"
          quality={85}
          style={{ objectFit: "cover" }}
        />
        <span className="spec-label">{s.label}</span>
      </div>
    );
  }
  return (
    <div className="spec-card icon-only reveal" data-reveal>
      <span className="spec-icon">
        <CheckIcon />
      </span>
      <span className="spec-label">{s.label}</span>
    </div>
  );
}

export default function Specialties() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="specialties" ref={sectionRef}>
      <div className="wrap">
        <div className="spec-grid">
          {SPECIALTIES.map((s) => (
            <SpecCard s={s} key={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
