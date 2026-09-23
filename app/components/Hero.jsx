"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

/**
 * Hero pin+scrub (desktop) / plain scrub (mobile) — ported from the vanilla site's hero timeline.
 * Desktop pins the whole section while the photo zooms, the cards/rings fade, and the copy
 * drifts up and out, ending on solid black just before the next section arrives. Mobile skips
 * the pin (unreliable on phone browsers) but keeps a lighter parallax so the section still feels
 * alive while scrolling past it, rather than static.
 */
function useHeroScrub(sectionRef) {
  useGSAP(
    () => {
      const isDesktop = window.innerWidth > 900;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      gsap.set("#heroPhoto img", { transformPerspective: 900 });

      if (isDesktop) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#heroSection",
              start: "top top",
              end: "+=140%",
              scrub: 0.6,
              pin: true,
            },
          })
          .to("#heroPhoto", { scale: 1.3, yPercent: -8, duration: 1, ease: "none" }, 0)
          .to(".hero-card", { opacity: 0, y: -26, duration: 0.35, ease: "none", stagger: 0.03 }, 0.05)
          .to(".hero-ring", { opacity: 0, scale: 1.3, duration: 0.4, ease: "none" }, 0.05)
          .to(".hero-copy", { yPercent: -40, opacity: 0, duration: 1, ease: "none" }, 0)
          .to("#scrollCue", { opacity: 0, duration: 0.15, ease: "none" }, 0)
          .to(".glow-a", { x: -160, y: 120, scale: 1.6, duration: 1, ease: "none" }, 0)
          .to("#heroSection", { backgroundColor: "#000", duration: 0.3, ease: "none" }, 0.7)
          .to("#heroPhoto", { opacity: 0, duration: 0.25, ease: "none" }, 0.75);
      } else {
        gsap.fromTo(
          "#heroPhoto img",
          { yPercent: -6, rotationY: -10 },
          {
            yPercent: 10,
            rotationY: 10,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
          }
        );
        gsap.to(".hero-ring", {
          rotate: 20,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 },
        });
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top-=60",
          once: true,
          onEnter: () => gsap.to("#scrollCue", { opacity: 0, duration: 0.3, ease: "none" }),
        });
      }
    },
    { scope: sectionRef, dependencies: [] }
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);
  useHeroScrub(sectionRef);

  return (
    <section className="hero" id="heroSection" ref={sectionRef}>
      <div className="glow glow-a" />
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow reveal" data-reveal>
            Bengaluru · Individual Training
          </p>
          <h1 className="reveal" data-reveal>
            Personal<span>Training,<br />Built Around You.</span>
          </h1>
          <p className="hero-tag reveal" data-reveal>
            One-on-one or group sessions — every plan is still built around you, not a template.
          </p>
          <div className="hero-cta-row reveal" data-reveal>
            <a
              className="btn magnetic"
              href="https://ravindrafitness.netlify.app"
              target="_blank"
              rel="noopener"
            >
              Start Your Journey →
            </a>
            <a className="btn-ghost magnetic" href="#story">
              His Story
            </a>
          </div>
        </div>
        <div className="hero-photo-stage reveal" data-reveal id="heroPhoto">
          <div className="hero-ring r1" />
          <div className="hero-ring r2" />
          <img src="/img/hero-cutout.webp" alt="Ravi, personal trainer" />
          <div className="hero-card hc1">
            <div className="n">8+</div>
            <div className="l">Yrs Experience</div>
          </div>
          <div className="hero-card hc2">
            <div className="n">1000+</div>
            <div className="l">Transformations</div>
          </div>
          <div className="hero-card hc3">
            <div className="n">1:1</div>
            <div className="l">Every Session</div>
          </div>
          <div className="hero-card hc4">
            <div className="n">100%</div>
            <div className="l">At Your Space</div>
          </div>
        </div>
      </div>
      <div className="scroll-cue" id="scrollCue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
