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
    detail: "Shape the first impression into a digital experience people remember.",
    accent: "from-teal/25 via-teal/5 to-transparent",
  },
  {
    id: "02",
    title: "Digital Products",
    description: "SaaS platforms, dashboards, portals and custom web applications.",
    eyebrow: "Product layer",
    detail: "Turn complex workflows into focused products that feel simple to use.",
    accent: "from-teal/20 via-teal/5 to-transparent",
  },
  {
    id: "03",
    title: "AI & Automation",
    description: "AI-powered systems, intelligent workflows and automation.",
    eyebrow: "Intelligence layer",
    detail: "Put repetitive work on autopilot with useful, human-centered automation.",
    accent: "from-teal/15 via-teal/5 to-transparent",
  },
  {
    id: "04",
    title: "E-Commerce",
    description: "Premium e-commerce experiences designed for conversion.",
    eyebrow: "Commerce layer",
    detail: "Build storefronts that earn trust quickly and make every interaction count.",
    accent: "from-teal/20 via-teal/5 to-transparent",
  },
  {
    id: "05",
    title: "Brand Strategy",
    description: "Strategic brand positioning and visual identity systems.",
    eyebrow: "Identity layer",
    detail: "Give ambitious businesses a clear position and a visual system to own it.",
    accent: "from-teal/15 via-teal/5 to-transparent",
  }
];

const CapabilityPanel = ({ item }) => {
  return (
    <article className="snap-center group relative flex min-h-[27rem] w-[min(85vw,26rem)] flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-card p-7 sm:w-[min(70vw,34rem)] sm:p-10 md:min-h-[31rem] md:p-14 lg:w-1/5">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} />
      <div className="relative z-10 flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
        <span>{item.eyebrow}</span>
      </div>
      <div className="relative z-10 max-w-2xl">
        <h3 className="font-syne text-[clamp(2rem,8vw,5xl)] font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-7xl">{item.title}</h3>
        <p className="mt-5 max-w-lg font-dm text-sm leading-relaxed text-gray md:mt-7 md:text-lg">{item.description} {item.detail}</p>
        <div className="mt-8 flex items-center gap-2 font-dm text-xs font-semibold uppercase tracking-[0.2em] text-teal transition-transform duration-300 group-hover:translate-x-2 md:mt-10">
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
    // Horizontal-scroll strip driven purely by VERTICAL page scroll — no
    // direct left/right swiping on any device.
    //
    //  - <section> is the trigger. When its top reaches the viewport top we
    //    PIN the track wrapper (ScrollTrigger acts as a sticky wrapper).
    //  - The pin-spacer is made exactly as tall as the horizontal travel
    //    distance: track.scrollWidth − visible viewport width. That gives the
    //    "tall inner scroll-height" needed to map a full screen of vertical
    //    scroll onto one full screen of horizontal translation.
    //  - scrub:1 maps scroll progress 0→1 onto x:0 → −distance (content slides
    //    right). The same window scroll listener serves wheel (desktop) and
    //    native touch scroll (mobile) — no touch-drag/pointer handlers.
    //  - invalidateOnRefresh + ScrollTrigger.refresh() on load keep the
    //    distance honest after fonts/images/layout settle; ScrollTrigger
    //    updates the transform on requestAnimationFrame so it stays smooth.
    const mm = gsap.matchMedia(servicesRef);

    mm.add("(min-width: 768px)", () => {
      // Desktop: continuous scroll mapping
      const getDistance = () =>
        Math.max(0, trackRef.current.scrollWidth - viewportRef.current.offsetWidth);

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

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, { scope: servicesRef });

  return (
    <section
      ref={servicesRef}
      className="w-full overflow-hidden bg-black section-x section-y text-white"
    >
      <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header mb-16 md:mb-20">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">
            WHAT WE BUILD
          </p>
          <h2 className="font-syne text-3xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-4xl md:text-7xl">
            Strategic <span className="text-teal">Capabilities</span>
          </h2>
          <p className="mt-4 max-w-2xl font-dm text-base leading-relaxed text-gray md:text-lg">
            We bring design clarity and engineering depth to the digital systems ambitious businesses depend on.
          </p>
        </div>

        {/* CSS Native scroll for mobile, GSAP for desktop */}
        <div
          ref={viewportRef}
          className="overflow-x-auto snap-x snap-mandatory pb-8 md:overflow-hidden md:pb-0 no-scrollbar relative"
        >
          <div
            ref={trackRef}
            className="flex w-max flex-row gap-4 will-change-transform lg:w-[500%] lg:gap-6"
          >
            {/* Added spacer to let first card snap-center perfectly on narrow screens */}
            <div className="md:hidden w-[10vw] flex-shrink-0" aria-hidden="true" />
            {bentoItems.map((item) => (
              <CapabilityPanel key={item.id} item={item} />
            ))}
            {/* Large spacer ensuring the final card can scroll far enough left to snap to center */}
            <div className="md:hidden w-[20vw] flex-shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
