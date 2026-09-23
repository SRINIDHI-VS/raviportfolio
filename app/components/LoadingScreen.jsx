"use client";

import { useEffect, useState } from "react";

/**
 * First-paint cover screen with a gold line-art dumbbell that "curls" in place — reads as gym
 * branding rather than a generic spinner. Waits for fonts to actually be ready (so it never
 * hands off to a flash of unstyled text) plus a small floor so it never just flickers on a fast
 * load, then fades out and unmounts so it stops intercepting clicks/scroll.
 */
export default function LoadingScreen() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const minTime = new Promise((resolve) => setTimeout(resolve, 1500));
    const fontsReady =
      typeof document !== "undefined" && document.fonts && document.fonts.ready
        ? document.fonts.ready
        : Promise.resolve();

    Promise.all([minTime, fontsReady]).then(() => {
      if (cancelled) return;
      setFading(true);
      setTimeout(() => {
        if (!cancelled) setHidden(true);
      }, 650);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-screen${fading ? " loading-screen-hide" : ""}`} aria-hidden="true">
      <svg
        className="loading-mark"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="18" width="10" height="28" rx="4" />
        <rect x="48" y="18" width="10" height="28" rx="4" />
        <rect x="16" y="24" width="6" height="16" rx="2" />
        <rect x="42" y="24" width="6" height="16" rx="2" />
        <line x1="22" y1="32" x2="42" y2="32" />
      </svg>
    </div>
  );
}
