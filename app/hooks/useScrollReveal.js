"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";

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
  useGSAP(
    () => {
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
    { scope: containerRef, dependencies: [] }
  );
}

export function useGoldRuleGrow(ref) {
  useGSAP(
    () => {
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
    { scope: ref, dependencies: [] }
  );
}
