import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const ToolsSection = ({ fadeUp, tools }) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div {...fadeUp} className="flex justify-center mb-16">
          <SectionLabel text="TOOLS WE USE" />
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {tools.map((tool, i) => (
            <motion.span 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.05 }}
              className="px-5 py-3 sm:px-8 sm:py-4 bg-card border border-white/5 rounded-full text-white font-syne font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-teal hover:text-teal transition-all cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
