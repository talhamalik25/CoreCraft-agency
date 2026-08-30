"use client";

import { useEffect, useRef } from "react";
import SmartImage from "../common/SmartImage";
import LiveProjectButton from "../LiveProjectButton";
import FadeIn from "../FadeIn";

/*
 * Sticky stacking cards — plain CSS + a rAF-throttled scroll listener
 * (no animation library).
 *
 * - Every card is `position: sticky` with a slightly increasing `top` offset
 *   (80px, 100px, 120px, ... on desktop, tighter on mobile) so the stack
 *   visibly staggers below the fixed navbar.
 * - Cards sit flush in normal flow (no vertical margins), so the next card
 *   scrolls up and covers the previous one with zero gap.
 * - While the next card travels from the bottom of the viewport to its own
 *   resting position, the card underneath eases down to scale(0.95) and
 *   fades. Values are recomputed per animation frame from live rects, so
 *   they stay perfectly in sync with scrolling (no jump-cuts, and fully
 *   reversible when scrolling back up).
 * - z-index increases with the card index, so later cards stack on top of
 *   earlier ones.
 */

// Resting state of a card once the next one has fully covered it.
const COVERED_SCALE = 0.95;
const COVERED_OPACITY = 0.55;

// Sticky top offsets: `base` clears the fixed navbar, `step` staggers each
// subsequent card so the stack fans out instead of overlapping exactly.
const getStackOffsets = () => {
  if (typeof window === "undefined") return { base: 80, step: 20 };
  if (window.innerWidth < 640) return { base: 72, step: 14 }; // phones
  if (window.innerWidth < 1024) return { base: 76, step: 18 }; // tablets
  return { base: 80, step: 20 }; // desktop → 80 / 100 / 120 / 140 / 160px
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));

function ProjectCard({ project, index }) {
  const num = project.num || String(index + 1).padStart(2, "0");

  // Safe image extraction supporting both 3-image objects and single image props
  const img1 = project.images?.col1Top || project.image || "/project1.webp";
  const img2 = project.images?.col1Bottom || project.image || "/project2.webp";
  const img3 = project.images?.col2 || project.image || "/project3.webp";

  // SSR-safe initial offset (desktop values); re-applied responsively by the
  // section-level effect below.
  const stickyTop = 80 + index * 20;

  return (
    <div
      data-stack-card
      className="sticky origin-top will-change-transform
                 rounded-[24px] sm:rounded-[48px] md:rounded-[56px]
                 border-2 border-white/15 bg-black
                 p-3 sm:p-6 md:p-8 shadow-2xl backdrop-blur-md
                 overflow-hidden flex flex-col"
      style={{ top: `${stickyTop}px`, zIndex: index + 1 }}
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
          <span
            className="text-teal font-syne font-black leading-none"
            style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
          >
            {num}
          </span>
          <div className="flex flex-col gap-1 pt-2 sm:pt-4">
            <span
              className="text-teal/80 font-dm uppercase tracking-wide font-semibold"
              style={{ fontSize: "clamp(0.7rem, 1.2vw, 1rem)" }}
            >
              {project.category}
            </span>
            <span
              className="text-white font-syne font-medium uppercase"
              style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
            >
              {project.name}
            </span>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 rounded-full border border-white/15 text-gray text-[10px] uppercase tracking-widest font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="pt-0 sm:pt-4">
          <LiveProjectButton href={project.link || "#"} />
        </div>
      </div>

      {/* Image grid — bounded image heights keep each card close to the
          viewport size so the sticky stack stays legible while cards cover
          each other. */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-h-0">
        {/* Left column — 40% */}
        <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4">
          <SmartImage
            src={img1}
            alt={`${project.name} interface preview`}
            width={project.w}
            height={project.h}
            className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px]"
            style={{ height: "clamp(130px, 16vw, 230px)" }}
            sizes="(max-width: 640px) 100vw, 40vw"
          />
          <SmartImage
            src={img2}
            alt={`${project.name} secondary screen`}
            width={project.w}
            height={project.h}
            className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px] flex-1"
            style={{ height: "clamp(160px, 22vw, 340px)" }}
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        </div>

        {/* Right column — 60% */}
        <div className="w-full sm:w-[60%] aspect-[4/3] sm:aspect-auto">
          <SmartImage
            src={img3}
            alt={`${project.name} featured screenshot`}
            width={project.w}
            height={project.h}
            className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px]"
            sizes="(max-width: 640px) 100vw, 60vw"
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }) {
  const stackRef = useRef(null);

  /*
   * Drives the stack with plain JS:
   *  - keeps each card's sticky `top` offset in sync with the viewport size,
   *  - scales/fades each card while the next one travels up to cover it.
   * Everything is measured from live rects, so the math can never drift out
   * of sync with the real layout (lazy image loads, filter changes, resizes).
   */
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const cards = Array.from(stack.querySelectorAll("[data-stack-card]"));
    if (cards.length === 0) return undefined;

    let offsets = getStackOffsets();
    let frame = 0;

    const applyOffsets = () => {
      cards.forEach((card, i) => {
        card.style.top = `${offsets.base + i * offsets.step}px`;
      });
    };

    const update = () => {
      frame = 0;
      const viewportH = window.innerHeight;

      for (let i = 0; i < cards.length; i += 1) {
        const card = cards[i];
        const next = cards[i + 1];

        // 0 → not being covered yet, 1 → fully covered by the next card.
        // Measured as the next card's journey from the bottom of the viewport
        // to its own resting (stuck) position.
        let progress = 0;
        if (next) {
          const start = viewportH;
          const end = offsets.base + (i + 1) * offsets.step;
          const nextTop = next.getBoundingClientRect().top;
          progress = clamp01((start - nextTop) / (start - end));
        }

        card.style.transform = `scale(${1 - (1 - COVERED_SCALE) * progress})`;
        card.style.opacity = (1 - (1 - COVERED_OPACITY) * progress).toFixed(3);
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const handleResize = () => {
      offsets = getStackOffsets();
      applyOffsets();
      requestUpdate();
    };

    applyOffsets();
    update();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    // Card heights change as lazy images load — re-measure when they do.
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(stack);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [projects]);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="bg-black rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
                 -mt-10 sm:-mt-12 md:-mt-14 relative z-10
                 section-x py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-syne font-black uppercase text-center leading-none tracking-tight
                     mb-16 sm:mb-20 md:mb-28 text-white"
          style={{ fontSize: "clamp(2rem, 11vw, 140px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={stackRef} className="w-full max-w-7xl mx-auto relative">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.num || project.name || i}
            project={project}
            index={i}
          />
        ))}
        {/* Run-out space so the final card dwells in its stacked position
            before the section hands over to the next one. */}
        <div aria-hidden="true" className="h-[12vh]" />
      </div>
    </section>
  );
}