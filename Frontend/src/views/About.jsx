"use client";

import { useRef } from "react";
import { Target, Zap, Eye, Scaling } from "lucide-react";
import dynamic from "next/dynamic";
import GenesisSection from "../components/about/GenesisSection";
import { SectionLabel } from "../components/common/SectionLabel";
import { useGSAPAnimations } from "../hooks/useGSAP";

const AboutHero = dynamic(() => import("../components/about/AboutHero"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-[100dvh] bg-black" />,
});

const milestones = [
  { year: "2025", name: "The Catalyst", desc: "CoreCraft was born out of frustration with template-driven agencies. We wanted to build digital systems with genuine architectural rigor." },
  { year: "2026", name: "Engineering Focus", desc: "Shipped core client systems (including Malik Enterprises) and developed EduCore OS—our proprietary SaaS for school management in Pakistan." },
  { year: "Now", name: "Sustained Growth", desc: "We operate as a tight, senior-level engineering team in Karachi. Small by design, uncompromising in output." },
];
const principles = [
  { icon: Target, name: "Purpose First", desc: "Every decision starts with the problem to solve and the people who need the result." },
  { icon: Zap, name: "Design With Intent", desc: "We give every interaction a reason to exist, balancing clarity, character, and performance." },
  { icon: Scaling, name: "Scalable Growth", desc: "We create foundations that can evolve with new ideas, new users, and the demands of a growing business." },
  { icon: Eye, name: "Build To Last", desc: "We make systems that stay understandable, adaptable, and useful long after launch." },
];

function Principles() {
  const ref = useRef(null);
  useGSAPAnimations((gsap) => { gsap.fromTo(ref.current?.querySelectorAll("[data-principle]"), { autoAlpha: 0, y: 40, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 72%" } }); }, { scope: ref });
  return <section ref={ref} className="bg-black section-x section-y"><div className="mx-auto max-w-7xl"><div className="grid gap-7 border-b border-white/10 pb-14 md:grid-cols-[1fr_1.2fr] md:items-end"><div><SectionLabel text="Built On Intent" /><h2 className="mt-7 font-syne text-[clamp(3rem,6.4vw,6.3rem)] font-extrabold uppercase leading-[.84] tracking-[-.06em] text-white">Values that hold the line.</h2></div><p className="max-w-xl text-base leading-relaxed text-white/60 md:justify-self-end md:text-lg">Our principles form the engineering constraints behind every structural decision we make.</p></div>
    {/* Editorial ledger rows instead of another card grid — the About page's
        signature layout. Each row is one constraint we hold ourselves to. */}
    <div className="mt-2">
      {principles.map((principle) => { const Icon = principle.icon; return <article data-principle key={principle.name} className="group grid grid-cols-1 gap-4 border-b border-white/10 py-9 transition-colors duration-500 hover:bg-white/[.02] sm:grid-cols-[2.5rem_1fr_1.15fr] md:items-baseline md:gap-8 md:py-12">
        <span aria-hidden="true" className="text-teal opacity-80 transition-opacity duration-500 group-hover:opacity-100"><Icon size={20} /></span>
        <h3 className="font-syne text-3xl font-bold uppercase leading-[.92] text-white sm:text-4xl">{principle.name}</h3>
        <p className="max-w-lg text-base leading-relaxed text-white/60">{principle.desc}</p>
      </article>; })}
    </div>
  </div></section>;
}

export default function About() { return <div className="bg-black"><AboutHero /><GenesisSection milestones={milestones} /><Principles /></div>; }
