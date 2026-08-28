import React, { useRef } from "react";
import dynamic from "next/dynamic";
import MarqueeStrip from "../components/home/MarqueeStrip";
import HeroSection from "../components/home/HeroSection";
import TechnologyEcosystemSection from "../components/home/TechnologyEcosystemSection";
import ProcessTimelineSection from "../components/home/ProcessTimelineSection";
import ProjectsSection from "../components/home/ProjectsSection";
import BuiltWithPurposeSection from "../components/home/BuiltWithPurposeSection";
import HomeCTA from "../components/home/HomeCTA";
import TechnologiesSection from "../components/home/TechnologiesSection";

const AboutSection = dynamic(() => import("../components/home/AboutSection"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-[24rem] bg-surface" />,
});
const ServicesSection = dynamic(() => import("../components/home/ServicesSection"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-[36rem] bg-[#0D0D0D]" />,
});
const TestimonialsSection = dynamic(() => import("../components/home/TestimonialsSection"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-[24rem] bg-surface" />,
});


const Home = () => {
  const containerRef = useRef(null);

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const services = [
    {
      id: "01",
      title: "Digital Experiences",
      desc: "Modern websites, landing pages and interactive digital experiences.",
    },
    {
      id: "02",
      title: "Digital Products",
      desc: "SaaS platforms, dashboards, portals and custom web applications.",
    },
    {
      id: "03",
      title: "AI & Automation",
      desc: "AI-powered systems, intelligent workflows and automation.",
    },
    {
      id: "04",
      title: "E-Commerce",
      desc: "Premium e-commerce experiences designed for conversion.",
    },
    {
      id: "05",
      title: "Brand Strategy",
      desc: "Strategic brand positioning and visual identity systems that differentiate and resonate.",
    },
  ];

  const projects = [
    {
      name: "Sooti Mehal",
      category: "E-commerce Platform",
      image: "/project1.webp", w: 1906, h: 943,
      link: "https://sootimehal.com/",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      name: "Malik Enterprises",
      category: "Business Management",
      image: "/project2.webp", w: 1903, h: 941,
      link: "https://malikenterprices.com/",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
    },
    {
      name: "Iqra Roadmap",
      category: "Education Platform",
      image: "/project3.webp", w: 1905, h: 942,
      link: "https://6a19fe709f2390c597b29f72--stellar-dodol-606588.netlify.app/",
      tags: ["React", "Firebase", "Framer Motion", "GSAP"],
    },
    {
      name: "Aurora",
      category: "Restaurant Website",
      image: "/project4.webp", w: 1902, h: 948,
      link: "https://aurora-ten-delta.vercel.app/",
      tags: ["Next.js", "MongoDB", "Resend API", "Vercel"],
    },
    {
      name: "Educore OS",
      category: "School Management",
      image: "/project6.webp", w: 1909, h: 939,
      link: "https://educore-liard.vercel.app/",
      tags: ["React", "Node.js", "Express", "MySQL"],
    },
  ];

  return (
    <div className="relative pt-20" ref={containerRef}>
      <HeroSection fadeUp={fadeUp} staggerContainer={staggerContainer} />
      <MarqueeStrip services={services} />
      <ServicesSection fadeUp={fadeUp} services={services} />
      <ProjectsSection projects={projects} />
      <TechnologiesSection fadeUp={fadeUp} />
      <TechnologyEcosystemSection />
      <BuiltWithPurposeSection />
      <ProcessTimelineSection />
      <TestimonialsSection />
      <AboutSection fadeUp={fadeUp} />
      <HomeCTA fadeUp={fadeUp} />
    </div>
  );
};

export default Home;
