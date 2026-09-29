"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

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

const BELT_A = SPECIALTIES.slice(0, 7).map((s, i) => ({ ...s, num: i + 1 }));
const BELT_B = SPECIALTIES.slice(7).map((s, i) => ({ ...s, num: i + 8 }));

function PassCard({ s, dupKey }) {
  return (
    <div className="pass-card">
      <span className="pass-stub">
        <em>{String(s.num).padStart(2, "0")}</em>
      </span>
      <span className="pass-body">
        <span className="pass-thumb">
          <Image src={s.photo} alt={s.label} fill sizes="56px" style={{ objectFit: "cover" }} />
        </span>
        <span className="pass-name">{s.label}</span>
      </span>
    </div>
  );
}

function Belt({ items, direction }) {
  const doubled = [...items, ...items];
  return (
    <div className="pass-belt">
      <div className={`pass-track pass-track-${direction}`}>
        {doubled.map((s, i) => (
          <PassCard key={`${s.label}-${i}`} s={s} />
        ))}
      </div>
    </div>
  );
}

export default function Specialties() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="specialties" ref={sectionRef}>
      <div className="pass-belts" data-reveal>
        <Belt items={BELT_A} direction="a" />
        <Belt items={BELT_B} direction="b" />
      </div>
    </section>
  );
}
