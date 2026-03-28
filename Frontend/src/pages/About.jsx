import React from 'react';
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

  const stats = [
    { val: '25+', label: 'PROJECTS' },
    { val: '15+', label: 'CLIENTS' },
    { val: '4', label: 'SERVICES' },
    { val: '1', label: 'VISION' },
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
      <ValuesSection fadeUp={fadeUp} values={values} />
    </div>
  );
};

export default About;
