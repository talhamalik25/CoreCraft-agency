import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const TeamSection = ({ fadeUp, team }) => {
  return (
    <section className="py-20 md:py-40 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-20">
          <SectionLabel text="CORE" />
          <h2 className="text-white font-syne font-extrabold text-4xl md:text-6xl uppercase">THE CRAFTERS.</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="aspect-square rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 mb-8 border-4 border-white/5 group-hover:border-teal/20 max-w-[250px] sm:max-w-none mx-auto">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-white font-syne font-bold text-xl uppercase mb-2">{member.name}</h3>
              <div className="text-teal text-[10px] uppercase tracking-[0.3em] font-dm">{member.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
