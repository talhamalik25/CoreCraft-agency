"use client";

import { useRef } from "react";
import { useGSAPAnimations } from "../../hooks/useGSAP";

export default function FilterBar({ categories, filter, setFilter }) {
  const barRef = useRef(null);
  const indicatorRef = useRef(null);
  const buttonsRef = useRef({});
  useGSAPAnimations((gsap) => {
    const button = buttonsRef.current[filter]; const bar = barRef.current; const indicator = indicatorRef.current;
    if (!button || !bar || !indicator) return;
    const offset = button.offsetLeft - bar.scrollLeft;
    gsap.to(indicator, { x: offset, width: button.offsetWidth, duration: 0.42, ease: "power3.inOut" });
    gsap.to(button, { color: "rgb(13, 13, 13)", duration: 0.25 });
  }, { scope: barRef, dependencies: [filter] });
  return <section className="bg-black section-x pb-12 md:pb-20"><div ref={barRef} role="tablist" aria-label="Filter projects" className="relative mx-auto flex max-w-7xl gap-1 overflow-x-auto border-b border-white/10 pb-3 no-scrollbar">
    <div ref={indicatorRef} aria-hidden="true" className="absolute bottom-3 left-0 h-9 bg-teal" />
    {categories.map((category) => <button key={category} ref={(el) => { buttonsRef.current[category] = el; }} type="button" role="tab" aria-selected={filter === category} onClick={() => setFilter(category)} className={`relative z-10 shrink-0 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.12em] transition-colors duration-300 sm:px-5 ${filter === category ? "text-black" : "text-white/50 hover:text-white"}`}>{category}</button>)}
  </div></section>;
}
