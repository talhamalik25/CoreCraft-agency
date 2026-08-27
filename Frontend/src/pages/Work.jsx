import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorkHero from '../components/work/WorkHero';
import WorkCTA from '../components/work/WorkCTA';
import FilterBar from '../components/work/FilterBar';
import ProjectsGrid from '../components/work/ProjectsGrid';

const Work = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const projects = [
    { id: 1, name: 'Sooti Mehal', category: 'E-commerce Platform', tag: 'E-commerce Platform', desc: 'A premium handcrafted home decor e-commerce website with modern design and seamless shopping experience.', image: '/project1.png', isFeatured: true, link: 'https://sootimehal.com/', tags: ["React", "Node.js", "MongoDB", "Stripe"] },
    { id: 2, name: 'Malik Enterprises', category: 'Business Management', tag: 'Business Platform', desc: 'Custom business management application with inventory tracking and client management features.', image: '/project2.png', isFeatured: false, link: 'https://malikenterprices.com/', tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"] },
    { id: 3, name: 'Iqra Roadmap', category: 'Education Platform', tag: 'Learning Platform', desc: 'Interactive education roadmap platform for students to track their learning journey.', image: '/project3.png', isFeatured: false, link: 'https://6a19fe709f2390c597b29f72--stellar-dodol-606588.netlify.app/', tags: ["React", "Firebase", "Framer Motion", "GSAP"] },
    { id: 4, name: 'Aurora', category: 'Restaurant Website', tag: 'Restaurant Website', desc: 'Elegant restaurant website with online ordering and reservation system.', image: '/project4.png', isFeatured: true, link: 'https://aurora-ten-delta.vercel.app/', tags: ["Next.js", "MongoDB", "Resend API", "Vercel"] },
    { id: 5, name: 'Educore OS', category: 'School Management', image: '/project6.png', tag: 'Learning platform',desc: 'A modern school management system that simplifies student administration, attendance, academics, fee tracking, and parent-teacher communication through an intuitive dashboard.' ,link: 'https://educore-liard.vercel.app/', tags: ["React", "Node.js", "Express", "MySQL"] },
  ];


  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const [filter, setFilter] = useState('All');

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
