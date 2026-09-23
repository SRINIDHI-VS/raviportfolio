"use client";

import { useEffect, useRef } from "react";

const DISMISS_KEY = "raviWaBubbleDismissed";
const WA_HREF =
  "https://wa.me/919902269943?text=Hi%20Ravi!%20I%20saw%20your%20training%20page%20and%20had%20a%20few%20questions%20before%20enrolling.";

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
    function dismiss() {
      bubble.classList.remove("show");
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      try {
        sessionStorage.setItem(DISMISS_KEY, "1");
      } catch (e) {}
    }

    if (!dismissed) {
      showTimer = setTimeout(() => bubble.classList.add("show"), 3200);
      hideTimer = setTimeout(() => bubble.classList.remove("show"), 11500);
    }

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
