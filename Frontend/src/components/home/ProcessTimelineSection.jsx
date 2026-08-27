import { useReducedMotion } from "framer-motion";
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
  const reducedMotion = useReducedMotion();

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

        <div className="max-w-3xl space-y-8 md:space-y-12">
          {steps.map((step, index) => (
            <FadeIn 
              key={step.num} 
              y={30} 
              delay={reducedMotion ? 0 : index * 0.1}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8">
                <span className="text-teal/80 font-syne font-extrabold text-3xl uppercase leading-none md:text-4xl lg:text-5xl flex-shrink-0">
                  {step.num}
                </span>
                <div className="flex-1">
                  <h3 className="text-white font-syne font-bold text-xl uppercase leading-tight mb-2 md:text-2xl lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-gray text-base font-dm leading-relaxed md:text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
