import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Eye } from 'lucide-react';
import AboutHero from '../components/about/AboutHero';
import GenesisSection from '../components/about/GenesisSection';
import ValuesSection from '../components/about/ValuesSection';

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

  const values = [
    { icon: <Target className="text-teal" />, name: 'Precision', desc: 'We obsess over the details others miss. Excellence is a series of small things done perfectly.' },
    { icon: <Zap className="text-teal" />, name: 'Innovation', desc: 'We don\'t follow trends. We set them by challenging convention through creative experimentation.' },
    { icon: <Eye className="text-teal" />, name: 'Transparency', desc: 'Honest communication is the cornerstone of great work. We build trust through absolute clarity.' }
  ];


  return (
    <div className="bg-black pt-20">
      <AboutHero fadeUp={fadeUp} />
      <GenesisSection fadeUp={fadeUp} milestones={milestones} />
      
      {/* Stats Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20 bg-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col border-l border-teal/20 pl-4"
            >
              <div className="text-teal font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-1 sm:mb-2">{stat.val}</div>
              <div className="text-gray text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-dm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
      
      <ValuesSection fadeUp={fadeUp} values={values} />
    </div>
  );
};

export default About;
