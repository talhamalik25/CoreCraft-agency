import React, { useState } from 'react';
import { ArrowUpRight, BrainCircuit, ChevronDown, Code2, Layers3, Monitor, Smartphone, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGSAPAnimations } from '../hooks/useGSAP';
import ServicesHero from '../components/services/ServicesHero';
import ProcessSection from '../components/services/ProcessSection';
import ToolsSection from '../components/services/ToolsSection';
import ServicesCTA from '../components/services/ServicesCTA';

const SERVICES = [
  {
    num: '01', name: 'Digital Experiences', icon: Monitor,
    desc: 'High-performance websites and digital environments that turn a first impression into a lasting signal.',
    capabilities: ['Art direction', 'Interaction design', 'Next.js builds', 'Motion systems'],
    type: 'experience',
  },
  {
    num: '02', name: 'Digital Products', icon: Layers3,
    desc: 'Focused product interfaces that make complex workflows feel clear, capable, and ready to scale.',
    capabilities: ['Product strategy', 'Design systems', 'User portals', 'Role-based flows'],
    type: 'product',
  },
  {
    num: '03', name: 'AI & Automation', icon: BrainCircuit,
    desc: 'Intelligent systems and connected workflows that put repetitive work on autopilot without losing the human edge.',
    capabilities: ['LLM integrations', 'Workflow automation', 'Data pipelines', 'AI interfaces'],
    type: 'ai',
  },
  {
    num: '04', name: 'E-Commerce', icon: ShoppingBag,
    desc: 'Conversion-minded commerce experiences built to make discovery, trust, and checkout feel effortless.',
    capabilities: ['Storefronts', 'Custom checkout', 'Payment systems', 'Growth analytics'],
    type: 'commerce',
  },
  {
    num: '05', name: 'Mobile Apps', icon: Smartphone,
    desc: 'Useful mobile products with native-feeling interactions, thoughtful states, and a dependable technical core.',
    capabilities: ['Mobile strategy', 'Cross-platform builds', 'Push experiences', 'App deployment'],
    type: 'mobile',
  },
];

const Dashboard = ({ fadeUp }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const previewRef = React.useRef(null);
  const activeService = SERVICES[activeIndex];

  useGSAPAnimations((gsap) => {
    gsap.fromTo(
      previewRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    );
  }, { dependencies: [activeIndex], scope: previewRef });

  const activateService = (index) => {
    setActiveIndex(index);
    setOpenIndex((current) => (current === index ? current : index));
  };

  return (
    <section className="px-4 pb-20 sm:px-6 md:px-20 md:pb-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-8 border-b border-zinc-800 pb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-teal">Capabilities / 05</div>
          <div className="border-t border-zinc-800">
            {SERVICES.map((service, index) => {
              const isActive = activeIndex === index;
              const isOpen = openIndex === index;
              const Icon = service.icon;

              return (
                <motion.div key={service.num} {...fadeUp} transition={{ delay: index * 0.08 }} className="border-b border-zinc-800">
                  <button
                    type="button"
                    onClick={() => activateService(index)}
                    onMouseEnter={() => activateService(index)}
                    aria-expanded={isOpen}
                    className={`group flex w-full items-center gap-5 py-7 text-left transition-colors duration-300 sm:py-9 ${isActive ? 'text-white' : 'text-white/55 hover:text-white'}`}
                  >
                    <span className={`font-mono text-[10px] tracking-[0.18em] transition-colors ${isActive ? 'text-teal' : 'text-white/30'}`}>{service.num}</span>
                    <Icon size={20} className={`transition-colors ${isActive ? 'text-teal' : 'text-white/35 group-hover:text-teal'}`} />
                    <span className="flex-1 font-syne text-2xl font-bold uppercase leading-none sm:text-3xl">{service.name}</span>
                    <ChevronDown size={18} className={`transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180 text-teal' : 'text-white/35'}`} />
                    <ArrowUpRight size={20} className={`hidden transition-transform duration-300 lg:block ${isActive ? 'translate-x-1 -translate-y-1 text-teal' : 'text-white/25 group-hover:text-teal'}`} />
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="border-l border-teal/40 pb-8 pl-10">
                        <p className="mb-6 max-w-lg text-gray font-dm text-sm leading-relaxed">{service.desc}</p>
                        <CapabilityList service={service} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-32">
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              <span>Technical canvas</span>
              <span className="text-teal">Live / {activeService.num}</span>
            </div>
            <div ref={previewRef} className="relative aspect-[4/3] overflow-hidden border border-zinc-800 bg-surface p-8 sm:p-12">
              <CanvasGrid />
              <PreviewGraphic type={activeService.type} />
              <div className="absolute inset-x-8 bottom-7 flex items-end justify-between border-t border-zinc-800 pt-4 sm:inset-x-12">
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-teal">Active blueprint</div>
                  <div className="font-syne text-xl font-bold uppercase text-white">{activeService.name}</div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">CoreCraft / 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilityList = ({ service }) => (
  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
    {service.capabilities.map((capability) => (
      <li key={capability} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
        <span className="h-1.5 w-1.5 bg-teal" />
        {capability}
      </li>
    ))}
  </ul>
);

const CanvasGrid = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-8 border border-zinc-800 sm:inset-12">
    <div className="absolute left-1/2 top-0 h-full w-px bg-zinc-800" />
    <div className="absolute left-0 top-1/2 h-px w-full bg-zinc-800" />
    <span className="absolute -left-2 -top-2 h-1 w-1 bg-teal" />
    <span className="absolute -bottom-2 -right-2 h-1 w-1 bg-teal" />
  </div>
);

const PreviewGraphic = ({ type }) => {
  if (type === 'ai') {
    return <div className="absolute inset-0 flex items-center justify-center text-teal"><BrainCircuit size={120} strokeWidth={0.7} /></div>;
  }

  if (type === 'mobile') {
    return <div className="absolute inset-0 flex items-center justify-center text-teal"><Smartphone size={115} strokeWidth={0.7} /></div>;
  }

  if (type === 'commerce') {
    return <div className="absolute inset-0 flex items-center justify-center text-teal"><ShoppingBag size={115} strokeWidth={0.7} /></div>;
  }

  if (type === 'product') {
    return <div className="absolute inset-0 flex items-center justify-center text-teal"><Layers3 size={125} strokeWidth={0.7} /></div>;
  }

  return <div className="absolute inset-0 flex items-center justify-center text-teal"><Monitor size={145} strokeWidth={0.7} /></div>;
};

const Services = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: 'easeOut' },
  };

  const processSteps = [
    { name: 'Discovery', desc: 'Defining vision, user requirements, and technical constraints.' },
    { name: 'Design', desc: 'Translating discovery into high-fidelity visual languages.' },
    { name: 'Develop', desc: 'Transforming designs into performant, clean-coded realities.' },
    { name: 'Deliver', desc: 'Rigorous testing, final deployment, and continuous optimization.' },
  ];
  const tools = ['React', 'Node.js', 'MongoDB', 'Express', 'Figma', 'TailwindCSS', 'Python', 'AWS'];

  return (
    <div className="bg-black pt-20">
      <ServicesHero fadeUp={fadeUp} />
      <Dashboard fadeUp={fadeUp} />
      <ProcessSection fadeUp={fadeUp} processSteps={processSteps} />
      <ToolsSection fadeUp={fadeUp} tools={tools} />
      <ServicesCTA fadeUp={fadeUp} />
    </div>
  );
};

export default Services;