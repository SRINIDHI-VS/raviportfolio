"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";

/**
 * With 12+ sections on one page, every hook below used to run its GSAP setup — which measures
 * the DOM (getBoundingClientRect etc. under the hood for each ScrollTrigger) — the instant its
 * component mounted, all at once, during initial hydration. That synchronous pile-up was the
 * biggest single piece of the "photo takes ~4 seconds to fully show up" problem. This hook
 * defers that setup to the browser's next idle moment instead, so it runs after the first paint
 * rather than blocking it. requestIdleCallback has a 400ms cap so it still runs promptly even on
 * a busy page; Safari has no requestIdleCallback, so it falls back to a short setTimeout. Every
 * element this affects is already hidden by CSS from first paint (see .reveal / .reveal-media in
 * globals.css), so the short delay before it animates in is invisible — there's nothing to flash.
 */
export function useDeferredReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const hasIdle = typeof window.requestIdleCallback === "function";
    const id = hasIdle
      ? window.requestIdleCallback(() => setReady(true), { timeout: 400 })
      : setTimeout(() => setReady(true), 120);
    return () => {
      if (hasIdle) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  return ready;
}

/**
 * Fade-up-on-scroll for every [data-reveal] element inside `containerRef`. Mirrors the original
 * vanilla site's `.reveal` class + one-shot GSAP tween exactly, including a fix for a real bug
 * found while building that version: GSAP's CSSPlugin, when it tweens `y` (i.e. `transform`),
 * ALSO writes the independent `translate`/`rotate`/`scale` CSS properties inline as "none" on
 * that element — purely to stop the browser double-applying them against GSAP's own transform
 * matrix. That inline "none" permanently beats any stylesheet rule, so an element that also
 * wants a CSS :hover{translate:...} effect (the chip/pill hover-lift pattern used across this
 * site) has that hover silently dead forever after its entrance plays — invisible in a glance
 * because opacity still reads 1, only caught by actually checking computed style.
 *
 * The fix is `el.style.removeProperty(...)` on completion, NOT `gsap.set(el,{clearProps:...})` —
 * clearProps was tried first and turned out to cascade into ALSO wiping the inline `transform`
 * GSAP had correctly settled to y:0, which then falls back to a CSS class doing the SAME
 * translateY(36px) hidden-offset the element started at — silently snapping it back down by
 * 36px after a "successful" reveal. Plain removeProperty touches only what's asked and leaves
 * GSAP's own settled `transform` alone.
 *
 * Under React specifically this bug is worse than the vanilla version, not the same: React can
 * re-render and reset DOM attributes GSAP set imperatively, so anything driving hover/press
 * state through `translate` MUST stay off `transform` entirely, on every element GSAP ever
 * touches — not just the ones known to need a hover effect today.
 */
export function useScrollReveal(containerRef, { stagger = 0 } = {}) {
  const ready = useDeferredReady();
  useGSAP(
    () => {
      if (!ready) return;
      const container = containerRef.current;
      if (!container) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const els = container.querySelectorAll("[data-reveal]");
      if (!els.length) return;

      if (reduceMotion) {
        els.forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "none";
        });
        return;
      }

      els.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 36 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: stagger ? i * stagger : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onComplete: () => {
            el.style.removeProperty("translate");
            el.style.removeProperty("rotate");
            el.style.removeProperty("scale");
          },
        });
      });
    },
    { scope: containerRef, dependencies: [ready] }
  );
}

/**
 * Specialty chips: scroll-SCRUBBED reveal, not fire-once — tied directly to scroll position so
 * it plays out as the visitor's finger moves and can't be scrolled past unseen (the failure mode
 * a timed tween has on a fast mobile swipe). A scrub tween has no onComplete of its own since
 * it's driven by scroll rather than autoplay, so ScrollTrigger's onLeave (fires once scroll
 * passes the end of the entrance zone) stands in for it — same removeProperty fix as the
 * one-shot reveal above, and for the same reason (see that hook's docstring).
 */
export function useSpecialtyChipsReveal(containerRef) {
  const ready = useDeferredReady();
  useGSAP(
    () => {
      if (!ready) return;
      const container = containerRef.current;
      if (!container) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const chips = container.querySelectorAll(".specialty-chip");
      if (!chips.length) return;

      if (reduceMotion) {
        chips.forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = "none";
        });
        return;
      }

      gsap.fromTo(
        chips,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: "top 94%",
            end: "top 60%",
            scrub: 0.45,
            onLeave: () => {
              chips.forEach((el) => {
                el.style.removeProperty("translate");
                el.style.removeProperty("rotate");
                el.style.removeProperty("scale");
              });
            },
          },
        }
      );
    },
    { scope: containerRef, dependencies: [ready] }
  );
}

export function useGoldRuleGrow(ref) {
  const ready = useDeferredReady();
  useGSAP(
    () => {
      if (!ready) return;
      const el = ref.current;
      if (!el) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        el.classList.add("grown");
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => el.classList.add("grown"),
      });
    },
    { scope: ref, dependencies: [ready] }
  );
}

/**
 * Split-section photos (.reveal-media): a bottom-to-top clip-path wipe that plays once on
 * scroll-in, followed by a continuous depth-parallax + 3D tilt for as long as the photo is on
 * screen. Deliberately its own system rather than the generic [data-reveal] fade-up used
 * elsewhere — a plain opacity/translateY fade reads as flat next to this much bigger photo, so
 * it gets a bigger entrance (the wipe) plus ongoing motion (the tilt), and runs on every device,
 * not just desktop, since scroll-scrub can never fight or freeze a phone's scroll the way a pin
 * can.
 */
export function useMediaReveal(containerRef) {
  const ready = useDeferredReady();
  useGSAP(
    () => {
      if (!ready) return;
      const container = containerRef.current;
      if (!container) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const els = container.querySelectorAll(".reveal-media");
      if (!els.length) return;

      if (reduceMotion) {
        els.forEach((el) => {
          el.style.clipPath = "none";
          const img = el.querySelector("img");
          if (img) img.style.transform = "none";
        });
        return;
      }

      els.forEach((el) => {
        const imgs = Array.from(el.querySelectorAll("img"));
        if (!imgs.length) return;
        gsap.set(imgs, { scale: 1.45, rotation: -2, transformPerspective: 900 });

        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } })
          .fromTo(
            el,
            { clipPath: "inset(0% 0 100% 0)", webkitClipPath: "inset(0% 0 100% 0)" },
            {
              clipPath: "inset(0% 0 0% 0)",
              webkitClipPath: "inset(0% 0 0% 0)",
              duration: 1.05,
              ease: "power4.out",
            },
            0
          )
          .to(imgs, { scale: 1.02, rotation: 0, duration: 1.3, ease: "power3.out", stagger: 0.06 }, 0.05);

        // One ScrollTrigger drives every image in this container (Achievements has 4), instead
        // of one per image — GSAP's function-based values let each target keep its own
        // alternating direction, so the motion is identical, it's just computed off a single
        // scroll listener rather than four.
        const dirs = imgs.map((_, i) => (i % 2 === 0 ? 1 : -1));
        gsap.fromTo(
          imgs,
          { yPercent: (i) => -7 * dirs[i], rotationY: (i) => -9 * dirs[i] },
          {
            yPercent: (i) => 7 * dirs[i],
            rotationY: (i) => 9 * dirs[i],
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [ready] }
  );
}
