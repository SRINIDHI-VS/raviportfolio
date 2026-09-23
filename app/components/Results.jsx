"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import CompareSlider from "./CompareSlider";

export default function Results() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section id="results" ref={sectionRef}>
      <div className="wrap">
        <p className="eyebrow reveal" data-reveal>
          Real Results
        </p>
        <h2
          className="split-heading"
          style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 800, margin: 0, maxWidth: "22ch" }}
        >
          1000+ Transformations. A Few, Right Here.
        </h2>
        <p className="reveal" data-reveal style={{ color: "var(--muted)", fontSize: 15, marginTop: 14 }}>
          Real clients, real timelines — not stock photos. Drag the handle.
        </p>
        <div className="compare-grid">
          <div className="compare-card reveal" data-reveal>
            <CompareSlider
              afterSrc="/img/ba1-after.jpg"
              afterAlt="After — side profile"
              beforeSrc="/img/ba1-before.jpg"
              beforeAlt="Before — side profile"
              beforeTag="Before"
              afterTag="After"
              ariaLabel="Drag to compare before and after, side profile"
            />
            <div className="cap">Client transformation — side profile, full program</div>
          </div>
          <div className="compare-card reveal" data-reveal>
            <CompareSlider
              afterSrc="/img/ba2-after.jpg"
              afterAlt="After — front view"
              beforeSrc="/img/ba2-before.jpg"
              beforeAlt="Before — front view"
              beforeTag="Before"
              afterTag="After"
              ariaLabel="Drag to compare before and after, front view"
            />
            <div className="cap">Client transformation — front view, full program</div>
          </div>
          <div className="compare-card reveal static-card" data-reveal>
            <Image
              className="static-photo"
              src="/img/client-somashekar.jpg"
              alt="Client transformation, 9-month progress grid, month 1 through month 9"
              width={540}
              height={713}
              quality={90}
              style={{ width: "100%", height: "auto" }}
            />
            <div className="cap">Client transformation — 9-month progress, month by month</div>
          </div>
        </div>
      </div>
    </section>
  );
}
