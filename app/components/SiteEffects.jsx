"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/app/lib/gsapClient";

/**
 * Page-wide effects that touch elements across every section, so they're handled once here
 * rather than duplicated per-component: the custom cursor, magnetic buttons (any element with
 * .magnetic, wherever it lives), the scroll progress rail, and the ambient ring's slow rotation.
 * Mounted once at the page level — by the time this effect runs, React has already committed
 * the full initial tree, so document-wide queries here see every section's real markup, same as
 * the original vanilla script running after the whole page had parsed.
 *
 * Deliberately NOT passing a `scope` to useGSAP: scope creates a gsap.context() that restricts
 * GSAP's own selector-text lookups (gsap.to("#id", ...), ScrollTrigger trigger: "...") to that
 * scope element's DOM subtree. This component renders no section markup itself — its targets
 * (#ambientRing, #progressRail, .magnetic, etc.) all live in sibling components — so scoping to
 * this component's own (empty) root would make GSAP unable to find any of them. useGSAP still
 * wraps everything in its own context for cleanup on unmount even without an explicit scope.
 */
export default function SiteEffects() {
  useGSAP(() => {
    const isDesktop = window.innerWidth > 900;
    const finePointer =
      window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isDesktop && finePointer) {
      // Delegated on document instead of queried-and-bound per element at mount: several
      // sections below the fold now load their JS lazily (see page.js), so their .magnetic
      // buttons and links don't exist in the DOM yet when this effect first runs. A live
      // delegated listener keeps working for anything that mounts later, with no re-scan
      // needed. quickTo setters are created once per element on first interaction and cached
      // in a WeakMap rather than all up front.
      const magneticSetters = new WeakMap();
      function settersFor(btn) {
        let s = magneticSetters.get(btn);
        if (!s) {
          s = {
            x: gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" }),
            y: gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" }),
          };
          magneticSetters.set(btn, s);
        }
        return s;
      }
      document.addEventListener("mousemove", (e) => {
        const btn = e.target.closest(".magnetic");
        if (!btn) return;
        const { x: qx, y: qy } = settersFor(btn);
        const r = btn.getBoundingClientRect();
        qx((e.clientX - r.left - r.width / 2) * 0.35);
        qy((e.clientY - r.top - r.height / 2) * 0.35);
      });
      document.addEventListener("mouseout", (e) => {
        const btn = e.target.closest(".magnetic");
        if (!btn || btn.contains(e.relatedTarget)) return;
        const { x: qx, y: qy } = settersFor(btn);
        qx(0);
        qy(0);
      });

      const dot = document.getElementById("cursorDot");
      const ring = document.getElementById("cursorRing");
      if (dot && ring) {
        document.body.classList.add("custom-cursor-on");
        const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
        const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });
        const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
        window.addEventListener("mousemove", (e) => {
          dotX(e.clientX);
          dotY(e.clientY);
          ringX(e.clientX);
          ringY(e.clientY);
        });
        // Same delegation reasoning as the magnetic buttons above — covers gallery items and
        // links in lazily-loaded sections too, not just what existed at mount.
        document.addEventListener("mouseover", (e) => {
          if (e.target.closest("a, button, .gallery-item")) ring.classList.add("big");
        });
        document.addEventListener("mouseout", (e) => {
          const el = e.target.closest("a, button, .gallery-item");
          if (el && !el.contains(e.relatedTarget)) ring.classList.remove("big");
        });
      }
    }

    if (!reduceMotion) {
      gsap.to("#ambientRing", {
        rotate: 320,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
      gsap.to("#progressRail", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }

    // fonts/images loading after ScrollTrigger's initial measurement can shift layout and make
    // its cached trigger positions stale (the same class of bug documented in the journey
    // stepper's sticky-bar fix in the original build) — refresh once everything's settled.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }, { dependencies: [] });

  return null;
}
