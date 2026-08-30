"use client";

import React, { useRef } from "react";
import { ArrowUpRight, Braces, ShieldCheck, Cpu, Zap } from "lucide-react";
import { useGSAPAnimations } from "../../hooks/useGSAP";
import SmartImage from "../common/SmartImage";
import { SectionLabel } from "../common/SectionLabel";

const proofProjects = [
  { name: "Malik Enterprises", outcome: "Delivered a full business management platform.", image: "/project2.webp", stack: "Next.js / PostgreSQL" },
  { name: "Iqra Roadmap", outcome: "Built an interactive education roadmap platform.", image: "/project3.webp", stack: "React / Firebase" },
  { name: "Sooti Mehal", outcome: "Crafted a premium e-commerce storefront.", image: "/project1.webp", stack: "React / Node.js" },
];

const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Node.js", icon: "⬢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Firebase", icon: "🔥" },
  { name: "Tailwind", icon: "💨" },
  { name: "GSAP", icon: "✦" },
];

const stats = [
  { value: "5+", label: "Shipped Projects" },
  { value: "8+", label: "Core Technologies" },
  { value: "100%", label: "Production-Grade" },
];

export default function SocialProofSection() {
  const ref = useRef(null);

  useGSAPAnimations((gsap) => {
    // Project cards stagger
    gsap.fromTo(
      ref.current?.querySelectorAll("[data-proof-card]"),
      { autoAlpha: 0, y: 34, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, stagger: 0.11, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 75%" } }
    );

    // Stats stagger
    gsap.fromTo(
      ref.current?.querySelectorAll("[data-stat]"),
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: ref.current?.querySelector("[data-stats-row]"), start: "top 82%" } }
    );

    // Tech strip stagger
    gsap.fromTo(
      ref.current?.querySelectorAll("[data-tech-item]"),
      { autoAlpha: 0, scale: 0.85 },
      { autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: "power2.out", scrollTrigger: { trigger: ref.current?.querySelector("[data-tech-strip]"), start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="bg-surface section-x section-y">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <SectionLabel text="Proof, not promises" />
            <h2 className="mt-5 font-syne text-3xl font-extrabold uppercase leading-[.88] tracking-[-.05em] text-white sm:text-4xl">
              Real work.<br /><span className="text-teal">Real systems.</span>
            </h2>
          </div>
          <div className="max-w-md text-sm leading-relaxed text-white/55">
            We show the work, explain what shipped, and choose technology for the problem—not for the pitch.
          </div>
        </div>

        {/* Project Cards */}
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {proofProjects.map((project) => (
            <article data-proof-card key={project.name} className="group overflow-hidden border border-white/10 bg-black transition-colors duration-300 hover:border-teal/50">
              <div className="relative aspect-[16/9] overflow-hidden">
                <SmartImage src={project.image} alt={`${project.name} case preview`} width={1900} height={940} className="h-full w-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>
              <div className="p-5">
                <p className="font-mono text-[9px] uppercase tracking-[.16em] text-teal">{project.stack}</p>
                <h3 className="mt-4 flex items-center justify-between font-syne text-xl font-bold uppercase text-white">
                  {project.name}<ArrowUpRight size={17} className="text-teal" />
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{project.outcome}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Honest Stats Row */}
        <div data-stats-row className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div data-stat key={stat.label} className="flex min-h-11 items-center gap-4 border border-white/8 bg-black px-5 py-4">
              <span className="font-syne text-2xl font-extrabold text-teal sm:text-3xl">{stat.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-[.14em] text-white/50">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Credibility Strip */}
        <div data-tech-strip className="mt-6 border border-white/8 bg-black px-5 py-5">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[.16em] text-white/40">
            <Cpu size={12} className="mr-2 inline-block text-teal" />Technologies we ship with
          </p>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <span data-tech-item key={tech.name} className="inline-flex min-h-11 items-center gap-2 border border-white/8 bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.12em] text-white/60 transition-colors duration-200 hover:border-teal/40 hover:text-teal">
                <span className="text-sm">{tech.icon}</span>{tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Badges + Founder Line */}
        <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.13em] text-white/50">
            <ShieldCheck size={16} className="text-teal" />Selected work reflects shipped product experiences
          </p>
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.13em] text-white/50">
            <Braces size={16} className="text-teal" />Production-ready code, never template theatre
          </p>
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.13em] text-white/50">
            <Zap size={16} className="text-teal" />Built by a developer who ships real systems, not demos
          </p>
        </div>
      </div>
    </section>
  );
}
