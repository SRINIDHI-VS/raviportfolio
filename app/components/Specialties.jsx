"use client";

import { useEffect, useRef } from "react";
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

const BELT_SPEED = 34; // px/second

/**
 * Auto-advances a `.pass-belt` scroll container along its own real `scrollLeft` (not a CSS
 * `transform` animation) so the belt stays genuinely scrollable by hand the whole time — hovering,
 * click-and-dragging with a mouse, or touch-swiping all just take over the same `scrollLeft` the
 * auto-loop was driving. The belt's content is duplicated by the caller, so wrapping at the
 * halfway point loops seamlessly in either direction. Never fights native touch scrolling: while
 * a finger is down the loop simply stops nudging `scrollLeft` and lets the browser's own touch
 * scroll (with its momentum) run untouched, resuming only after a short grace period once the
 * finger lifts. `prefers-reduced-motion` skips the loop entirely; the belt is still fully
 * scrollable by hand either way.
 */
function useMarqueeBelt(ref, direction) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverCapable = window.matchMedia("(hover: hover)").matches;
    const half = () => el.scrollWidth / 2;

    el.scrollLeft = direction === 1 ? 0 : half();

    let hovering = false;
    let dragging = false;
    let touching = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let touchGraceUntil = 0;
    let lastTs = null;
    let raf = requestAnimationFrame(frame);

    function frame(ts) {
      if (lastTs == null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const paused =
        reduceMotion || hovering || dragging || touching || performance.now() < touchGraceUntil;
      if (!paused) {
        const h = half();
        if (direction === 1) {
          el.scrollLeft += BELT_SPEED * dt;
          if (el.scrollLeft >= h) el.scrollLeft -= h;
        } else {
          el.scrollLeft -= BELT_SPEED * dt;
          if (el.scrollLeft <= 0) el.scrollLeft += h;
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function onMouseEnter() {
      hovering = true;
    }
    function onMouseLeave() {
      hovering = false;
      if (dragging) {
        dragging = false;
        el.classList.remove("is-dragging");
      }
    }
    function onMouseDown(e) {
      dragging = true;
      el.classList.add("is-dragging");
      dragStartX = e.pageX;
      dragStartScroll = el.scrollLeft;
    }
    function onMouseMove(e) {
      if (!dragging) return;
      e.preventDefault();
      el.scrollLeft = dragStartScroll - (e.pageX - dragStartX);
    }
    function onMouseUp() {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
    }
    function onTouchStart() {
      touching = true;
    }
    function onTouchEnd() {
      touching = false;
      touchGraceUntil = performance.now() + 500;
    }

    if (hoverCapable) {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref, direction]);
}

function PassCard({ s }) {
  return (
    <div className="pass-card">
      <span className="pass-stub">
        <em>{String(s.num).padStart(2, "0")}</em>
      </span>
      <span className="pass-body">
        <span className="pass-thumb">
          <Image
            src={s.photo}
            alt={s.label}
            fill
            sizes="56px"
            draggable={false}
            style={{ objectFit: "cover" }}
          />
        </span>
        <span className="pass-name">{s.label}</span>
      </span>
    </div>
  );
}

function Belt({ items, direction }) {
  const beltRef = useRef(null);
  useMarqueeBelt(beltRef, direction === "a" ? 1 : -1);
  const doubled = [...items, ...items];
  return (
    <div className="pass-belt" ref={beltRef}>
      <div className="pass-track">
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
