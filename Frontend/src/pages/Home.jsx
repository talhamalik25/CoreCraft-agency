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
    { name: 'Sooti Mehal', category: 'E-commerce', image: '/project1.png', link: 'https://sootimehal.com/' },
    { name: 'Malikenterprices', category: 'Web App', image: '/project2.png', link: 'https://malikenterprices.com/' },
    { name: 'Iqra Roadmap', category: 'Education', image: '/project3.png', link: 'https://6a19fe709f2390c597b29f72--stellar-dodol-606588.netlify.app/' },
    { name: 'Aurora', category: 'Restaurant', image: '/project4.png', link: 'https://aurora-ten-delta.vercel.app/' },
    { name: 'CoreCraft Portfolio', category: 'Portfolio', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20minimal%20dark%20theme%20portfolio%20website%20design%20with%20teal%20accent%20colors&image_size=landscape_16_9', link: '#' },
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
