import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const ProcessSection = ({ fadeUp, processSteps }) => {
  return (
    <section className="py-20 md:py-40 px-4 sm:px-6 md:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-24">
          <SectionLabel text="HOW WE WORK" />
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-6 left-0 w-full h-px bg-teal/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {processSteps.map((step, i) => (
              <motion.div 
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-black border border-teal text-teal flex items-center justify-center font-syne font-bold mb-8 shadow-[0_0_20px_rgba(0,168,150,0.2)]">
                  {i + 1}
                </div>
                <h3 className="text-white font-syne font-bold text-xl uppercase mb-4">{step.name}</h3>
                <p className="text-gray text-sm font-dm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
