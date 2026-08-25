import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import FadeIn from '../FadeIn';

const defaultServices = [
  { id: '01', title: 'Web Development', desc: 'High-performance, scalable web applications built with architectural precision.' },
  { id: '02', title: 'Custom Web Apps', desc: 'Tailor-made applications engineered around your exact business logic and workflows.' },
  { id: '03', title: 'SaaS Development', desc: 'Full-spectrum SaaS products — multi-tenant, subscription-ready, and built to scale.' },
  { id: '04', title: 'UI/UX Design', desc: 'Visual systems that command attention and user journeys that drive results.' },
];

const ServicesSection = ({ fadeUp, services = defaultServices }) => {
  const serviceList = (services && services.length > 0) ? services : defaultServices;

  return (
    <section className="py-24 md:py-36 px-4 sm:px-6 md:px-20 bg-surface text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Services Heading */}
        <FadeIn delay={0} y={40}>
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <SectionLabel text="OUR SERVICES" />
              <h2 className="text-white font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight leading-none mt-4">
                SERVICES
              </h2>
            </div>
            <Link 
              to="/contact" 
              className="px-6 sm:px-8 py-3 sm:py-4 border border-teal rounded-full text-teal font-dm text-xs uppercase tracking-widest inline-flex items-center gap-3 hover:bg-teal hover:text-black transition-all duration-300 w-fit self-start md:self-end mb-2"
            >
              Contact Us <ArrowUpRight size={16} />
            </Link>
          </div>
        </FadeIn>

        {/* Editorial Service Rows */}
        <div className="divide-y divide-white/10 border-b border-white/10">
          {serviceList.map((service, i) => {
            const num = service.id || service.num || `0${i + 1}`;
            const title = service.title || service.name;
            const desc = service.desc;

            return (
              <FadeIn
                key={num}
                delay={i * 0.1}
                y={30}
              >
                <div className="group py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start hover:bg-white/[0.015] transition-colors duration-300 rounded-xl px-2 sm:px-4">
                  {/* Large Number */}
                  <div className="md:col-span-2 lg:col-span-2 text-teal/80 group-hover:text-teal font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight transition-colors duration-300">
                    {num}
                  </div>

                  {/* Service Title */}
                  <div className="md:col-span-4 lg:col-span-4">
                    <h3 className="text-white font-syne font-bold text-2xl sm:text-3xl md:text-4xl uppercase group-hover:text-teal transition-colors duration-300">
                      {title}
                    </h3>
                  </div>

                  {/* Description & Action */}
                  <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between gap-6">
                    <p className="text-gray font-dm text-sm sm:text-base md:text-lg leading-relaxed">
                      {desc}
                    </p>
                    <Link 
                      to="/services" 
                      className="inline-flex items-center gap-3 text-teal font-dm text-xs font-semibold uppercase tracking-widest group-hover:text-white transition-colors w-fit pt-2"
                    >
                      <span>Learn More</span>
                      <div className="w-8 h-8 rounded-full border border-teal/40 flex items-center justify-center text-teal group-hover:bg-teal group-hover:border-teal group-hover:text-black transition-all duration-300">
                        <ArrowRight size={16} />
                      </div>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
