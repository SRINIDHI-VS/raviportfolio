"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal, useGoldRuleGrow, useMediaReveal } from "@/app/hooks/useScrollReveal";

const CERTS = [
  {
    num: "01",
    kicker: "Certification · 2018",
    title: "Fitness Training Course",
    meta: "Nextgen Fitness Academy, Bangalore",
    detail: "30-day course · completed 25 Jun 2018",
    photo: {
      src: "/img/cert-nextgen-fitness.jpg",
      alt: "Ravi's Fitness Training Course completion certificate from Nextgen Fitness Academy, Bangalore",
      width: 1600,
      height: 1107,
    },
  },
  {
    num: "02",
    kicker: "Competition · 2026",
    title: "CFS Classic — Mr. Karnataka",
    meta: "SKBFA · Care Fitness Studio, Malur",
    detail: "Bodybuilding & Fitness Championship · Participant · 23 May 2026",
    photo: {
      src: "/img/cert-cfs-mr-karnataka.jpg",
      alt: "Ravi's CFS Classic Mr Karnataka Bodybuilding & Fitness Championship participation certificate",
      width: 1077,
      height: 1600,
    },
  },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const ruleRef = useRef(null);
  useScrollReveal(sectionRef);
  useGoldRuleGrow(ruleRef);
  useMediaReveal(sectionRef);

  return (
    <section className="certs" id="certifications" ref={sectionRef}>
      <div className="wrap">
        <p className="eyebrow reveal" data-reveal>
          Certifications &amp; Achievements
        </p>
        <h2 className="split-heading certs-heading reveal" data-reveal>
          Trained. <em>Tested on stage.</em>
        </h2>
        <hr className="gold-rule" ref={ruleRef} />

        <div className="certs-list">
          {CERTS.map((c) => (
            <div className="certs-row reveal" data-reveal key={c.num}>
              <div className="certs-info">
                <span className="certs-num">{c.num}</span>
                <div className="certs-text">
                  <span className="certs-kicker">{c.kicker}</span>
                  <h3>{c.title}</h3>
                  <p>{c.meta}</p>
                  <p className="certs-detail">{c.detail}</p>
                </div>
              </div>
              <div className="certs-photo reveal-media">
                <Image
                  src={c.photo.src}
                  alt={c.photo.alt}
                  width={c.photo.width}
                  height={c.photo.height}
                  quality={90}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
