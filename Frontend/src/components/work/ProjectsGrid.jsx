"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAPAnimations } from "../../hooks/useGSAP";

export default function ProjectsGrid({ filteredProjects, filter }) {
  const gridRef = useRef(null);
  useGSAPAnimations((gsap) => {
    const cards = gridRef.current?.querySelectorAll("[data-project-card]");
    gsap.fromTo(cards, { autoAlpha: 0, y: 44, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.11, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 82%" } });
  }, { scope: gridRef, dependencies: [filter] });
  const parallax = (event) => {
    if (window.innerWidth < 768) return;
    const card = event.currentTarget; const image = card.querySelector("img"); const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(image, { x: x * 10, y: y * 8, duration: 0.7, ease: "power3.out", overwrite: true });
  };
  const resetParallax = (event) => { gsap.to(event.currentTarget.querySelector("img"), { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: true }); };
  return <section className="bg-black section-x section-y"><div ref={gridRef} className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 md:gap-7">
    {filteredProjects.map((project) => { const wide = project.isFeatured || project.id === 5; return <article data-project-card key={project.id} onPointerMove={parallax} onPointerLeave={resetParallax} className={`group overflow-hidden border border-white/10 bg-surface transition-[border-color,box-shadow] duration-500 hover:border-teal/45 hover:shadow-[0_0_38px_rgba(0,230,217,.12)] ${wide ? "md:col-span-2" : "min-h-[34rem]"}`}>
      <div className={`grid h-full ${wide ? "lg:grid-cols-[1.16fr_.84fr]" : "grid-rows-[14rem_1fr]"}`}>
        <div className={`relative overflow-hidden border-b border-white/10 ${wide ? "min-h-[17rem] lg:min-h-[30rem] lg:border-b-0 lg:border-r" : ""}`}>
          <img src={project.image} alt={`${project.name} project preview`} width={project.w} height={project.h} loading="lazy" decoding="async" className="h-full w-full scale-[1.03] object-cover opacity-70 transition-[transform,opacity] duration-700 ease-out group-hover:scale-110 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,13,13,.08),rgba(13,13,13,.62))]" /><div className="absolute left-4 top-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.15em] text-white/70"><span className="h-1.5 w-1.5 bg-teal" />Selected</div>
        </div>
        <div className={`flex h-full flex-col p-6 sm:p-8 ${wide ? "lg:p-12" : ""}`}>
          <p className="font-mono text-[9px] uppercase tracking-[.18em] text-teal">{project.tag}</p>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4"><h2 className="font-syne text-3xl font-bold uppercase leading-[.92] tracking-[-.045em] text-white transition-colors duration-300 group-hover:text-teal sm:text-4xl">{project.name}</h2><span className="border border-white/15 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.1em] text-white/55">{project.category}</span></div>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">{project.desc}</p>
          <div className="mt-7 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="translate-y-2 border border-teal/20 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.1em] text-white/55 opacity-75 transition-[transform,opacity,border-color] duration-500 group-hover:translate-y-0 group-hover:border-teal/50 group-hover:opacity-100">{tag}</span>)}</div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/link mt-auto inline-flex w-fit items-center gap-2 pt-9 font-mono text-[10px] uppercase tracking-[.14em] text-teal">View project <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/link:-translate-y-1 group-hover/link:translate-x-1" /></a>
        </div>
      </div>
    </article>; })}
  </div></section>;
}
