"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSpecialtyChipsReveal } from "@/app/hooks/useScrollReveal";

const SPECIALTIES = [
  { label: "Online Training", photo: "/img/svc-online-training.jpg" },
  { label: "Group Classes", photo: "/img/svc-group-classes.jpg" },
  { label: "Body Transformation", photo: "/img/svc-body-transformation.jpg" },
  { label: "Weight Management", photo: "/img/gallery-6.jpg" },
  { label: "Athletic Fitness", photo: "/img/svc-athletic-fitness.jpg" },
  { label: "Diet & Nutrition", photo: "/img/svc-diet-nutrition.jpg" },
  { label: "Crossfit Friendly", photo: "/img/svc-crossfit.jpg" },
  { label: "30/10 Tabata", photo: "/img/svc-tabata.jpg" },
  { label: "Strengthening", photo: "/img/svc-strengthening.jpg" },
  { label: "Stretching", photo: "/img/svc-stretching.jpg" },
  { label: "Animal Cardio", photo: "/img/svc-animal-cardio.jpg" },
  { label: "Zumba", photo: "/img/svc-zumba.jpg" },
  { label: "Resistance Band", photo: "/img/svc-resistance-band.jpg" },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Specialties() {
  const sectionRef = useRef(null);
  useSpecialtyChipsReveal(sectionRef);

  return (
    <section className="specialties" ref={sectionRef}>
      <div className="wrap">
        <div className="specialty-track">
          {SPECIALTIES.map((s) => (
            <div className="specialty-card reveal" key={s.label}>
              <Image
                src={s.photo}
                alt={s.label}
                fill
                sizes="(max-width:520px) 46vw, (max-width:900px) 40vw, 200px"
                style={{ objectFit: "cover" }}
              />
              <span className="specialty-scrim" />
              <span className="specialty-badge">
                <CheckIcon />
              </span>
              <span className="specialty-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
