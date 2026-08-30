"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SESSION_KEY = "cc_intro";

export default function InitialLoader() {
  const overlayRef = useRef(null);
  const markRef = useRef(null);
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        document.documentElement.removeAttribute("data-intro");
        return;
      }
    } catch {
      document.documentElement.removeAttribute("data-intro");
      return;
    }

    const frame = window.requestAnimationFrame(() => setVisible(true));
    document.documentElement.dataset.intro = "1";
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useGSAP(
    () => {
      if (!visible || !overlayRef.current) return undefined;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* ignore quota / private mode */
          }
          document.documentElement.removeAttribute("data-intro");
          document.body.style.overflow = "";
          setVisible(false);
        },
      });

      document.body.style.overflow = "hidden";

      timeline
        .fromTo(markRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.45 })
        .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.1")
        .to(overlayRef.current, { yPercent: -100, duration: 0.55, ease: [0.76, 0, 0.24, 1] }, "+=0.15");

      return () => {
        document.body.style.overflow = "";
      };
    },
    { dependencies: [visible] }
  );

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6 px-6">
        <p
          ref={markRef}
          className="font-syne text-3xl font-extrabold uppercase tracking-[-0.06em] text-white sm:text-4xl"
        >
          Core<span className="text-teal">Craft</span>
        </p>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full w-full origin-left bg-teal" />
        </div>
      </div>
    </div>
  );
}
