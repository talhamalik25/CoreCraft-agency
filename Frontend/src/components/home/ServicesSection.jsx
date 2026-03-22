import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const ServicesSection = ({ fadeUp, services }) => {
  return (
    <section className="py-32 px-6 md:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div {...fadeUp}>
            <SectionLabel text="OUR SERVICES" />
            <h2 className="text-white font-syne font-extrabold text-5xl md:text-7xl uppercase mb-6">FUTURE-READY.</h2>
            <p className="text-gray text-lg font-dm max-w-xl">
              Delivering high-performance digital solutions through cutting-edge technologies and precision design.
            </p>
          </motion.div>
          <motion.div {...fadeUp}>
            <Link to="/contact" className="px-8 py-4 border border-teal rounded-full text-teal font-dm text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-teal hover:text-black transition-all duration-300">
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
              className="group p-8 md:p-10 bg-card border border-white/5 rounded-2xl hover:border-teal/20 hover:shadow-[0_0_40px_rgba(0,168,150,0.1)] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 md:p-10 text-teal/10 font-syne font-extrabold text-6xl md:text-8xl group-hover:text-teal/20 transition-colors">
                {service.id}
              </div>
              <div className="relative z-10">
                <div className="text-gray-dim text-xs font-dm mb-8 md:mb-12">{service.id}</div>
                <h3 className="text-white font-syne font-bold text-2xl md:text-3xl uppercase mb-4 md:mb-6 group-hover:text-teal transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray text-xs md:text-sm font-dm leading-relaxed mb-8 md:mb-12 max-w-[85%] md:max-w-[80%]">
                  {service.desc}
                </p>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-black transition-all duration-300">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
