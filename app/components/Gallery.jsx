"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/app/hooks/useScrollReveal";

const GALLERY_COUNT = 10;

/**
 * Tap-through stack of photos — tap the top one, it flips away and the next is underneath,
 * cycling back to the first once you've been through all of them. Plain DOM + CSS transitions,
 * no GSAP dependency, ported as-is from the vanilla site (every photo gets the same amount of
 * attention, one at a time, and the interaction reads the same on desktop and mobile).
 */
function useStackDeck(stackRef) {
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = Array.from(stack.querySelectorAll(".stack-card"));
    const counter = stack.querySelector(".stack-counter");
    const hint = stack.querySelector(".stack-hint");
    const total = cards.length;
    let order = cards.map((_, i) => i);
    let current = 1;
    let flying = false;

    function render() {
      order.forEach((cardIdx, pos) => {
        const card = cards[cardIdx];
        card.style.zIndex = total - pos;
        card.style.pointerEvents = pos === 0 ? "auto" : "none";
        if (pos > 3) {
          card.style.opacity = "0";
          card.style.transform = "translateY(22px) scale(0.88)";
        } else {
          card.style.opacity = "1";
          const rot = pos === 0 ? 0 : (cardIdx % 2 === 0 ? -1 : 1) * pos * 2.5;
          card.style.transform = `translateY(${pos * 10}px) scale(${1 - pos * 0.035}) rotate(${rot}deg)`;
        }
      });
      if (counter) counter.textContent = `${current} / ${total}`;
    }

    const bound = cards.map((card, idx) => {
      function onClick() {
        if (flying || order[0] !== idx) return;
        flying = true;
        stack.style.pointerEvents = "none";
        if (hint) hint.style.opacity = "0";
        const dir = idx % 2 === 0 ? 1 : -1;
        card.style.transform = `translate(${dir * 130}%, -10%) rotate(${dir * 22}deg)`;
        card.style.opacity = "0";
        setTimeout(() => {
          order.push(order.shift());
          current = (current % total) + 1;
          card.style.transition = "none";
          render();
          void card.offsetWidth; // force reflow before re-enabling the transition
          card.style.transition = "";
          stack.style.pointerEvents = "";
          flying = false;
        }, 480);
      }
      card.addEventListener("click", onClick);
      return onClick;
    });

    render();

    return () => {
      cards.forEach((card, i) => card.removeEventListener("click", bound[i]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const stackRef = useRef(null);
  useScrollReveal(sectionRef);
  useStackDeck(stackRef);

  return (
    <section id="gallerySection" ref={sectionRef} style={{ paddingBottom: 80 }}>
      <div className="wrap">
        <p className="eyebrow reveal" data-reveal>
          In The Gym
        </p>
        <h2
          className="split-heading"
          style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 800, margin: "0 0 14px" }}
        >
          The Work Behind The Numbers
        </h2>
        <p className="reveal" data-reveal style={{ color: "var(--muted)", fontSize: 15, margin: 0 }}>
          Tap the photo to flip to the next one.
        </p>
      </div>
      <div className="wrap" style={{ marginTop: 48 }}>
        <div className="stack-wrap reveal" data-reveal ref={stackRef}>
          <div className="stack-hint">
            <span>Tap</span>
          </div>
          {Array.from({ length: GALLERY_COUNT }, (_, i) => (
            <div className="stack-card" key={i} data-i={i}>
              <Image
                src={`/img/gallery-${i + 1}.jpg`}
                alt={`Training photo ${i + 1}`}
                fill
                sizes="(max-width: 900px) 86vw, 420px"
              />
            </div>
          ))}
          <div className="stack-counter">1 / {GALLERY_COUNT}</div>
        </div>
      </div>
    </section>
  );
}
