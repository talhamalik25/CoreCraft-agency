"use client";

import { useRef } from "react";
import { SectionLabel } from "../common/SectionLabel";
import { useGSAPAnimations } from "../../hooks/useGSAP";

export default function ServicesHero() {
  const sectionRef = useRef(null);
  useGSAPAnimations((gsap) => {
    const words = sectionRef.current?.querySelectorAll("[data-service-word]");
    const copy = sectionRef.current?.querySelector("[data-service-copy]");
    const marker = sectionRef.current?.querySelector("[data-service-marker]");
    gsap.timeline({ defaults: { ease: "power4.out" } })
      .fromTo(marker, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.45 })
      .fromTo(words, { yPercent: 112, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.14 }, "-=0.1")
      .fromTo(copy, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45");
  }, { scope: sectionRef });
  return <section ref={sectionRef} data-hero-section className="relative overflow-hidden bg-black section-x pb-20 pt-32 md:pb-32 md:pt-44">
    <div aria-hidden="true" className="absolute right-[-12%] top-10 h-[27rem] w-[27rem] rounded-full border border-teal/10 bg-[radial-gradient(circle,rgba(0,230,217,.12),transparent_62%)] blur-2xl" />
    <div className="relative mx-auto max-w-7xl">
      <div data-service-marker><SectionLabel text="Services / 2026" /></div>
      <h1 className="mt-10 font-syne text-[clamp(3.2rem,9vw,8.5rem)] font-extrabold uppercase leading-[.82] tracking-[-.075em] text-white">
        {["Precision.", "Performance.", "Polish."].map((word) => <span key={word} className="block overflow-hidden"><span data-service-word className="block origin-left">{word}</span></span>)}
      </h1>
      <div data-service-copy className="mt-10 grid max-w-3xl grid-cols-[auto_1fr] gap-4 border-t border-white/10 pt-5"><span className="mt-2 h-2 w-2 bg-teal" aria-hidden="true" /><p className="font-dm text-base leading-relaxed text-white/65 sm:text-lg">We build clear, high-performance digital systems where architectural rigor, capable technology, and memorable interaction meet.</p></div>
    </div>
  </section>;
}
