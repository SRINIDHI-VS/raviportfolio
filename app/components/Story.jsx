"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal, useGoldRuleGrow, useMediaReveal } from "@/app/hooks/useScrollReveal";

export default function Story() {
  const sectionRef = useRef(null);
  const ruleRef = useRef(null);
  useScrollReveal(sectionRef);
  useGoldRuleGrow(ruleRef);
  useMediaReveal(sectionRef);

  return (
    <section className="split" id="story" ref={sectionRef}>
      <div className="wrap">
        <div className="split-copy">
          <p className="eyebrow reveal" data-reveal>
            The Beginning
          </p>
          <h2 className="split-heading">From Cleaning Equipment to Competing On Stage</h2>
          <hr className="gold-rule" ref={ruleRef} />
          <p className="reveal" data-reveal style={{ marginTop: 24 }}>
            Ravi&apos;s start in fitness wasn&apos;t in front of a client — it was behind the
            scenes. Growing up in Mylapura, he took his first job in a gym as an assistant:
            maintaining equipment, keeping the floor running, managing the day-to-day most
            members never see. That gave him something most trainers skip — a working
            understanding of a gym from the ground up, before he ever ran a program himself.
          </p>
          <p className="reveal" data-reveal>
            That access turned into obsession. He started training seriously, worked through
            certifications, and eventually competed on stage. Along the way he built a real
            grasp of anatomy — not textbook theory, but which muscle does what, why an exercise
            works or doesn&apos;t for a specific body, and how to adjust around an injury instead
            of running a generic template.
          </p>
        </div>
        <div className="split-photo reveal-media">
          <Image
            src="/img/story.jpg"
            alt="Ravi at a bodybuilding competition"
            width={700}
            height={880}
            quality={90}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
