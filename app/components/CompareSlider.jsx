"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";

/**
 * Draggable before/after photo comparison. The drag itself is plain pointer/touch events plus
 * clip-path — no GSAP dependency — so it works even if the animation script fails to load,
 * exactly like the vanilla build. A one-time auto-drag "demo nudge" plays the first time each
 * slider scrolls into view, purely so a first-time visitor understands it's draggable before
 * they've touched it; the real drag logic works whether or not that nudge runs.
 *
 * `stageFrom`/`stageTo` and `onPctChange` are only used by the Journey timeline sliders, to keep
 * the shared Day One / Few Months In / Today stepper in sync with whichever slider is being
 * dragged — both are simply omitted by callers (like Real Results) that don't have a stepper.
 */
export default function CompareSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  beforeTag,
  afterTag,
  ratioClass,
  ariaLabel,
  stageFrom,
  stageTo,
  onPctChange,
}) {
  const rootRef = useRef(null);
  const beforeRef = useRef(null);
  const handleRef = useRef(null);
  const setPctRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const before = beforeRef.current;
    const handle = handleRef.current;
    if (!root || !before || !handle) return;

    let dragging = false;
    let initializing = true;

    function setPct(pct) {
      pct = Math.max(0, Math.min(100, pct));
      const clip = `inset(0 ${100 - pct}% 0 0)`;
      before.style.clipPath = clip;
      before.style.webkitClipPath = clip;
      handle.style.left = pct + "%";
      root.setAttribute("aria-valuenow", String(Math.round(pct)));
      if (onPctChange && !initializing) onPctChange(pct, stageFrom, stageTo);
    }
    setPctRef.current = setPct;

    function pctFromEvent(e) {
      const r = root.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      return (x / r.width) * 100;
    }
    function start(e) {
      dragging = true;
      root.classList.add("dragging");
      setPct(pctFromEvent(e));
      e.preventDefault();
    }
    function move(e) {
      if (!dragging) return;
      setPct(pctFromEvent(e));
      e.preventDefault();
    }
    function end() {
      dragging = false;
      root.classList.remove("dragging");
    }
    function onPointerDown(e) {
      if (root.setPointerCapture) {
        try {
          root.setPointerCapture(e.pointerId);
        } catch {
          // ignore — capture is a nicety, dragging still works without it
        }
      }
      start(e);
    }
    function onKeydown(e) {
      const cur = parseFloat(root.getAttribute("aria-valuenow")) || 50;
      if (e.key === "ArrowLeft") {
        setPct(cur - 4);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        setPct(cur + 4);
        e.preventDefault();
      } else if (e.key === "Home") {
        setPct(0);
        e.preventDefault();
      } else if (e.key === "End") {
        setPct(100);
        e.preventDefault();
      }
    }

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", end);
    root.addEventListener("pointercancel", end);
    root.addEventListener("touchstart", start, { passive: false });
    root.addEventListener("touchmove", move, { passive: false });
    root.addEventListener("touchend", end);
    root.addEventListener("keydown", onKeydown);

    setPct(50);
    initializing = false;

    return () => {
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", end);
      root.removeEventListener("pointercancel", end);
      root.removeEventListener("touchstart", start);
      root.removeEventListener("touchmove", move);
      root.removeEventListener("touchend", end);
      root.removeEventListener("keydown", onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const obj = { v: 50 };
          gsap.to(obj, {
            v: 32,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.inOut",
            onUpdate: () => setPctRef.current?.(obj.v),
            onComplete: () => {
              gsap.to(obj, {
                v: 68,
                duration: 0.7,
                ease: "power2.inOut",
                onUpdate: () => setPctRef.current?.(obj.v),
                onComplete: () => {
                  gsap.to(obj, {
                    v: 50,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onUpdate: () => setPctRef.current?.(obj.v),
                  });
                },
              });
            },
          });
        },
      });
    },
    { scope: rootRef, dependencies: [] }
  );

  return (
    <div
      className={`compare-slider${ratioClass ? ` ${ratioClass}` : ""}`}
      data-compare
      data-stage-from={stageFrom}
      data-stage-to={stageTo}
      ref={rootRef}
      tabIndex={0}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
    >
      <img src={afterSrc} alt={afterAlt} loading="lazy" decoding="async" />
      <div className="compare-before" ref={beforeRef}>
        <img src={beforeSrc} alt={beforeAlt} loading="lazy" decoding="async" />
      </div>
      <span className="compare-tag compare-tag-before">{beforeTag}</span>
      <span className="compare-tag compare-tag-after">{afterTag}</span>
      <div className="compare-handle" ref={handleRef}>
        <div className="compare-handle-line" />
        <div className="compare-handle-grip">⇔</div>
      </div>
    </div>
  );
}
