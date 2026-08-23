import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const ServicesSection = ({ fadeUp, services }) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <motion.div {...fadeUp} className="max-w-xl">
            <SectionLabel text="OUR SERVICES" />
            <h2 className="text-white font-syne font-extrabold text-4xl sm:text-5xl md:text-7xl uppercase mb-6">FUTURE-READY.</h2>
            <p className="text-gray text-lg font-dm leading-relaxed mb-8">
              Delivering high-performance digital solutions through cutting-edge technologies and precision design.
            </p>
            <Link to="/contact" className="px-6 sm:px-8 py-3 sm:py-4 border border-teal rounded-full text-teal font-dm text-[10px] sm:text-xs uppercase tracking-widest inline-flex items-center gap-3 hover:bg-teal hover:text-black transition-all duration-300 w-fit">
              Contact Us <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to="/services" 
                className="group block p-6 sm:p-8 md:p-10 bg-card border border-white/5 rounded-2xl hover:border-teal/40 hover:bg-white/[0.02] hover:shadow-[0_0_40px_rgba(0,168,150,0.15)] transition-all duration-500 relative overflow-hidden h-full"
              >
                <div className="absolute top-0 right-0 p-6 md:p-10 text-teal/10 font-syne font-extrabold text-6xl md:text-8xl group-hover:text-teal/20 transition-colors">
                  {service.id}
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="text-gray-dim text-xs font-dm mb-6 md:mb-8">{service.id}</div>
                    <h3 className="text-white font-syne font-bold text-2xl md:text-3xl mb-4 md:mb-6 group-hover:text-teal transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray text-xs md:text-sm font-dm leading-relaxed mb-8 md:mb-10 max-w-[85%] md:max-w-[80%]">
                      {service.desc}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-3 text-teal font-dm text-xs font-semibold uppercase tracking-widest group-hover:text-white transition-colors pt-2">
                    <span>Learn More</span>
                    <div className="w-8 h-8 rounded-full border border-teal/40 flex items-center justify-center text-teal group-hover:bg-teal group-hover:border-teal group-hover:text-black transition-all duration-300">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
