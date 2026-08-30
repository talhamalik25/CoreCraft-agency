"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, BrainCircuit, Layers3, Monitor, ShoppingBag, Smartphone } from "lucide-react";
import ServicesHero from "../components/services/ServicesHero";
import ProcessSection from "../components/services/ProcessSection";
import ToolsSection from "../components/services/ToolsSection";
import ServicesCTA from "../components/services/ServicesCTA";
import { useGSAPAnimations } from "../hooks/useGSAP";

// The WebGL capability preview is decorative and desktop-only — load its
// Three.js dependency in a separate chunk after the page is interactive.
const Service3DVisual = dynamic(() => import("../components/services/Service3DVisual"), {
  ssr: false,
  loading: () => null,
});

const SERVICES = [
  { name: "Digital Experiences", slug: "digital-experiences", icon: Monitor, type: "experience", desc: "Websites and digital environments that make the first interaction feel unmistakably yours.", capabilities: ["Art direction", "Interaction systems", "Next.js builds", "Motion design"] },
  { name: "Digital Products", slug: "digital-products", icon: Layers3, type: "product", desc: "Product interfaces that bring shape, speed, and confidence to complex workflows.", capabilities: ["Product strategy", "Design systems", "Web platforms", "Role-based flows"] },
  { name: "AI & Automation", slug: "ai-automation", icon: BrainCircuit, type: "ai", desc: "Useful intelligence and connected automation that remove friction without losing judgment.", capabilities: ["LLM integrations", "AI interfaces", "Workflow design", "Data pipelines"] },
  { name: "E-Commerce", slug: "ecommerce", icon: ShoppingBag, type: "commerce", desc: "Commerce experiences made for discovery, trust, and a checkout that stays out of the way.", capabilities: ["Storefronts", "Custom checkout", "Payments", "Growth analytics"] },
  { name: "Mobile Apps", slug: "mobile-apps", icon: Smartphone, type: "mobile", desc: "Mobile products with intuitive states, native-feeling interactions, and a dependable core.", capabilities: ["Mobile strategy", "Cross-platform", "Push journeys", "App release"] },
];

function ServicesExplorer() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  useGSAPAnimations((gsap, ScrollTrigger) => {
    const rows = sectionRef.current?.querySelectorAll("[data-service-row]");
    gsap.fromTo(rows, { autoAlpha: 0, y: 38 }, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } });
    rows?.forEach((row, index) => ScrollTrigger.create({ trigger: row, start: "top 55%", end: "bottom 45%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) }));
  }, { scope: sectionRef });
  const service = SERVICES[active];
  return <section ref={sectionRef} className="bg-black px-4 pb-24 sm:px-6 md:px-20 md:pb-36"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.82fr] lg:gap-20">
    <div><div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[10px] uppercase tracking-[.18em] text-white/45"><span>Capabilities</span><span className="text-teal">05 disciplines</span></div>
      {SERVICES.map((item, index) => { const Icon = item.icon; const selected = active === index; return <article data-service-row id={item.slug} key={item.name} className={`group scroll-mt-28 border-b border-white/10 py-7 transition-colors sm:py-9 ${selected ? "text-white" : "text-white/50"}`} onMouseEnter={() => setActive(index)}>
        <button type="button" onClick={() => setActive(index)} className="flex w-full items-center gap-4 text-left"><Icon size={19} className={selected ? "text-teal" : "text-white/35"} /><h2 className="flex-1 font-syne text-2xl font-bold uppercase leading-none sm:text-3xl">{item.name}</h2><ArrowUpRight size={20} className={`transition-transform ${selected ? "-translate-y-1 translate-x-1 text-teal" : "text-white/25"}`} /></button>
        <div className={`grid transition-[grid-template-rows] duration-500 lg:hidden ${selected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}><div className="overflow-hidden"><div className="mt-5 border-l border-teal/50 pl-5"><p className="text-sm leading-relaxed text-white/60">{item.desc}</p><Capabilities items={item.capabilities} /></div></div></div>
      </article>; })}
    </div>
    <aside className="hidden lg:block"><div className="sticky top-28 overflow-hidden border border-white/10 bg-surface p-7"><div className="relative aspect-square overflow-hidden border border-white/10"><Service3DVisual activeType={service.type} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:38px_38px]" /><span className="absolute left-3 top-3 h-1.5 w-1.5 bg-teal" /></div><div className="mt-6"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-teal">Active capability</p><h2 className="mt-3 font-syne text-3xl font-bold uppercase text-white">{service.name}</h2><p className="mt-4 text-sm leading-relaxed text-white/60">{service.desc}</p><Capabilities items={service.capabilities} /></div></div></aside>
  </div></section>;
}

function Capabilities({ items }) { return <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3">{items.map((item) => <li key={item} className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.1em] text-white/55"><span className="h-1 w-1 bg-teal" />{item}</li>)}</ul>; }

export default function Services() {
  const processSteps = [{ name: "Discovery", desc: "We identify the real problem, pressure-test the opportunity, and set a decisive direction." }, { name: "Design", desc: "We turn the strategy into a visual system and clear paths people can use without thinking twice." }, { name: "Develop", desc: "We engineer a fast, resilient build with clean foundations and no ornamental complexity." }, { name: "Deliver", desc: "We validate the details, release with confidence, and make the next iteration easier." }];
  return <div className="bg-black"><ServicesHero /><ServicesExplorer /><ProcessSection processSteps={processSteps} /><ToolsSection tools={["React", "Node.js", "MongoDB", "Tailwind", "Python", "AWS", "Figma", "Postgres"]} /><ServicesCTA /></div>;
}
