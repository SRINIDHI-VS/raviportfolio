"use client";

import { useEffect, useRef } from "react";
import { whatsappLink } from "@/app/lib/siteConfig";

const DISMISS_KEY = "raviWaBubbleDismissed";
const SCROLL_HIDE_THRESHOLD = 600;
const WA_HREF = whatsappLink(
  "Hi Ravi! I saw your training page and had a few questions before enrolling."
);

/**
 * Floating chatbot-style WhatsApp button. The greeting bubble pops itself out a few seconds
 * after load (like a live-chat widget introducing itself), auto-hides if ignored, and remembers
 * a dismissal in sessionStorage so a returning visitor isn't shown it again this session.
 * Ported 1:1 from the vanilla site's IIFE (template.html) into a small effect.
 */
export default function WhatsAppFab() {
  const bubbleRef = useRef(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble) return;

    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch (e) {}

    let showTimer, hideTimer;
    function hide() {
      bubble.classList.remove("show");
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    }
    function dismiss() {
      hide();
      try {
        sessionStorage.setItem(DISMISS_KEY, "1");
      } catch (e) {}
    }

    // Fixed to the corner, so it sits wherever the visitor has scrolled to. Only pop it up while
    // still near the top (still an entry greeting) — otherwise it lands on top of whatever
    // content is on screen further down the page for the next several seconds. If they scroll
    // past the threshold while it's already showing, hide it immediately rather than let it keep
    // covering things until its own timer runs out.
    if (!dismissed) {
      showTimer = setTimeout(() => {
        if (window.scrollY < SCROLL_HIDE_THRESHOLD) {
          bubble.classList.add("show");
          hideTimer = setTimeout(() => bubble.classList.remove("show"), 11500);
        }
      }, 3200);
    }

    function onScroll() {
      if (window.scrollY >= SCROLL_HIDE_THRESHOLD) hide();
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const closeBtn = bubble.querySelector(".wa-bubble-close");
    const onClose = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      dismiss();
    };
    closeBtn?.addEventListener("click", onClose);

    const fab = document.getElementById("waFab");
    fab?.addEventListener("click", dismiss);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
      closeBtn?.removeEventListener("click", onClose);
      fab?.removeEventListener("click", dismiss);
    };
  }, []);

  return (
    <div className="wa-fab-wrap">
      <div className="wa-bubble" ref={bubbleRef}>
        <button type="button" className="wa-bubble-close" aria-label="Dismiss">
          ✕
        </button>
        Have a question before enrolling? Chat with Ravi directly.
      </div>
      <a
        className="wa-fab"
        id="waFab"
        href={WA_HREF}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <span className="wa-fab-ring" />
        <span className="wa-fab-ring r2" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
          <path d="M8.5 9.5c.3 3 2.8 5.5 5.8 5.8" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  );
}
