"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsapClient";
import { useScrollReveal, useDeferredReady } from "@/app/hooks/useScrollReveal";
import { whatsappLink } from "@/app/lib/siteConfig";

function useWorksParallax(sectionRef) {
  const ready = useDeferredReady();
  useGSAP(
    () => {
      if (!ready) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      gsap.fromTo(
        "#worksBg",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [ready] }
  );
}

export default function Works() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);
  useWorksParallax(sectionRef);

  return (
    <section className="works" ref={sectionRef}>
      <div className="works-bg" id="worksBg">
        <picture>
          <source media="(max-width: 900px)" srcSet="/img/gallery-9.jpg" />
          <img src="/img/flex-location.jpg" alt="Ravi training in the gym" loading="lazy" decoding="async" />
        </picture>
      </div>
      <div className="wrap works-content">
        <p className="eyebrow reveal" data-reveal>
          How It Works
        </p>
        <h2 className="split-heading">He Trains You Wherever You Are</h2>
        <p className="reveal" data-reveal>
          No gym membership required. Ravi comes to your apartment or your own gym, so training
          fits your life — not the other way around.
        </p>
        <a
          className="footer-chip reveal"
          data-reveal
          href={whatsappLink(
            "Hi Ravi! I wanted to check if you train in my area and your current availability."
          )}
          target="_blank"
          rel="noopener"
        >
          <span className="fc-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
              <path d="M8.5 9.5c.3 3 2.8 5.5 5.8 5.8" strokeLinecap="round" />
            </svg>
          </span>
          Check availability for your area &amp; schedule
        </a>
      </div>
    </section>
  );
}
