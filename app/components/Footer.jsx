"use client";

import { useRef } from "react";
import { useScrollReveal, useGoldRuleGrow } from "@/app/hooks/useScrollReveal";

export default function Footer() {
  const footerRef = useRef(null);
  const ruleRef = useRef(null);
  useScrollReveal(footerRef);
  useGoldRuleGrow(ruleRef);

  return (
    <footer ref={footerRef}>
      <div className="footer-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="footer-brand-row reveal" data-reveal>
          <div className="footer-mark disp">R</div>
          <div>
            <div className="fname disp">RAVI</div>
            <p className="footer-tagline">Personal Training · Bengaluru</p>
          </div>
        </div>
        <hr className="gold-rule footer-rule" ref={ruleRef} />
        <div className="footer-contact-row">
          <a
            className="footer-chip reveal"
            data-reveal
            href="https://www.instagram.com/ravindramb/"
            target="_blank"
            rel="noopener"
          >
            <span className="fc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            @ravindramb
          </a>
          <a
            className="footer-chip reveal"
            data-reveal
            href="https://wa.me/919902269943"
            target="_blank"
            rel="noopener"
          >
            <span className="fc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
                <path d="M8.5 9.5c.3 3 2.8 5.5 5.8 5.8" strokeLinecap="round" />
              </svg>
            </span>
            WhatsApp
          </a>
          <a className="footer-chip reveal" data-reveal href="mailto:ravindragym2000@gmail.com">
            <span className="fc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            ravindragym2000@gmail.com
          </a>
          <span className="footer-chip reveal" data-reveal>
            <span className="fc-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M6.6 3.5 9.3 8.1c.3.5.2 1.1-.2 1.5L7.4 11.3a13 13 0 0 0 5.3 5.3l1.7-1.7c.4-.4 1-.5 1.5-.2l4.6 2.7c.6.4.7 1.2.3 1.7l-1.6 2c-.4.5-1 .8-1.7.8C10.8 21.6 2.4 13.2 2.2 6.5c0-.6.3-1.3.8-1.7l2-1.6c.5-.4 1.3-.3 1.7.3z" />
              </svg>
            </span>
            9902269943
          </span>
        </div>
      </div>
      <div className="wrap footer-legal">
        <details className="terms-disclosure">
          <summary>Terms &amp; Conditions</summary>
          <div className="terms-note">
            <h5>Program, payment &amp; cancellation</h5>
            <ul>
              <li>
                Training runs in 4-week blocks, counted strictly week-wise — not by calendar
                month or fixed dates.
              </li>
              <li>Classes are held Monday to Friday only. No classes on Saturday or Sunday.</li>
              <li>Payment for the next 4-week block is due at the start of Week 5 of the current block.</li>
              <li>No refunds are issued under any circumstances.</li>
              <li>
                If payment for the next block isn&apos;t made by the start of Week 5, training
                pauses until payment is made and confirmed.
              </li>
              <li>
                If a class is cancelled by the trainer, a makeup class is scheduled to cover it —
                payment still continues on the normal week-wise schedule regardless.
              </li>
              <li>
                If a class is cancelled by the client: at least 1 hour&apos;s notice is required.
                Less than 1 hour&apos;s notice, or no notice, counts that class as done, no
                makeup. Notice given in time means a makeup class can be taken once payment for
                the next block is made.
              </li>
            </ul>
            <span className="draft-flag">
              Below — drafted, not reviewed. Ravi to check (ideally with a lawyer) before this
              goes live
            </span>
            <h5>Training terms</h5>
            <ul>
              <li>
                <strong>Health disclosure</strong> — clients confirm they&apos;re medically fit to
                train and disclose any injury or condition to Ravi before starting, and if
                anything changes. This is fitness coaching, not medical advice.
              </li>
              <li>
                <strong>Assumption of risk</strong> — physical training carries some risk of
                injury. Participation is voluntary; Ravi isn&apos;t liable for injury except
                where it results from his own negligence.
              </li>
              <li>
                <strong>Training space &amp; equipment</strong> — sessions typically run at the
                client&apos;s own location. The client is responsible for providing a reasonably
                safe space; Ravi isn&apos;t liable for hazards in a space he doesn&apos;t control.
              </li>
              <li>
                <strong>Punctuality &amp; conduct</strong> — both sides are expected to be ready
                at the scheduled time and give reasonable notice of any change.
              </li>
              <li>
                <strong>Photos &amp; videos</strong> — Ravi may use training photos or videos for
                marketing (like this page) only with the client&apos;s separate, explicit
                go-ahead each time — never assumed from signing up.
              </li>
              <li>
                <strong>Ending the arrangement</strong> — either side can end it at any time. No
                refund beyond the policy above, and no obligation beyond the block already paid
                for.
              </li>
            </ul>
            <p>Full enrollment details are confirmed in the enrollment app at sign-up.</p>
          </div>
        </details>
      </div>
    </footer>
  );
}
