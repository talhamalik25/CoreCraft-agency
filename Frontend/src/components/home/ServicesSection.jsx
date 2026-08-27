import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../common/SectionLabel";
import FadeIn from "../FadeIn";

const capabilities = [
  {
    id: "01",
    title: "Digital Experiences",
    desc: "Modern websites, landing pages and interactive digital experiences.",
    mark: "DX",
    detail: "INTERFACE / MOTION / STORY",
  },
  {
    id: "02",
    title: "Digital Products",
    desc: "SaaS platforms, dashboards, portals and custom web applications.",
    mark: "DP",
    detail: "PRODUCT / SYSTEMS / SCALE",
  },
  {
    id: "03",
    title: "AI & Automation",
    desc: "AI-powered systems, intelligent workflows and automation.",
    mark: "AI",
    detail: "INTELLIGENCE / FLOW / LEVERAGE",
  },
  {
    id: "04",
    title: "E-Commerce",
    desc: "Premium e-commerce experiences designed for conversion.",
    mark: "EC",
    detail: "COMMERCE / TRUST / CONVERSION",
  },
  {
    id: "05",
    title: "Brand Strategy",
    desc: "Strategic brand positioning and visual identity systems that differentiate and resonate.",
    mark: "BS",
    detail: "POSITIONING / IDENTITY / VOICE",
  },
];

function CapabilityVisual({ capability, index }) {
  const rotation = index % 2 === 0 ? -8 : 8;

  return (
    <div className="relative aspect-square w-full max-w-[420px] overflow-hidden border border-white/10 bg-[#101514] p-8 sm:p-12">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      <motion.div
        key={capability.id}
        initial={{ opacity: 0, scale: 0.88, rotate: rotation - 8 }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        exit={{ opacity: 0, scale: 1.08, rotate: rotation + 8 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-full items-center justify-center border border-teal/50"
      >
        <div className="absolute inset-[14%] border border-white/25" />
        <div className="absolute inset-[28%] border border-teal/60" />
        <span className="relative font-syne text-[clamp(3.25rem,16vw,7rem)] font-extrabold tracking-[-0.08em] text-white">
          {capability.mark}
        </span>
        <span className="absolute left-4 top-4 font-dm text-[9px] tracking-[0.25em] text-teal">
          {capability.id}
        </span>
        <span className="absolute bottom-4 right-4 text-right font-dm text-[9px] tracking-[0.18em] text-white/45">
          {capability.detail}
        </span>
      </motion.div>
    </div>
  );
}

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapability = capabilities[activeIndex];

  return (
    <section className="overflow-hidden bg-surface px-5 py-24 text-white sm:px-8 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn y={40}>
          <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:pb-20">
            <div>
              <SectionLabel text="WHAT WE BUILD" />
              <h2 className="mt-6 max-w-2xl font-syne text-[clamp(2.5rem,11vw,7.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.06em] sm:text-[clamp(3.2rem,8vw,7.5rem)]">
                What we <span className="text-teal">build.</span>
              </h2>
            </div>
            <p className="max-w-md self-end font-dm text-base font-light leading-relaxed text-gray sm:text-lg">
              We bring design clarity and engineering depth to the digital
              systems ambitious businesses depend on.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-12 pt-12 md:grid-cols-[minmax(240px,0.65fr)_minmax(0,1.35fr)] md:gap-16 md:pt-20">
          <FadeIn y={25} delay={0.1}>
            <div className="flex justify-center md:sticky md:top-28 md:block">
              <AnimatePresence mode="wait">
                <CapabilityVisual
                  key={activeCapability.id}
                  capability={activeCapability}
                  index={activeIndex}
                />
              </AnimatePresence>
            </div>
          </FadeIn>

          <div className="divide-y divide-white/10 border-b border-white/10">
            {capabilities.map((capability, index) => {
              const isActive = index === activeIndex;

              return (
                <FadeIn key={capability.id} y={25} delay={0.15 + index * 0.08}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-3 py-7 text-left transition-colors duration-300 sm:grid-cols-[5rem_1fr_auto] sm:gap-6 sm:py-10"
                  >
                    <span className={`font-syne text-lg font-bold transition-colors duration-300 sm:text-2xl ${isActive ? "text-teal" : "text-white/35"}`}>
                      {capability.id}
                    </span>
                    <span>
                      <span className={`block font-syne text-2xl font-bold uppercase leading-none tracking-[-0.04em] transition-transform transition-colors duration-300 sm:text-4xl md:text-5xl ${isActive ? "translate-x-2 text-teal" : "text-white group-hover:translate-x-1 group-hover:text-teal"}`}>
                        {capability.title}
                      </span>
                      <span className={`block max-w-lg overflow-hidden font-dm text-sm font-light leading-relaxed text-gray transition-all duration-500 sm:text-base ${isActive ? "mt-4 max-h-20 opacity-100" : "mt-0 max-h-0 opacity-0 md:group-hover:mt-3 md:group-hover:max-h-20 md:group-hover:opacity-100"}`}>
                        {capability.desc}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      className={`mt-1 transition-all duration-300 ${isActive ? "translate-x-1 -translate-y-1 text-teal" : "text-white/25 group-hover:text-teal"}`}
                    />
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
