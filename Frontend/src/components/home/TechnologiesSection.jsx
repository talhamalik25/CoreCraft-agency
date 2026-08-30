import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "../common/SectionLabel";
import FadeIn from "../FadeIn";

const TechOrbitalScene = dynamic(() => import("./TechOrbitalScene"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="h-[440px] w-full animate-pulse rounded-2xl border border-white/5 bg-card sm:h-[520px] lg:h-[600px]"
    />
  ),
});

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
  const [hoveredName, setHoveredName] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const reducedMotion = useReducedMotion();
  const active = TECHNOLOGIES.find(
    (t) => t.name === (hoveredName || selectedName)
  );

  const sceneWrapRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Lazy-mount the Three.js scene only when the section approaches the
  // viewport — it never touches the DOM (or the WebGL context) before then,
  // and on small screens the wrapper stays display:none so it won't init.
  useEffect(() => {
    const el = sceneWrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Detect touch / small screens so we can fall back to the static card
  // layout instead of initialising a WebGL scene that may be janky.
  useEffect(() => {
    const checkMobile = () => {
      const mq = window.matchMedia("(max-width: 768px)");
      const isTouch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(mq.matches || isTouch);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSceneHover = (name) => {
    // Preview description on hover; the parent combines hoveredName ||
    // selectedName so a locked selection is restored when the cursor leaves.
    setHoveredName(name || null);
  };

  const handleSceneSelect = (name) => {
    setSelectedName(name || null);
    setHoveredName(null);
  };

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-title"
      className="relative w-full overflow-hidden bg-surface section-x section-y text-white"
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

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-20">
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

        {/* Interactive 3D scene (desktop) or static cards (mobile) */}
        <div ref={sceneWrapRef} className="mt-12 lg:mt-16">
          {isMobile ? (
            /* ---- Mobile fallback: static card layout ---- */
            <div className="space-y-6">
              {LAYERS.map((layer) => {
                const items = TECHNOLOGIES.filter((t) => t.layer === layer);
                const selected = items.some((t) => t.name === selectedName);

                return (
                  <div
                    key={layer}
                    className="rounded-2xl border border-white/10 bg-card p-5 transition-colors sm:p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="font-syne text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                        {layer}
                      </h3>
                      <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-gray/50">
                        {String(items.length).padStart(2, "0")} /{" "}
                        {items.length + 0} tools
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {items.map((tech) => {
                        const isSel = selectedName === tech.name;
                        return (
                          <button
                            key={tech.id}
                            type="button"
                            onClick={() =>
                              setSelectedName(isSel ? null : tech.name)
                            }
                            aria-pressed={isSel}
                            className={`min-h-11 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                              isSel
                                ? "border-teal bg-teal text-black"
                                : "border-white/15 text-gray hover:border-teal/60 hover:text-white"
                            }`}
                          >
                            {tech.name}
                          </button>
                        );
                      })}
                    </div>

                    {selected && active && (
                      <p className="mt-4 border-t border-white/10 pt-4 font-dm text-sm leading-relaxed text-gray">
                        {active.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* ---- Desktop: lazy-loaded Three.js orbital scene ---- */
            <div className="relative mx-auto max-w-3xl">
              {!inView && (
                <div
                  aria-hidden="true"
                  className="h-[440px] w-full animate-pulse rounded-2xl border border-white/5 bg-card sm:h-[520px] lg:h-[600px]"
                />
              )}
              {inView && (
                <TechOrbitalScene
                  onHover={handleSceneHover}
                  onSelect={handleSceneSelect}
                  selectedName={selectedName}
                />
              )}
            </div>
          )}
        </div>

        {/* Selected / hovered technology description */}
        <div className="mt-10 border-t border-white/10 pt-6 sm:pt-8">
          {active ? (
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-start gap-x-3 gap-y-2"
              >
                <span className="font-dm text-[10px] uppercase tracking-[0.18em] text-teal">
                  {active.layer}
                </span>
                <span className="font-syne text-base font-bold uppercase tracking-[-0.02em] text-white">
                  {active.name}
                </span>
                <p className="mt-2 font-dm text-sm leading-relaxed text-gray sm:mt-0 sm:text-base">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <p className="font-dm text-sm text-gray opacity-60">
              Hover or click a node to inspect the technology.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}