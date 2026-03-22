import React, { useState } from 'react';
import WorkHero from '../components/work/WorkHero';
import FilterBar from '../components/work/FilterBar';
import ProjectsGrid from '../components/work/ProjectsGrid';
import WorkCTA from '../components/work/WorkCTA';

const Work = () => {
  const [filter, setFilter] = useState('All');

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const categories = ['All', 'Web Dev', 'AI', 'Design', 'Marketing'];

  const projects = [
    {
      id: 1,
      name: 'Neon Syndicate',
      category: 'Web Dev',
      desc: 'A full-scale digital ecosystem for the next generation of cyberpunk gaming. Custom engine integration and visceral UI design.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
      isFeatured: true,
      tag: 'FLAGSHIP PROJECT'
    },
    {
      id: 2,
      name: 'Onyx Chronos',
      category: 'Web Dev',
      desc: 'High-performance e-commerce for luxury horology brands.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      name: 'Aether Intelligence',
      category: 'AI',
      desc: 'Predictive analytics engine for distributed cloud networks.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      name: 'Retro Vibe',
      category: 'Design',
      desc: 'Identity system for a boutique synthesizer manufacturer.',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 5,
      name: 'Scale Matrix',
      category: 'Marketing',
      desc: 'Growth hacking strategy for an emerging Fintech unicorn.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-black pt-20">
      <WorkHero fadeUp={fadeUp} />
      <FilterBar categories={categories} filter={filter} setFilter={setFilter} />
      <ProjectsGrid filteredProjects={filteredProjects} />
      <WorkCTA fadeUp={fadeUp} />
    </div>
  );
};

export default Work;
