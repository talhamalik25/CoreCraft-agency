import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../FadeIn";

const PRINCIPLES = [
  {
    number: "01",
    title: "Strategy First",
    description: "We understand the business, users and goals before building.",
  },
  {
    number: "02",
    title: "Design + Engineering",
    description: "Design and development work together instead of being separate processes.",
  },
  {
    number: "03",
    title: "Built to Scale",
    description: "We create systems that can evolve as the business grows.",
  },
  {
    number: "04",
    title: "AI Ready",
    description: "We integrate AI where it creates genuine business value.",
  },
];

export default function WhyCoreCraftSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePrinciple = PRINCIPLES[activeIndex];

  return (
    <section className="overflow-hidden bg-[#101312] px-5 py-24 text-white sm:px-8 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn y={40}>
          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_0.85fr] md:items-end md:gap-16 md:pb-20">
            <div>
              <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-teal">06 / Why CoreCraft</p>
              <h2 className="mt-6 max-w-3xl font-syne text-[clamp(2.6rem,10vw,8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.065em] sm:text-[clamp(3.4rem,8vw,8rem)]">
                Why <span className="text-teal">CoreCraft.</span>
              </h2>
            </div>
            <p className="max-w-sm font-dm text-base font-light leading-relaxed text-gray md:justify-self-end md:text-lg">
              Technology is only valuable when it solves the right problem.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-14 pt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pt-20">
          <FadeIn y={30} delay={0.1}>
            <div className="md:sticky md:top-28">
              <div className="flex items-start gap-5">
                <motion.span
                  key={activePrinciple.number}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-syne text-[clamp(4rem,20vw,11rem)] font-extrabold leading-[0.78] tracking-[-0.09em] sm:text-[clamp(5rem,12vw,11rem)]"
                >
                  {activePrinciple.number}
                </motion.span>
                <span className="mt-2 h-2 w-2 rounded-full bg-teal" />
              </div>
              <p className="mt-12 max-w-md font-syne text-3xl font-bold uppercase leading-[0.9] tracking-[-0.05em] text-white sm:text-5xl">
                The right work begins with the right <span className="text-teal">question.</span>
              </p>
              <div className="mt-14 hidden h-px w-full max-w-xs bg-white/10 md:block">
                <motion.div
                  className="h-px bg-teal"
                  animate={{ width: `${((activeIndex + 1) / PRINCIPLES.length) * 100}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </div>
          </FadeIn>

          <div className="border-t border-white/10">
            {PRINCIPLES.map((principle, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={principle.number}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onViewportEnter={() => setActiveIndex(index)}
                  viewport={{ amount: 0.65, margin: "-20% 0px -20% 0px" }}
                  className="group grid w-full grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-8 text-left sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-11"
                >
                  <span className={`font-syne text-lg font-bold transition-colors duration-300 sm:text-2xl ${isActive ? "text-teal" : "text-white/25"}`}>
                    {principle.number}
                  </span>
                  <span>
                    <span className={`block font-syne text-2xl font-bold uppercase leading-none tracking-[-0.045em] transition-all duration-300 sm:text-4xl md:text-5xl ${isActive ? "translate-x-2 text-white" : "text-white/40 group-hover:translate-x-1 group-hover:text-white"}`}>
                      {principle.title}
                    </span>
                    <span className={`block max-w-lg overflow-hidden font-dm text-sm font-light leading-relaxed text-gray transition-all duration-500 sm:text-base ${isActive ? "mt-4 max-h-20 opacity-100" : "mt-0 max-h-0 opacity-0"}`}>
                      {principle.description}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
