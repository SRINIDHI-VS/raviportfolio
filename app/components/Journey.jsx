"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";
import { ScrollTrigger } from "@/app/lib/gsapClient";
import CompareSlider from "./CompareSlider";

const ANGLES = [
  { key: "front", label: "Front" },
  { key: "back", label: "Back" },
  { key: "side", label: "Side" },
];

const STEPS = ["Day One", "Few Months In", "Today"];

const IMAGES = {
  front: {
    1: "/img/journey-1.jpg",
    2: "/img/journey-2.jpg",
    3: "/img/journey-3.jpg",
    ratio: "ratio-journey",
  },
  back: {
    1: "/img/journey-back-1.jpg",
    2: "/img/journey-back-2.jpg",
    3: "/img/journey-back-3.jpg",
    ratio: "ratio-journey",
  },
  side: {
    1: "/img/side-1.jpg",
    2: "/img/side-2.jpg",
    3: "/img/side-3.jpg",
    ratio: "ratio-side",
  },
};

/**
 * Ravi's own multi-stage transformation, told through the draggable compare-sliders below — no
 * separate photo gallery alongside them, since showing the same three stages twice would just be
 * repetition. The Day One / Few Months In / Today stepper is the one "where am I in the story"
 * indicator, shared across all three angle tabs and kept in sync two ways: instantly by whichever
 * slider is actively being dragged (onPctChange below), and by scroll position otherwise (the
 * effect below) — so it's still correct if you just scroll past a slider without ever touching it.
 */
export default function Journey() {
  const sectionRef = useRef(null);
  const [activeAngle, setActiveAngle] = useState("front");
  useScrollReveal(sectionRef);

  function updateStepper(pct, fromIdx, toIdx) {
    const section = sectionRef.current;
    if (!section) return;
    const activeIdx = pct < 50 ? fromIdx : toIdx;
    section
      .querySelectorAll(".jp-dot")
      .forEach((d, i) => d.classList.toggle("active", i === activeIdx));
    section
      .querySelectorAll(".jp-label")
      .forEach((l, i) => l.classList.toggle("active", i === activeIdx));
    section
      .querySelectorAll(".jp-line")
      .forEach((l, i) => l.classList.toggle("filled", i < activeIdx));
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let ticking = false;

    function pickActiveStep() {
      const sliders = Array.from(section.querySelectorAll("[data-compare]"));
      const triggerY = window.innerHeight * 0.4;
      let best = null;
      let bestDist = Infinity;
      sliders.forEach((s) => {
        if (s.offsetParent === null) return; // in a hidden (inactive) angle panel
        const r = s.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return; // fully off-screen
        const dist = Math.abs(r.top + r.height / 2 - triggerY);
        if (dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      });
      if (best) {
        const pct = parseFloat(best.getAttribute("aria-valuenow")) || 50;
        updateStepper(
          pct,
          parseInt(best.getAttribute("data-stage-from"), 10),
          parseInt(best.getAttribute("data-stage-to"), 10)
        );
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        pickActiveStep();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", pickActiveStep);
    pickActiveStep();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", pickActiveStep);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAngle]);

  function handleAngleClick(key) {
    setActiveAngle(key);
    // the panel about to show was display:none (zero size) while any ScrollTrigger on it (the
    // reveal, the compare-slider demo nudge) was first set up, so their trigger positions need
    // recalculating now that it has real layout — otherwise those animations misfire.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  const stepperItems = [];
  STEPS.forEach((label, i) => {
    stepperItems.push(
      <div className="jp-step" key={`step-${i}`}>
        <span className={`jp-dot${i === 0 ? " active" : ""}`} />
        <span className={`jp-label${i === 0 ? " active" : ""}`}>{label}</span>
      </div>
    );
    if (i < STEPS.length - 1) {
      stepperItems.push(<span className="jp-line" key={`line-${i}`} />);
    }
  });

  return (
    <section id="journeySection" ref={sectionRef}>
      <div className="wrap" style={{ maxWidth: 640, margin: "0 auto 10px", textAlign: "center" }}>
        <p className="eyebrow reveal" data-reveal>
          Before He Trained Anyone Else
        </p>
        <h2 className="split-heading" style={{ fontSize: "clamp(30px,4.5vw,44px)", margin: "0 0 14px" }}>
          He Trained Himself First
        </h2>
        <p className="reveal" data-reveal style={{ color: "var(--muted)", fontSize: 15, margin: 0 }}>
          Not a before/after — a timeline. Drag Day One to A Few Months In, then A Few Months In
          to Today. Same process he now builds every client&apos;s program around.
        </p>
      </div>

      <div className="wrap">
        <div className="journey-sticky-bar reveal" data-reveal>
          <div className="journey-progress">{stepperItems}</div>

          <div className="angle-tabs" role="tablist">
            {ANGLES.map((a) => (
              <button
                key={a.key}
                type="button"
                className={`angle-tab${activeAngle === a.key ? " active" : ""}`}
                role="tab"
                aria-selected={activeAngle === a.key}
                onClick={() => handleAngleClick(a.key)}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {ANGLES.map((a) => {
          const imgs = IMAGES[a.key];
          return (
            <div
              key={a.key}
              className={`angle-panel${activeAngle === a.key ? " active" : ""}`}
              data-angle-panel={a.key}
            >
              <div className="step-compare-grid">
                <div className="compare-card reveal" data-reveal>
                  <CompareSlider
                    ratioClass={imgs.ratio}
                    stageFrom={0}
                    stageTo={1}
                    afterSrc={imgs[2]}
                    afterAlt={`Ravi, a few months in, ${a.key} view`}
                    beforeSrc={imgs[1]}
                    beforeAlt={`Ravi, day one, ${a.key} view`}
                    beforeTag="Day One"
                    afterTag="Few Months In"
                    ariaLabel={`Drag to compare Day One and A Few Months In, ${a.key} view`}
                    onPctChange={updateStepper}
                  />
                  <div className="cap">Day One → A Few Months In — {a.key}</div>
                </div>
                <div className="compare-card reveal" data-reveal>
                  <CompareSlider
                    ratioClass={imgs.ratio}
                    stageFrom={1}
                    stageTo={2}
                    afterSrc={imgs[3]}
                    afterAlt={`Ravi, today, ${a.key} view`}
                    beforeSrc={imgs[2]}
                    beforeAlt={`Ravi, a few months in, ${a.key} view`}
                    beforeTag="Few Months In"
                    afterTag="Today"
                    ariaLabel={`Drag to compare A Few Months In and Today, ${a.key} view`}
                    onPctChange={updateStepper}
                  />
                  <div className="cap">A Few Months In → Today — {a.key}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
