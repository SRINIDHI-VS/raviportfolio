"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { CONTACT } from "@/app/lib/siteConfig";

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
        <p className="reveal" data-reveal style={{ fontSize: 14 }}>
          Every program is priced around your goals, schedule and location — no fixed packages.
          You&apos;ll know the exact cost before you commit to anything.
        </p>
        <a
          className="btn reveal magnetic"
          data-reveal
          href={CONTACT.enrollUrl}
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
