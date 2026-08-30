"use client";

import { useRef } from "react";
import { useGSAPAnimations } from "../../hooks/useGSAP";
import { SectionLabel } from "../common/SectionLabel";

const problems = [
  { headline: "Template fatigue", desc: "A template site that makes a capable business look interchangeable." },
  { headline: "Manual drudgery", desc: "Manual work that consumes time your team should spend serving customers." },
  { headline: "Agency overhead", desc: "An expensive agency process with slow hand-offs and no technical continuity." },
  { headline: "Growth bottlenecks", desc: "A digital presence that cannot grow when the business finally does." },
];

export default function ProblemSection() {
  const ref = useRef(null);

  useGSAPAnimations((gsap) => {
    gsap.fromTo(
      ref.current?.querySelectorAll("[data-problem]"),
      { autoAlpha: 0, x: -28 },
      { autoAlpha: 1, x: 0, duration: 0.65, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 72%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="bg-black section-x section-y">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.08fr]">
        {/* Left — heading */}
        <div>
          <SectionLabel text="The problem" />
          <h2 className="mt-8 font-syne text-[clamp(3rem,6.5vw,6.6rem)] font-extrabold uppercase leading-[.82] tracking-[-.065em] text-white">
            Good businesses<br />
            <span className="text-teal">deserve better</span><br />
            than digital clutter.
          </h2>
        </div>

        {/* Right — pain point cards */}
        <div className="border-t border-white/10">
          {problems.map((problem) => (
            <div data-problem key={problem.headline} className="border-b border-white/10 py-6 sm:py-8">
              <p className="mb-2 font-syne text-xl font-extrabold uppercase leading-none tracking-[-.02em] text-white sm:text-2xl">
                {problem.headline}
              </p>
              <p className="font-dm text-base leading-relaxed text-white/65 sm:text-lg">{problem.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
