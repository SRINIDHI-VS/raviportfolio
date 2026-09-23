"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

export default function FinalCta() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="cta-section" ref={sectionRef}>
      <div className="wrap">
        <p className="eyebrow reveal" data-reveal>
          Ready?
        </p>
        <h2 className="reveal" data-reveal>
          Start Your
          <br />
          Journey Today.
        </h2>
        <p className="reveal" data-reveal>
          Enrollment takes less than five minutes — details, terms and payment, all in one place.
        </p>
        <a
          className="btn reveal magnetic"
          data-reveal
          href="https://ravindrafitness.netlify.app"
          target="_blank"
          rel="noopener"
          style={{ marginTop: 8 }}
        >
          Enroll Now →
        </a>
      </div>
    </section>
  );
}
