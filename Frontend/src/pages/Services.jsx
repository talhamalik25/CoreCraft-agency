import React from 'react';
import ServicesHero from '../components/services/ServicesHero';
import ServiceRows from '../components/services/ServiceRows';
import ProcessSection from '../components/services/ProcessSection';
import ToolsSection from '../components/services/ToolsSection';
import ServicesCTA from '../components/services/ServicesCTA';

const Services = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const serviceRows = [
    {
      num: '01',
      name: 'Web Development',
      desc: 'Scalable, robust, and lightning-fast web applications built with the most modern stacks. We prioritize architectural integrity and user experience in every line of code.',
      tags: ['MERN', 'SaaS', 'REST APIs', 'Next.js']
    },
    {
      num: '02',
      name: 'AI Solutions',
      desc: 'Empowering business workflows through intelligent automation. From custom LLM implementations to predictive analytics, we make your data work harder.',
      tags: ['Chatbots', 'Automation', 'ML', 'LLM Fine-tuning']
    },
    {
      num: '03',
      name: 'UI/UX Design',
      desc: 'Visual systems that command attention. We build design languages that scale, ensuring consistency and brand authority across every digital touchpoint.',
      tags: ['Figma', 'Prototyping', 'Design Systems', 'Motion']
    },
    {
      num: '04',
      name: 'Digital Marketing',
      desc: 'Strategic growth through precision targeting. We don\'t just find an audience; we build a movement around your digital presence.',
      tags: ['SEO', 'Social Media', 'Campaigns', 'Growth Hacking']
    }
  ];

  const processSteps = [
    { name: 'Discovery', desc: 'Defining vision, user requirements, and technical constraints.' },
    { name: 'Design', desc: 'Translating discovery into high-fidelity visual languages.' },
    { name: 'Develop', desc: 'Transforming designs into performant, clean-coded realities.' },
    { name: 'Deliver', desc: 'Rigorous testing, final deployment, and continuous optimization.' }
  ];

  const tools = ['React', 'Node.js', 'MongoDB', 'Express', 'Figma', 'TailwindCSS', 'Python', 'AWS'];

  return (
    <div className="bg-black pt-20">
      <ServicesHero fadeUp={fadeUp} />
      <ServiceRows fadeUp={fadeUp} serviceRows={serviceRows} />
      <ProcessSection fadeUp={fadeUp} processSteps={processSteps} />
      <ToolsSection fadeUp={fadeUp} tools={tools} />
      <ServicesCTA fadeUp={fadeUp} />
    </div>
  );
};

export default Services;
