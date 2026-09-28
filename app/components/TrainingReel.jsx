"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const CLIPS = [
  { src: "/img/train-1.mp4", label: "Coaching the lift" },
  { src: "/img/train-2.mp4", label: "Close-spot coaching" },
  { src: "/img/train-3.mp4", label: "Coaching, side by side" },
];

export default function TrainingReel() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="reel" ref={sectionRef}>
      <div className="wrap">
        <p className="eyebrow reveal" data-reveal>
          In Motion
        </p>
        <h2
          className="split-heading"
          style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 800, margin: "0 0 14px" }}
        >
          Real Sessions, Real Reps
        </h2>
      </div>
      <div className="wrap" style={{ marginTop: 40 }}>
        <div className="reel-grid">
          {CLIPS.map((c) => (
            <div className="reel-card reveal" data-reveal key={c.src}>
              <video
                src={c.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <span className="reel-tag">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
