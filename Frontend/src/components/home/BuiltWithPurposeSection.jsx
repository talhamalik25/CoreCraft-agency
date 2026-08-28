import { useReducedMotion } from "framer-motion";
import { SectionLabel } from "../common/SectionLabel";
import FadeIn from "../FadeIn";

const principles = [
  {
    num: "01",
    title: "Purpose First",
    description: "We start with why. Every line of code and every pixel serves a clear business objective — no feature factories, no vanity metrics.",
  },
  {
    num: "02", 
    title: "Design With Intent",
    description: "Visuals aren't decoration. They're functional communication that guides users toward meaningful actions and clear understanding.",
  },
  {
    num: "03",
    title: "Technology That Matters",
    description: "We choose tools based on what the problem actually needs — not trends, not resume padding, not what's hot on Twitter this week.",
  },
  {
    num: "04",
    title: "Built To Evolve",
    description: "Software isn't finished when it ships. We architect systems that can grow, adapt, and scale as your business changes.",
  },
];

export default function BuiltWithPurposeSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="w-full bg-black py-24 text-white md:py-36">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn y={40}>
          <div className="mb-16 md:mb-20">
            <SectionLabel text="OUR APPROACH" />
            <h2 className="mt-6 font-syne text-[clamp(2.2rem,8vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] md:text-[clamp(3rem,7vw,6rem)]">
              Built With <span className="text-teal">Purpose.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="max-w-3xl space-y-12 md:space-y-16">
          {principles.map((principle, index) => (
            <FadeIn 
              key={principle.num} 
              y={30} 
              delay={reducedMotion ? 0 : index * 0.08}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
                <span className="text-teal/80 font-syne font-extrabold text-4xl uppercase leading-none md:text-5xl lg:text-6xl flex-shrink-0">
                  {principle.num}
                </span>
                <div className="flex-1">
                  <h3 className="text-white font-syne font-bold text-xl uppercase leading-tight mb-3 md:text-2xl lg:text-3xl">
                    {principle.title}
                  </h3>
                  <p className="text-gray text-base font-dm leading-relaxed md:text-lg">
                    {principle.description}
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
