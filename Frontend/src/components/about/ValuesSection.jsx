import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const ValuesSection = ({ fadeUp, values }) => {
  return (
    <section className="py-40 px-6 md:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-20">
          <SectionLabel text="VALUES" />
          <h2 className="text-white font-syne font-extrabold text-4xl md:text-6xl uppercase">WHAT DRIVES US.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-card border border-white/5 rounded-2xl hover:border-teal/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-teal-dim flex items-center justify-center mb-8 group-hover:bg-teal transition-colors">
                {React.cloneElement(value.icon, { size: 28, className: "group-hover:text-black transition-colors" })}
              </div>
              <h3 className="text-white font-syne font-bold text-2xl uppercase mb-4">{value.name}</h3>
              <p className="text-gray text-sm font-dm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
