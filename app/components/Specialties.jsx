"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSpecialtyChipsReveal } from "@/app/hooks/useScrollReveal";

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

export default function Specialties() {
  const sectionRef = useRef(null);
  useSpecialtyChipsReveal(sectionRef);

  return (
    <section className="specialties" ref={sectionRef}>
      <div className="wrap">
        {SPECIALTIES.map((s) => (
          <div className="specialty-chip reveal" key={s.label}>
            <span className="dot-icon">
              {s.photo ? (
                <Image src={s.photo} alt="" fill sizes="22px" style={{ objectFit: "cover" }} />
              ) : (
                <CheckIcon />
              )}
            </span>
            <span className="chip-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
