import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Eye, Scaling } from 'lucide-react';
import { useGSAPAnimations } from '../hooks/useGSAP';
import AboutHero from '../components/about/AboutHero';
import GenesisSection from '../components/about/GenesisSection';

const BlueprintCard = ({ principle, index, className = '' }) => {
  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <article
      data-reveal
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden border-t border-zinc-800 p-7 sm:p-10 ${className}`}
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(260px circle at var(--mouse-x) var(--mouse-y), rgba(0, 168, 150, 0.08), transparent 70%)' }}
      />
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray">
        <span>0{index + 1} / Principle</span>
        <span className="h-2 w-2 rounded-full bg-zinc-700 transition-colors duration-300 group-hover:bg-teal" />
      </div>
      <div className="relative z-10 pt-10">
        <div className="mb-8 text-teal transition-transform duration-300 group-hover:translate-x-1">
          {React.cloneElement(principle.icon, { size: 28 })}
        </div>
        <h3 className="mb-5 max-w-md text-white font-syne text-2xl font-bold uppercase leading-none sm:text-4xl">
          {principle.name}
        </h3>
        <p data-reveal className="max-w-md text-gray font-dm text-base leading-relaxed">
          {principle.desc}
        </p>
      </div>
    </article>
  );
};

const PrinciplesBlueprint = ({ fadeUp, principles, stats }) => {
  const blueprintRef = React.useRef(null);

  useGSAPAnimations((gsap) => {
    const paragraphs = blueprintRef.current.querySelectorAll('[data-reveal]');

    gsap.fromTo(
      paragraphs,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: blueprintRef.current,
          start: 'top 78%',
          once: true,
        },
      }
    );
  }, { scope: blueprintRef });

  return (
    <section ref={blueprintRef} className="bg-surface px-4 py-20 sm:px-6 md:px-20 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[25%_75%]">
        <motion.aside {...fadeUp} className="pb-12 lg:sticky lg:top-24 lg:h-fit lg:pb-0 lg:pr-10">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-teal">01 / Our Principles</div>
          <h2 className="max-w-xs text-white font-syne text-4xl font-extrabold uppercase leading-[0.9] sm:text-5xl md:text-6xl">
            Built on intent.
          </h2>
          <p data-reveal className="mt-8 max-w-xs text-gray font-dm text-sm leading-relaxed">
            A working blueprint for creating digital systems with clarity, character, and staying power.
          </p>
        </motion.aside>

        <div className="grid grid-cols-1 border-l border-zinc-800 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <BlueprintCard
              key={principle.name}
              principle={principle}
              index={index}
              className={index === 0 ? 'sm:col-span-2 sm:min-h-[22rem]' : 'min-h-[19rem] sm:border-l sm:border-zinc-800'}
            />
          ))}
          <div data-reveal className="border-t border-zinc-800 p-7 sm:col-span-2 sm:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-gray">
              <span>02 / Impact Metrics</span>
              <span className="text-teal">System / Output</span>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`border-zinc-800 ${index > 0 ? 'sm:border-l sm:pl-8' : ''}`}>
                  <div className="mb-2 text-teal font-syne text-4xl font-extrabold sm:text-5xl">{stat.val}</div>
                  <div className="text-gray font-dm text-[10px] uppercase tracking-[0.25em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // [PLACEHOLDER: Request real current figures from the site owner before finalizing — do not invent numbers]
  const stats = [
    { val: '--', label: 'SERVICES' },
    { val: '--', label: 'PROJECTS' },
    { val: '--', label: 'CLIENTS' },
  ];

  const milestones = [
    { year: '2025', name: 'The Idea', desc: 'CoreCraft was founded with one goal: to build digital products that actually work — fast, clean, and built to last.' },
    { year: '2026', name: 'First Clients', desc: 'We shipped our first client projects and began building EduCore OS — a SaaS platform redefining school management in Pakistan.' },
    { year: 'Now', name: 'Growing', desc: 'Actively taking on new projects. We are small, precise, and fully invested in every client we work with.' },
  ];

  const principles = [
    { icon: <Target className="text-teal" />, name: 'Purpose First', desc: 'Every decision starts with the problem to solve and the people who need the result.' },
    { icon: <Zap className="text-teal" />, name: 'Design with Intent', desc: 'We give every interaction a reason to exist, balancing clarity, character, and performance.' },
    { icon: <Scaling className="text-teal" />, name: 'Scalable Growth', desc: 'We create foundations that can evolve with new ideas, new users, and the demands of a growing business.' },
    { icon: <Eye className="text-teal" />, name: 'Build to Last', desc: 'We make systems that stay understandable, adaptable, and useful long after launch.' }
  ];


  return (
    <div className="bg-black pt-20">
      <AboutHero fadeUp={fadeUp} />
      <GenesisSection fadeUp={fadeUp} milestones={milestones} />
      
      <PrinciplesBlueprint fadeUp={fadeUp} principles={principles} stats={stats} />
    </div>
  );
};

export default About;
