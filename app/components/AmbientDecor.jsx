"use client";

export default function AmbientDecor() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -inset-[10%] z-[85] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        id="ambientRing"
        aria-hidden="true"
        className="pointer-events-none fixed top-1/2 left-1/2 z-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(201,162,75,0.055)] before:absolute before:inset-[110px] before:rounded-full before:border before:border-[rgba(201,162,75,0.04)] before:content-[''] after:absolute after:inset-[230px] after:rounded-full after:border after:border-[rgba(201,162,75,0.03)] after:content-['']"
      />
      <div
        id="progressRail"
        aria-hidden="true"
        className="fixed top-0 left-0 z-[61] h-[2px] w-full origin-left bg-[var(--gold)] opacity-80"
        style={{ transform: "scaleX(0)" }}
      />
    </>
  );
}
