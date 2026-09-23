"use client";

import DumbbellIcon from "./icons/DumbbellIcon";

/**
 * Custom cursor dot + dumbbell. Fixed-position, opacity 0 by default (CSS only turns them visible
 * when body has .custom-cursor-on, added by SiteEffects on desktop/fine-pointer devices) and
 * tracked via gsap.quickTo in SiteEffects.jsx, which looks these up by id.
 */
export default function Cursor() {
  return (
    <>
      <div id="cursorDot" className="cursor-dot" aria-hidden="true" />
      <div id="cursorRing" className="cursor-ring" aria-hidden="true">
        <DumbbellIcon />
      </div>
    </>
  );
}
