"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal, useGoldRuleGrow, useMediaReveal } from "@/app/hooks/useScrollReveal";

export default function Approach() {
  const sectionRef = useRef(null);
  const ruleRef = useRef(null);
  useScrollReveal(sectionRef);
  useGoldRuleGrow(ruleRef);
  useMediaReveal(sectionRef);

  return (
    <section className="split reverse" ref={sectionRef}>
      <div className="wrap">
        <div className="split-copy">
          <p className="eyebrow reveal" data-reveal>
            The Approach
          </p>
          <h2 className="split-heading">Trained on Anatomy, Not Templates</h2>
          <hr className="gold-rule" ref={ruleRef} />
          <p className="reveal" data-reveal style={{ marginTop: 24 }}>
            Ravi doesn&apos;t run one program for everyone. Years of hands-on training and real
            competition experience taught him which muscle does what, why an exercise works for
            one body and not another, and how to build around an injury instead of ignoring it.
          </p>
          <p className="reveal" data-reveal>
            Every plan starts with your body, not a generic sheet pulled off the internet.
          </p>
        </div>
        <div className="split-photo reveal-media">
          <Image
            src="/img/approach.jpg"
            alt="Ravi training in the gym"
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
