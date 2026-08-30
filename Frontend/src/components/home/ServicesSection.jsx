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
    <article className="group relative flex min-h-[27rem] w-[min(85vw,26rem)] flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-card p-7 sm:w-[min(70vw,34rem)] sm:p-10 md:min-h-[31rem] md:p-14 lg:w-1/5">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`} />
      <div className="relative z-10 flex items-start justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-teal">
        <span>{item.eyebrow}</span>
      </div>
      <div className="relative z-10 max-w-2xl">
        <h3 className="font-syne text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-7xl">{item.title}</h3>
        <p className="mt-7 max-w-lg font-dm text-base leading-relaxed text-gray md:text-lg">{item.description} {item.detail}</p>
        <div className="mt-10 flex items-center gap-2 font-dm text-xs font-semibold uppercase tracking-[0.2em] text-teal transition-transform duration-300 group-hover:translate-x-2">
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

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      if (isDesktop) {
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
      } else {
        // Mobile: Distinct stops (enter, dwell, exit) per card
        const cards = Array.from(trackRef.current.children);
        if (cards.length === 0) return;

        // Allocate ~1 vertical screen of scroll height per card
        // to ensure enough scroll distance to play the pauses smoothly.
        const getCustomEnd = () => window.innerHeight * cards.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            pin: viewportRef.current,
            start: "top top",
            end: () => `+=${getCustomEnd()}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          // Dynamically find the translateX target so the card is exactly centered in the viewport
          const getCenterTarget = () => {
            const viewportW = viewportRef.current.offsetWidth;
            const cardW = card.offsetWidth;
            const cardLeft = card.offsetLeft;
            const maxScroll = Math.max(0, trackRef.current.scrollWidth - viewportW);

            let targetX = (viewportW / 2) - (cardLeft + cardW / 2);
            // Don't scroll past the track container's natural left/right bounds
            return Math.max(-maxScroll, Math.min(0, targetX));
          };

          if (index === 0) {
            // Card 0: slightly coax it into dead center, then pause.
            tl.to(trackRef.current, {
              x: getCenterTarget,
              duration: 1,
              ease: "none"
            });
            // Dwell (pause vertical scroll effect on horizontal translation)
            tl.to({}, { duration: 3 });
          } else {
            // Subsequent cards: transition in, then pause.
            tl.to(trackRef.current, {
              x: getCenterTarget,
              duration: 2.5,
              ease: "power2.inOut" // smooth transition
            });
            // Dwell
            tl.to({}, { duration: 3 });
          }
        });
      }
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="services-header mb-16 md:mb-20">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">
            WHAT WE BUILD
          </p>
          <h2 className="font-syne text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-7xl">
            Strategic <span className="text-teal">Capabilities</span>
          </h2>
          <p className="mt-4 max-w-2xl font-dm text-base leading-relaxed text-gray md:text-lg">
            We bring design clarity and engineering depth to the digital systems ambitious businesses depend on.
          </p>
        </div>

        {/* Scroll-pinned horizontal strip — the wrapper is clipped so the only
            way the cards move is the translateX driven by vertical scroll. */}
        <div
          ref={viewportRef}
          className="overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex w-max flex-row gap-4 will-change-transform lg:w-[500%] lg:gap-6"
          >
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
