import React from 'react';
import { motion } from 'framer-motion';

const ServiceRows = ({ fadeUp, serviceRows }) => {
  return (
    <section className="px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {serviceRows.map((service, i) => (
          <motion.div 
            key={i}
            {...fadeUp}
            className="py-12 md:py-20 border-b border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start group"
          >
            <div className="lg:col-span-1 text-gray-dim font-syne font-bold text-3xl md:text-4xl group-hover:text-teal transition-colors">
              {service.num}
            </div>
            <div className="lg:col-span-5">
              <h2 className="text-white font-syne font-bold text-3xl md:text-4xl lg:text-5xl uppercase mb-4 md:mb-6 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500">
                {service.name}
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-gray text-base md:text-lg font-dm leading-relaxed mb-6 md:mb-8">
                {service.desc}
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {service.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 text-gray text-[9px] md:text-[10px] uppercase tracking-widest font-dm group-hover:border-teal/30 group-hover:text-teal transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceRows;
