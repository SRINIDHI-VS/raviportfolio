"use client";

import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    filled: true,
    quote:
      "I've been training with Ravindra for a while now, and what I love most about his approach is how personalised his workouts are. He really pays attention to my energy levels, how my body is responding, my strengths and weaknesses, and adapts the workout accordingly. He pushes me when I can handle it, but also knows when to ease off, which has helped me build strength and confidence without feeling overwhelmed. He is very attentive to form and technique, and somehow manages to make even the workouts I dread enjoyable. I genuinely look forward to training with him and would highly recommend him to anyone looking for a trainer who actually understands and works with the person in front of him.",
    attribution: "Verified client · WhatsApp",
  },
  { filled: false },
  { filled: false },
];

function TestiCard({ t, hidden }) {
  if (!t.filled) {
    return (
      <div className="testi-card" aria-hidden={hidden ? "true" : undefined}>
        <div className="qmark disp">&quot;</div>
        <div className="soon">Testimonial coming soon</div>
      </div>
    );
  }
  return (
    <div className="testi-card filled" aria-hidden={hidden ? "true" : undefined}>
      <div className="qmark disp">&quot;</div>
      <div className="testi-stars" aria-label={hidden ? undefined : "Rated 5 out of 5"}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.5l-6.2 3.9 1.6-7L2 9.7l7.1-.6L12 2.5z" />
          </svg>
        ))}
      </div>
      <div className="testi-quote-wrap">
        <p className="testi-quote">{t.quote}</p>
      </div>
      <div className="testi-attr">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
          <path d="M8.5 9.5c.3 3 2.8 5.5 5.8 5.8" strokeLinecap="round" />
        </svg>
        {t.attribution}
      </div>
    </div>
  );
}

/**
 * Testimonials — auto-scrolls continuously, but hands control to the visitor: drag/swipe,
 * mouse-wheel, or the prev/next buttons all pause the auto-scroll, which resumes a couple of
 * seconds after they let go. The track renders every card twice (the second copy aria-hidden) so
 * scrollLeft can wrap at the halfway point for a seamless loop — plain native scroll, no GSAP
 * dependency, ported as-is from the vanilla site.
 */
function useTestiMarquee(marqueeRef) {
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const scrollEl = marquee.querySelector(".testi-scroll");
    const track = marquee.querySelector(".testi-track");
    if (!scrollEl || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let half = 0;
    function computeHalf() {
      half = track.scrollWidth / 2;
    }
    computeHalf();

    let ro;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(computeHalf);
      ro.observe(track);
    } else {
      window.addEventListener("resize", computeHalf);
    }

    scrollEl.scrollLeft = 1; // nudge off zero so the "wrap backward" branch can fire too

    function wrapScroll() {
      if (half <= 0) return;
      if (scrollEl.scrollLeft >= half) scrollEl.scrollLeft -= half;
      else if (scrollEl.scrollLeft <= 0) scrollEl.scrollLeft += half;
    }
    scrollEl.addEventListener("scroll", wrapScroll, { passive: true });

    let paused = false;
    let resumeTimer = null;
    function pause() {
      paused = true;
      clearTimeout(resumeTimer);
    }
    function scheduleResume(delay) {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, delay || 2600);
    }

    // desktop mouse drag (touch already gets free native swipe-scrolling, so it's left alone)
    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    function onPointerDown(e) {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      scrollEl.classList.add("dragging");
      pause();
      startX = e.clientX;
      startScroll = scrollEl.scrollLeft;
      scrollEl.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      scrollEl.scrollLeft = startScroll - (e.clientX - startX);
    }
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      scrollEl.classList.remove("dragging");
      scheduleResume();
    }
    function onPointerLeave() {
      if (dragging) endDrag();
    }
    function onWheel() {
      pause();
      scheduleResume();
    }
    function onTouchStart() {
      pause();
    }
    function onTouchEnd() {
      scheduleResume();
    }

    scrollEl.addEventListener("pointerdown", onPointerDown);
    scrollEl.addEventListener("pointermove", onPointerMove);
    scrollEl.addEventListener("pointerup", endDrag);
    scrollEl.addEventListener("pointercancel", endDrag);
    scrollEl.addEventListener("pointerleave", onPointerLeave);
    scrollEl.addEventListener("wheel", onWheel, { passive: true });
    scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollEl.addEventListener("touchend", onTouchEnd, { passive: true });

    const navButtons = Array.from(marquee.querySelectorAll(".testi-nav"));
    const navHandlers = navButtons.map((btn) => {
      function handler() {
        pause();
        const dir = btn.classList.contains("next") ? 1 : -1;
        const firstCard = track.querySelector(".testi-card");
        const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : 300;
        scrollEl.scrollBy({ left: dir * step, behavior: reduceMotion ? "auto" : "smooth" });
        scheduleResume();
      }
      btn.addEventListener("click", handler);
      return [btn, handler];
    });

    let rafId;
    let lastTs = null;
    const speed = 32; // px/second
    function raf(ts) {
      if (!reduceMotion) {
        if (lastTs === null) lastTs = ts;
        const dt = (ts - lastTs) / 1000;
        lastTs = ts;
        if (!paused && !dragging) {
          scrollEl.scrollLeft += speed * dt;
          wrapScroll();
        }
      }
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", computeHalf);
      scrollEl.removeEventListener("scroll", wrapScroll);
      scrollEl.removeEventListener("pointerdown", onPointerDown);
      scrollEl.removeEventListener("pointermove", onPointerMove);
      scrollEl.removeEventListener("pointerup", endDrag);
      scrollEl.removeEventListener("pointercancel", endDrag);
      scrollEl.removeEventListener("pointerleave", onPointerLeave);
      scrollEl.removeEventListener("wheel", onWheel);
      scrollEl.removeEventListener("touchstart", onTouchStart);
      scrollEl.removeEventListener("touchend", onTouchEnd);
      navHandlers.forEach(([btn, handler]) => btn.removeEventListener("click", handler));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  useScrollReveal(sectionRef);
  useTestiMarquee(marqueeRef);

  return (
    <section ref={sectionRef}>
      <div className="wrap">
        <p className="eyebrow reveal" data-reveal>
          Client Voices
        </p>
        <h2
          className="split-heading reveal"
          data-reveal
          style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 800, margin: 0 }}
        >
          What Clients Say
        </h2>
      </div>
      <div className="testi-marquee reveal" data-reveal ref={marqueeRef}>
        <button type="button" className="testi-nav prev" aria-label="Previous testimonials">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="testi-nav next" aria-label="Next testimonials">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="testi-scroll">
          <div className="testi-track">
            {TESTIMONIALS.map((t, i) => (
              <TestiCard t={t} hidden={false} key={`a-${i}`} />
            ))}
            {TESTIMONIALS.map((t, i) => (
              <TestiCard t={t} hidden key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
