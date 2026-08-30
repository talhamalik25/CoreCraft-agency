"use client";

import { useRef } from "react";
import { Compass, DraftingCompass, Code2, Rocket } from "lucide-react";
import { SectionLabel } from "../common/SectionLabel";
import { useGSAPAnimations } from "../../hooks/useGSAP";

const icons = [Compass, DraftingCompass, Code2, Rocket];

export default function ProcessSection({ processSteps }) {
  const sectionRef = useRef(null);
  useGSAPAnimations((gsap) => {
    const steps = sectionRef.current?.querySelectorAll("[data-process-step]");
    const line = sectionRef.current?.querySelector("[data-process-line]");
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 64%", end: "bottom 70%", scrub: 0.65 },
    });
    timeline.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 })
      .fromTo(steps, { autoAlpha: 0.28, y: 46 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, 0.12)
      .fromTo(sectionRef.current?.querySelectorAll("[data-process-icon]"), { scale: 0.25, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.65, stagger: 0.2, ease: "back.out(1.8)" }, 0.2);
  }, { scope: sectionRef, dependencies: [processSteps] });

  return <section ref={sectionRef} id="process" className="bg-surface section-x section-y">
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 grid gap-5 md:grid-cols-[1fr_1.4fr] md:items-end"><SectionLabel text="How we work" /><p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base">A disciplined, visible process that keeps the sharp details intact from the first conversation to the final release.</p></div>
      <div className="relative">
        <div data-process-line aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-teal/60 lg:block" />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, index) => { const Icon = icons[index]; return <article data-process-step key={step.name} className="relative border-t border-white/10 pt-6 lg:border-0 lg:pt-0">
            {/* 01→04 is a real sequence (Discovery → Deliver), so the step
                numbers here carry information — unlike decorative numbering. */}
            <div className="mb-8 flex items-center justify-between">
              <div data-process-icon className="flex h-12 w-12 items-center justify-center rounded-full border border-teal bg-black text-teal shadow-[0_0_28px_rgba(0,230,217,.14)]"><Icon size={18} /></div>
              <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/30">0{index + 1}</span>
            </div>
            <h3 className="font-syne text-2xl font-bold uppercase text-white">{step.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/55">{step.desc}</p>
          </article>; })}
        </div>
      </div>
    </div>
  </section>;
}
