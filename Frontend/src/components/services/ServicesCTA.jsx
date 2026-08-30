"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useGSAPAnimations } from "../../hooks/useGSAP";

export default function ServicesCTA() {
  const ref = useRef(null);
  useGSAPAnimations((gsap) => {
    gsap.fromTo(ref.current, { autoAlpha: 0, scale: 0.94, y: 28 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 82%" } });
  }, { scope: ref });
  return <section className="bg-black section-x section-y"><div ref={ref} className="relative mx-auto max-w-7xl overflow-hidden bg-teal px-6 py-16 sm:px-10 md:px-20 md:py-24">
    <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-black/15" />
    <div aria-hidden="true" className="absolute -bottom-32 left-[38%] h-72 w-72 rounded-full border border-black/10" />
    <div className="relative flex flex-col justify-between gap-12 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/65">Ready when you are</p><h2 className="mt-6 max-w-3xl font-syne text-[clamp(2.7rem,6vw,6.4rem)] font-extrabold uppercase leading-[.82] tracking-[-.06em] text-black">Leave the mediocre in the past.</h2></div>
      <Link href="/contact" data-magnetic className="group inline-flex shrink-0 items-center gap-3 bg-black px-6 py-4 font-mono text-[10px] uppercase tracking-[.16em] text-white transition-transform duration-300 hover:scale-105 hover:bg-white hover:text-black"><span data-magnetic-text>Start a project</span><ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
    </div>
  </div></section>;
}
