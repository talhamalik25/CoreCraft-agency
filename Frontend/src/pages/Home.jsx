import React, { useRef } from 'react';
import MarqueeStrip from '../components/home/MarqueeStrip';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import HomeCTA from '../components/home/HomeCTA';

const Home = () => {
  const containerRef = useRef(null);

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const services = [
    { id: '01', title: 'Web Development', desc: 'High-performance, scalable web applications built with architectural precision.' },
    { id: '02', title: 'Custom Web Apps', desc: 'Tailor-made applications engineered around your exact business logic and workflows.' },
    { id: '03', title: 'SaaS Development', desc: 'Full-spectrum SaaS products — multi-tenant, subscription-ready, and built to scale.' },
    { id: '04', title: 'UI/UX Design', desc: 'Visual systems that command attention and user journeys that drive results.' },
  ];

  const projects = [
    { name: 'Vitesse Drive', category: 'Web App', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Aura Intel', category: 'AI Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
    { name: 'Neon Syndicate', category: 'E-commerce', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="relative pt-20" ref={containerRef}>
      <HeroSection fadeUp={fadeUp} staggerContainer={staggerContainer} />
      <MarqueeStrip />
      <AboutSection fadeUp={fadeUp} />
      <ServicesSection fadeUp={fadeUp} services={services} />
      <ProjectsSection fadeUp={fadeUp} projects={projects} />
      <HomeCTA fadeUp={fadeUp} />
    </div>
  );
};

export default Home;
