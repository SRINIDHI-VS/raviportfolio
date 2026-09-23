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

/**
 * Specialty chips: scroll-SCRUBBED reveal, not fire-once — tied directly to scroll position so
 * it plays out as the visitor's finger moves and can't be scrolled past unseen (the failure mode
 * a timed tween has on a fast mobile swipe). A scrub tween has no onComplete of its own since
 * it's driven by scroll rather than autoplay, so ScrollTrigger's onLeave (fires once scroll
 * passes the end of the entrance zone) stands in for it — same removeProperty fix as the
 * one-shot reveal above, and for the same reason (see that hook's docstring).
 */
export function useSpecialtyChipsReveal(containerRef) {
  useGSAP(
    () => {
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
  useGSAP(
    () => {
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
        const img = el.querySelector("img");
        if (!img) return;
        gsap.set(img, { scale: 1.45, rotation: -2, transformPerspective: 900 });

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
          .to(img, { scale: 1.02, rotation: 0, duration: 1.3, ease: "power3.out" }, 0.05);

        gsap.fromTo(
          img,
          { yPercent: -7, rotationY: -9 },
          {
            yPercent: 7,
            rotationY: 9,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [] }
  );
}
