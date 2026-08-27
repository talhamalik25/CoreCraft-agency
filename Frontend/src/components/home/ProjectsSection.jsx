import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "../FadeIn";
import LiveProjectButton from "../LiveProjectButton";

function ProjectCard({ project, index, totalCards }) {
  const cardRef = useRef(null);

  // Measure scroll progress of card relative to overall scroll track
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const targetScale = 1 - (totalCards - index - 1) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const num = project.num || String(index + 1).padStart(2, "0");

  // Safe image extraction supporting both 3-image objects and single image props
  const img1 = project.images?.col1Top || project.image || "/project1.png";
  const img2 = project.images?.col1Bottom || project.image || "/project2.png";
  const img3 = project.images?.col2 || project.image || "/project3.png";

  // Stack top offset: 96px base below navbar, + 28px per card index
  const stickyTop = 96 + index * 28;

  return (
    <motion.div
      ref={cardRef}
      className="sticky rounded-[24px] sm:rounded-[48px] md:rounded-[56px]
                 border-2 border-[#D7E2EA]/20 bg-[#0C0C0C]
             p-3 sm:p-6 md:p-8 mb-[25vh] last:mb-0 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col"
      style={{
        top: `${stickyTop}px`,
        scale,
        transformOrigin: "top center",
        zIndex: index + 1,
      }}
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6">
        <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
          <span
            className="hero-heading text-teal font-syne font-black leading-none"
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
              className="text-[#D7E2EA] font-syne font-medium uppercase"
              style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
            >
              {project.name}
            </span>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 rounded-full border border-white/15 text-gray text-[10px] uppercase tracking-widest font-dm"
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

      {/* Image grid */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-h-0">
        {/* Left column — 40% */}
        <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4">
          <img
            src={img1}
            alt={`${project.name} preview 1`}
            className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px]"
            style={{ height: "clamp(130px, 16vw, 230px)" }}
            loading="lazy"
          />
          <img
            src={img2}
            alt={`${project.name} preview 2`}
            className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px] flex-1"
            style={{ height: "clamp(160px, 22vw, 340px)" }}
            loading="lazy"
          />
        </div>

        {/* Right column — 60% */}
        <div className="w-full sm:w-[60%] aspect-[4/3] sm:aspect-auto">
          <img
            src={img3}
            alt={`${project.name} main preview`}
            className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px]"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
                 -mt-10 sm:-mt-12 md:-mt-14 relative z-10
                 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-syne font-black uppercase text-center leading-none tracking-tight
                     mb-16 sm:mb-20 md:mb-28 text-white"
          style={{ fontSize: "clamp(2rem, 11vw, 140px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto relative">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.num || project.name || i}
            project={project}
            index={i}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  );
}