import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "../common/SectionLabel";
import FadeIn from "../FadeIn";

const GROUPS = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Database: ["MongoDB", "PostgreSQL"],
  "AI & Automation": ["OpenAI", "AI APIs", "Automation", "AI Agents"],
  "Infrastructure / Tools": ["Git", "GitHub", "Vercel", "Docker"],
};

const GROUP_KEYS = Object.keys(GROUPS);
const NODES = [
  { name: "React", x: 16, y: 24 },
  { name: "Next.js", x: 34, y: 12 },
  { name: "TypeScript", x: 67, y: 14 },
  { name: "Tailwind CSS", x: 84, y: 29 },
  { name: "Node.js", x: 12, y: 68 },
  { name: "Express.js", x: 30, y: 84 },
  { name: "MongoDB", x: 69, y: 84 },
  { name: "PostgreSQL", x: 88, y: 67 },
  { name: "OpenAI", x: 80, y: 50 },
  { name: "Vercel", x: 21, y: 48 },
];

function getGroup(name) {
  return GROUP_KEYS.find((group) => GROUPS[group].includes(name));
}

function Ecosystem({ activeTechnology, setActiveTechnology, category, reducedMotion }) {
  const visibleNodes = NODES.filter((node) => category === "All" || getGroup(node.name) === category);

  return (
    <div className="relative hidden aspect-[1.55] overflow-hidden border-y border-white/10 lg:block">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {visibleNodes.map((node) => (
          <line key={node.name} x1="50" y1="50" x2={node.x} y2={node.y} stroke={activeTechnology === node.name ? "#00A896" : "rgba(255,255,255,0.16)"} strokeWidth={activeTechnology === node.name ? "0.45" : "0.2"} strokeDasharray={activeTechnology === node.name ? "0" : "1 2"} />
        ))}
      </svg>
      <motion.div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-teal/60 bg-[#0c0f0e] text-center" animate={reducedMotion ? undefined : { rotate: [0, 3, 0, -3, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}>
        <div>
          <span className="block font-syne text-2xl font-extrabold leading-none">CORE</span>
          <span className="block font-syne text-2xl font-extrabold leading-none text-teal">CRAFT</span>
          <span className="mt-2 block font-dm text-[8px] uppercase tracking-[0.18em] text-gray">Digital systems</span>
        </div>
      </motion.div>
      {visibleNodes.map((node, index) => {
        const selected = activeTechnology === node.name;
        return (
          <motion.button key={node.name} type="button" onMouseEnter={() => setActiveTechnology(node.name)} onFocus={() => setActiveTechnology(node.name)} onClick={() => setActiveTechnology(node.name)} className={`absolute -translate-x-1/2 -translate-y-1/2 border-b pb-1 font-dm text-[10px] uppercase tracking-[0.13em] transition-colors duration-300 ${selected ? "border-teal text-white" : "border-white/20 text-gray hover:border-teal/60 hover:text-white"}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.45 }}>
            <span className="mr-2 text-[9px] text-teal/80">{String(index + 1).padStart(2, "0")}</span>{node.name}
          </motion.button>
        );
      })}
      <span className="absolute bottom-4 left-5 font-dm text-[9px] uppercase tracking-[0.2em] text-white/30">Hover / focus to inspect</span>
    </div>
  );
}

export default function TechnologyEcosystemSection() {
  const [category, setCategory] = useState("All");
  const [activeTechnology, setActiveTechnology] = useState("React");
  const reducedMotion = useReducedMotion();
  const activeGroup = getGroup(activeTechnology);

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);
    if (nextCategory !== "All" && !GROUPS[nextCategory].includes(activeTechnology)) {
      setActiveTechnology(GROUPS[nextCategory][0]);
    }
  };

  return (
    <section id="technologies" className="overflow-hidden bg-surface px-5 py-24 text-white sm:px-8 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn y={40}>
          <div className="grid gap-8 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.75fr] md:items-end md:pb-20">
            <div>
              <SectionLabel text="TECHNOLOGY / ECOSYSTEM" />
              <h2 className="mt-2 mb-6 max-w-4xl font-syne text-[2.5rem] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                <span className="block sm:inline">Technologies we</span>{" "}
                <span className="text-teal">work with.</span>
              </h2>
            </div>
            <p className="max-w-sm font-dm text-base font-light leading-relaxed text-gray md:justify-self-end md:text-lg">Modern tools. Thoughtful engineering.</p>
          </div>
        </FadeIn>

        <FadeIn y={30} delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-b border-white/10 pb-5 sm:mt-14">
            {["All", ...GROUP_KEYS].map((group) => (
              <button key={group} type="button" onClick={() => changeCategory(group)} className={`relative pb-2 font-dm text-[10px] uppercase tracking-[0.16em] transition-colors ${category === group ? "text-teal" : "text-gray hover:text-white"}`}>
                {group}
                {category === group && <motion.span layoutId="technology-category" className="absolute inset-x-0 bottom-0 h-px bg-teal" />}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="mt-8">
          <Ecosystem activeTechnology={activeTechnology} setActiveTechnology={setActiveTechnology} category={category} reducedMotion={reducedMotion} />
          <div className="border-t border-white/10 lg:hidden">
            {GROUP_KEYS.map((group) => (
              <div key={group} className="border-b border-white/10 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-dm text-[10px] uppercase tracking-[0.2em] text-teal">{group}</span>
                  <span className="font-dm text-[9px] text-white/30">{GROUPS[group].length} tools</span>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {GROUPS[group].map((technology) => (
                    <button key={technology} type="button" onClick={() => setActiveTechnology(technology)} className={`border-b pb-1 font-syne text-lg font-bold tracking-[-0.03em] transition-colors ${activeTechnology === technology ? "border-teal text-teal" : "border-white/15 text-white/55"}`}>
                      {technology}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <AnimateActiveTechnology technology={activeTechnology} group={activeGroup} />
      </div>
    </section>
  );
}

function AnimateActiveTechnology({ technology, group }) {
  return (
    <motion.div key={technology} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 flex items-center gap-4 border-l border-teal/50 pl-4" aria-live="polite">
      <span className="font-dm text-[10px] uppercase tracking-[0.18em] text-teal">Selected / {group}</span>
      <span className="font-syne text-xl font-bold uppercase tracking-[-0.03em] text-white">{technology}</span>
    </motion.div>
  );
}
