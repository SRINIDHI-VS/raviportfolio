"use client";

import { useRef } from "react";
import { useSpecialtyChipsReveal } from "@/app/hooks/useScrollReveal";

const SPECIALTIES = [
  "Online Training",
  "Group Classes",
  "Body Transformation",
  "Weight Management",
  "Athletic Fitness",
  "Diet & Nutrition",
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
        {SPECIALTIES.map((label) => (
          <div className="specialty-chip reveal" key={label}>
            <span className="dot-icon">
              <CheckIcon />
            </span>
            <span className="chip-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
