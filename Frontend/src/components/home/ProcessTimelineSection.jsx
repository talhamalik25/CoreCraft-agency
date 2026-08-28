import { SectionLabel } from "../common/SectionLabel";
import FadeIn from "../FadeIn";

const steps = [
  {
    num: "01",
    title: "Discover",
    description: "We dive deep into your business, users, and goals to understand what success actually looks like.",
  },
  {
    num: "02",
    title: "Strategize",
    description: "We map the technical path and architectural decisions that will turn your vision into a scalable reality.",
  },
  {
    num: "03",
    title: "Design",
    description: "We craft interfaces that guide users naturally toward the actions that matter for your business.",
  },
  {
    num: "04",
    title: "Build",
    description: "We engineer clean, performant code using modern tools chosen for what the problem actually needs.",
  },
  {
    num: "05",
    title: "Launch",
    description: "We deploy with confidence and set up the systems that keep your product running smoothly at scale.",
  },
];

export default function ProcessTimelineSection() {
  return (
    <section className="bg-surface px-5 py-24 text-white sm:px-8 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn y={40}>
          <div className="mb-16 md:mb-20">
            <SectionLabel text="HOW WE WORK" />
            <h2 className="mt-6 font-syne text-[clamp(2.2rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] md:text-[clamp(3rem,7vw,6rem)]">
              Our <span className="text-teal">Process.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[1fr_1fr]">
          {steps.map((step, index) => (
            <FadeIn key={step.num} y={30} className={index === 0 ? "md:col-span-7 md:row-span-2" : index === 1 ? "md:col-span-5" : index === 2 ? "md:col-span-5" : index === 3 ? "md:col-span-5" : "md:col-span-7"}>
              <article className="group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-card p-7 transition-colors duration-500 hover:border-teal/50 sm:p-9">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex items-start justify-between border-b border-white/10 pb-5">
                  <span className="font-mono text-xs tracking-[0.2em] text-teal">{step.num}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">0{index + 1} / 05</span>
                </div>
                <div className="relative z-10 mt-10">
                  <h3 className="font-syne text-2xl font-bold uppercase leading-tight text-white transition-transform duration-500 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-xl font-dm text-base leading-relaxed text-gray transition-colors duration-500 group-hover:text-white/75 md:text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="relative z-10 mt-8 h-px w-10 bg-teal transition-all duration-500 group-hover:w-20" />
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
