import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const bentoItems = [
  {
    id: "01",
    title: "Digital Experiences",
    description: "Modern websites, landing pages and interactive digital experiences.",
    eyebrow: "Experience layer",
    metric: "01 / 05",
    detail: "Shape the first impression into a digital experience people remember.",
    accent: "from-cyan-400/25 via-cyan-400/5 to-transparent",
  },
  {
    id: "02", 
    title: "Digital Products",
    description: "SaaS platforms, dashboards, portals and custom web applications.",
    eyebrow: "Product layer",
    metric: "02 / 05",
    detail: "Turn complex workflows into focused products that feel simple to use.",
    accent: "from-emerald-400/20 via-emerald-400/5 to-transparent",
  },
  {
    id: "03",
    title: "AI & Automation",
    description: "AI-powered systems, intelligent workflows and automation.",
    eyebrow: "Intelligence layer",
    metric: "03 / 05",
    detail: "Put repetitive work on autopilot with useful, human-centered automation.",
    accent: "from-sky-400/20 via-sky-400/5 to-transparent",
  },
  {
    id: "04",
    title: "E-Commerce",
    description: "Premium e-commerce experiences designed for conversion.",
    eyebrow: "Commerce layer",
    metric: "04 / 05",
    detail: "Build storefronts that earn trust quickly and make every interaction count.",
    accent: "from-teal-400/20 via-teal-400/5 to-transparent",
  },
  {
    id: "05",
    title: "Brand Strategy",
    description: "Strategic brand positioning and visual identity systems.",
    eyebrow: "Identity layer",
    metric: "05 / 05",
    detail: "Give ambitious businesses a clear position and a visual system to own it.",
    accent: "from-cyan-300/20 via-cyan-300/5 to-transparent",
  }
];

const CapabilityPanel = ({ item }) => {
  return (
    <article className="group relative flex min-h-[27rem] w-full flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-7 sm:p-10 md:min-h-[31rem] md:p-14 lg:w-screen">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} />
      <div className="relative z-10 flex items-start justify-between gap-6 font-mono text-xs uppercase tracking-[0.08em] text-cyan-400">
        <span>{item.id} / {item.eyebrow}</span>
        <span className="text-white/35">{item.metric}</span>
      </div>
      <div className="relative z-10 max-w-2xl">
        <h3 className="font-syne text-4xl font-semibold leading-[0.98] text-white sm:text-5xl md:text-7xl">{item.title}</h3>
        <p className="mt-7 max-w-lg font-dm text-base leading-relaxed text-gray-400 md:text-lg">{item.description} {item.detail}</p>
        <div className="mt-10 flex items-center gap-2 font-dm text-sm text-cyan-400 transition-transform duration-300 group-hover:translate-x-2">
          Explore capability <ArrowUpRight size={16} />
        </div>
      </div>
    </article>
  );
};

const ServicesSection = () => {
  const servicesRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    const resetServicesLayout = () => {
      const directChildren = Array.from(servicesRef.current.children);

      gsap.set(
        [servicesRef.current, ...directChildren, trackRef.current],
        { clearProps: "all" }
      );
    };

    media.add("(min-width: 1024px)", () => {
      const getDistance = () => trackRef.current.scrollWidth - viewportRef.current.offsetWidth;

      gsap.to(trackRef.current, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: servicesRef.current,
          pin: viewportRef.current,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    media.add("(max-width: 1023px)", () => {
      resetServicesLayout();
      ScrollTrigger.normalizeScroll(true);

      return () => {
        ScrollTrigger.normalizeScroll(false);
        resetServicesLayout();
      };
    });

    ScrollTrigger.refresh();

    return () => {
      media.revert();
      resetServicesLayout();
      ScrollTrigger.refresh();
    };
  }, { scope: servicesRef });

  return (
    <section 
      ref={servicesRef}
      className="overflow-hidden bg-[#0D0D0D] px-5 py-24 text-white sm:px-8 md:px-16 md:py-36"
    >
      <div className="mx-auto max-w-[100rem]">
        {/* Section Header */}
        <div className="services-header mb-16 md:mb-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-cyan-400 sm:text-[12px] sm:text-[13px]">
            WHAT WE BUILD
          </p>
          <h2 className="font-syne text-[clamp(2rem,3.5vw,3rem)] font-semibold text-white">
            Strategic <span className="text-cyan-400">Capabilities</span>
          </h2>
          <p className="mt-4 max-w-2xl font-dm text-base leading-relaxed text-gray-400 md:text-lg">
            We bring design clarity and engineering depth to the digital systems ambitious businesses depend on.
          </p>
        </div>

        <div ref={viewportRef} className="overflow-hidden">
          <div ref={trackRef} className="flex w-full flex-col gap-4 lg:w-[500vw] lg:flex-row lg:gap-6">
            {bentoItems.map((item) => (
              <CapabilityPanel key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
