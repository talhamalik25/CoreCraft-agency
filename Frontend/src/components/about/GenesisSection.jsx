import React from 'react';
import { motion } from 'framer-motion';

const GenesisSection = ({ fadeUp, milestones }) => {
  return (
    <section className="py-20 md:py-40 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        <motion.div {...fadeUp}>
          <h2 className="text-white font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase mb-8">THE GENESIS.</h2>
          <div className="space-y-6 text-gray text-lg font-dm leading-relaxed">
            <p>
              Founded in the bustling creative landscape of Karachi, CoreCraft Studio was born from a simple observation: most digital experiences lack soul. We set out to redefine the standard by infusing architectural precision into every pixel we touch.
            </p>
            <p>
              Our philosophy is precision-first. We don't just build websites or brands; we engineer digital environments that reflect the uncompromising standards of our clients.
            </p>
          </div>
          {/* [PLACEHOLDER: Request a real image from the site owner — a workspace photo, product screenshot, or abstract brand visual in the existing teal/black palette] */}
        </motion.div>

        <div className="space-y-12">
          {milestones.map((ms, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="flex gap-8 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-teal group-hover:scale-150 transition-transform duration-300" />
                <div className="w-px h-full bg-white/10 mt-4" />
              </div>
              <div>
                <div className="text-teal font-dm text-[10px] uppercase tracking-widest mb-2">{ms.year}</div>
                <h3 className="text-white font-syne font-bold text-2xl uppercase mb-4">{ms.name}</h3>
                <p className="text-gray text-base font-dm leading-relaxed max-w-md">{ms.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenesisSection;
