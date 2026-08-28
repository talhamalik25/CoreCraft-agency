import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "../common/SectionLabel";
import FadeIn from "../FadeIn";

const TECHNOLOGIES = [
  { id: "react", name: "React", layer: "Frontend", description: "Component-driven interfaces for modern web applications." },
  { id: "nextjs", name: "Next.js", layer: "Frontend", description: "Production-ready web experiences with fast, flexible rendering." },
  { id: "javascript", name: "JavaScript", layer: "Frontend", description: "Expressive interaction and resilient browser-side logic." },
  { id: "tailwind", name: "Tailwind CSS", layer: "Frontend", description: "Fast, consistent interface construction at system scale." },
  { id: "framer-motion", name: "Framer Motion", layer: "Frontend", description: "Purposeful movement that makes digital products feel alive." },
  { id: "nodejs", name: "Node.js", layer: "Backend", description: "Scalable server-side applications and real-time systems." },
  { id: "express", name: "Express.js", layer: "Backend", description: "Focused API architecture for dependable web services." },
  { id: "mongodb", name: "MongoDB", layer: "Backend", description: "Flexible data layers designed around evolving products." },
  { id: "rest-apis", name: "REST APIs", layer: "Backend", description: "Clear, connected product experiences across every endpoint." },
  { id: "gemini-api", name: "Gemini API", layer: "AI & Automation", description: "LLM-powered chat, lead capture, and content generation baked into the product." },
  { id: "workflow-automation", name: "Workflow Automation", layer: "AI & Automation", description: "Connected pipelines that replace manual, repetitive business tasks." },
  { id: "resend", name: "Resend", layer: "AI & Automation", description: "Transactional email infrastructure for lead notifications and automations." },
  { id: "figma", name: "Figma", layer: "Design", description: "Collaborative design systems with every detail considered." },
  { id: "ui-ux", name: "UI/UX Design", layer: "Design", description: "Intuitive journeys that make every interaction count." },
  { id: "motion-design", name: "Motion Design", layer: "Design", description: "Dynamic visual language that adds rhythm and meaning." },
];

const LAYERS = ["Frontend", "Backend", "AI & Automation", "Design"];

export default function TechnologiesSection() {
  const [activeId, setActiveId] = useState(null);
  const reducedMotion = useReducedMotion();
  const active = TECHNOLOGIES.find((t) => t.id === activeId);

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-title"
      className="relative w-full overflow-hidden bg-surface py-20 text-white md:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.75) .7px, transparent .7px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 pb-10 md:pb-12">
          <FadeIn delay={0} y={20}>
            <SectionLabel text="TECHNOLOGY" />
          </FadeIn>

          <div className="xl:grid xl:grid-cols-[minmax(0,1.45fr)_minmax(17rem,.55fr)] xl:items-end xl:gap-16">
            <FadeIn delay={0.08} y={28}>
              <h2
                id="technologies-title"
                className="font-syne text-[clamp(2.25rem,9vw,7rem)] font-extrabold uppercase leading-[0.86] tracking-tight text-white sm:text-[clamp(2.5rem,7vw,7rem)]"
              >
                <span className="block">The Stack</span>
                <span className="block text-white/45">Behind The Work</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.18} y={16} className="mt-9 hidden xl:block">
              <p className="max-w-xs font-dm text-sm leading-relaxed text-gray">
                One connected system, not a pile of tools — from what a
                visitor clicks to the automation that follows up while you
                sleep.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Layered stack */}
        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-teal/60 via-white/15 to-teal/60 sm:left-[9px]"
          />

          <div className="space-y-3">
            {LAYERS.map((layer, layerIndex) => {
              const items = TECHNOLOGIES.filter((t) => t.layer === layer);
              const layerActive = items.some((t) => t.id === activeId);

              return (
                <FadeIn key={layer} delay={0.06 * layerIndex} y={24}>
                  <div className="relative pl-8 sm:pl-10">
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-2.5 h-[15px] w-[15px] rounded-full border-2 bg-surface transition-colors duration-300 sm:h-[19px] sm:w-[19px] ${
                        layerActive ? "border-teal" : "border-white/25"
                      }`}
                    />

                    <div className="rounded-2xl border border-white/10 bg-card p-5 transition-colors duration-300 hover:border-teal/25 sm:p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-syne text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                          {layer}
                        </h3>
                        <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-gray/50">
                          {String(layerIndex + 1).padStart(2, "0")} /{" "}
                          {items.length} tools
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {items.map((tech) => {
                          const selected = activeId === tech.id;
                          return (
                            <button
                              key={tech.id}
                              type="button"
                              onClick={() =>
                                setActiveId(selected ? null : tech.id)
                              }
                              aria-pressed={selected}
                              className={`rounded-full border px-4 py-2 font-dm text-xs uppercase tracking-widest transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                                selected
                                  ? "border-teal bg-teal text-black"
                                  : "border-white/15 text-gray hover:border-teal/60 hover:text-white"
                              }`}
                            >
                              {tech.name}
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence initial={false}>
                        {layerActive && active && (
                          <motion.div
                            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reducedMotion ? {} : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 border-t border-white/10 pt-4 font-dm text-sm leading-relaxed text-gray">
                              {active.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}