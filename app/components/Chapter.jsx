"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsapClient";

/**
 * Full-screen scene-change divider between major sections ("01 / 05 — Origin", etc). Desktop
 * pins the whole chapter while the giant word pops in, holds, then zooms past the camera as you
 * keep scrolling; mobile skips the pin (unreliable on phone browsers) but keeps the same
 * grow-and-blow-past motion, driven purely by scroll position so it can never freeze the page.
 * `index` just alternates the pop/zoom rotation direction between chapters (even vs odd).
 */
function useChapterScrub(chapterRef, index) {
  useGSAP(
    () => {
      const el = chapterRef.current;
      const word = el.querySelector(".chapter-word");
      const num = el.querySelector(".chapter-num");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set(word, { scale: 1, opacity: 1, rotate: 0 });
        gsap.set(num, { opacity: 1, y: 0 });
        return;
      }

      const isDesktop = window.innerWidth > 900;
      const flip = index % 2 === 0 ? 1 : -1;

      if (isDesktop) {
        gsap.set(word, { scale: 0.35, opacity: 0, rotate: -8 * flip });
        gsap.set(num, { opacity: 0, y: 24 });
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "+=130%", scrub: 0.45, pin: true },
          })
          .to(num, { opacity: 1, y: 0, duration: 0.12, ease: "none" }, 0)
          .to(word, { scale: 1, opacity: 1, rotate: 0, duration: 0.28, ease: "none" }, 0.04)
          .to(word, { scale: 1.05, duration: 0.2, ease: "none" }, 0.34)
          .to(num, { opacity: 0, y: -24, duration: 0.12, ease: "none" }, 0.56)
          .to(word, { scale: 7, opacity: 0, rotate: 6 * flip, duration: 0.44, ease: "none" }, 0.56);
      } else {
        gsap.set(word, { scale: 0.5, opacity: 0, rotate: -6 * flip });
        gsap.set(num, { opacity: 0, y: 18 });
        gsap
          .timeline({
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 },
          })
          .to(num, { opacity: 1, y: 0, duration: 0.15, ease: "none" }, 0)
          .to(word, { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: "none" }, 0.05)
          .to(word, { scale: 1, duration: 0.25, ease: "none" }, 0.4)
          .to(num, { opacity: 0, duration: 0.1, ease: "none" }, 0.7)
          .to(word, { scale: 2.6, opacity: 0, rotate: 5 * flip, duration: 0.3, ease: "none" }, 0.7);
      }
    },
    { scope: chapterRef, dependencies: [] }
  );
}

export default function Chapter({ index, num, word, photo }) {
  const chapterRef = useRef(null);
  useChapterScrub(chapterRef, index);

  return (
    <section className="chapter" ref={chapterRef}>
      {photo && (
        <div className="chapter-bg" aria-hidden="true">
          <Image src={photo} alt="" fill sizes="100vw" quality={90} />
        </div>
      )}
      <div className="chapter-inner">
        <span className="chapter-num">{num}</span>
        <h2 className="chapter-word">{word}</h2>
      </div>
    </section>
  );
}
