import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from '../FadeIn';
import LiveProjectButton from '../LiveProjectButton';

const PROJECTS = [
  {
    num: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    link: 'https://sootimehal.com/',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    },
  },
  {
    num: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    link: 'https://aurora-ten-delta.vercel.app/',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    },
  },
  {
    num: '03',
    category: 'Client',
    name: 'Solaris Digital',
    link: 'https://educore-liard.vercel.app/',
    images: {
      col1Top:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
      col1Bottom:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
      col2:
        'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    },
  },
];

function ProjectCard({ project, index, totalCards }) {
  const cardRef = useRef(null);

  // Measure scroll progress of card relative to overall scroll track
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - index - 1) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const num = project.num || String(index + 1).padStart(2, '0');

  // Safe image extraction supporting both 3-image objects and single image props
  const img1 = project.images?.col1Top || project.image || '/project1.png';
  const img2 = project.images?.col1Bottom || project.image || '/project2.png';
  const img3 = project.images?.col2 || project.image || '/project3.png';

  // Stack top offset: 96px base below navbar, + 28px per card index
  const stickyTop = 96 + index * 28;

  return (
    <motion.div
      ref={cardRef}
      className="sticky rounded-[36px] sm:rounded-[48px] md:rounded-[56px]
                 border-2 border-[#D7E2EA]/20 bg-[#0C0C0C]
                 p-4 sm:p-6 md:p-8 mb-[25vh] last:mb-0 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col"
      style={{
        top: `${stickyTop}px`,
        scale,
        transformOrigin: 'top center',
        zIndex: index + 1,
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-4 sm:mb-6">
        <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
          <span
            className="hero-heading text-teal font-syne font-black leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {num}
          </span>
          <div className="flex flex-col gap-1 pt-2 sm:pt-4">
            <span
              className="text-teal/80 font-dm uppercase tracking-wide font-semibold"
              style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}
            >
              {project.category}
            </span>
            <span
              className="text-[#D7E2EA] font-syne font-medium uppercase"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
            >
              {project.name}
            </span>
          </div>
        </div>
        <div className="pt-2 sm:pt-4">
          <LiveProjectButton href={project.link || '#'} />
        </div>
      </div>

      {/* Image grid */}
      <div className="flex gap-3 sm:gap-4 flex-1 min-h-0">
        {/* Left column — 40% */}
        <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
          <img
            src={img1}
            alt={`${project.name} preview 1`}
            className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px]"
            style={{ height: 'clamp(130px, 16vw, 230px)' }}
            loading="lazy"
          />
          <img
            src={img2}
            alt={`${project.name} preview 2`}
            className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[48px] flex-1"
            style={{ height: 'clamp(160px, 22vw, 340px)' }}
            loading="lazy"
          />
        </div>

        {/* Right column — 60% */}
        <div className="w-[60%]">
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

export default function ProjectsSection({ fadeUp, projects }) {
  const projectList = (projects && projects.length > 0) ? projects : PROJECTS;

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
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="max-w-7xl mx-auto relative">
        {projectList.map((project, i) => (
          <ProjectCard
            key={project.num || project.name || i}
            project={project}
            index={i}
            totalCards={projectList.length}
          />
        ))}
      </div>
    </section>
  );
}
