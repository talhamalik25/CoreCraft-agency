import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const ProjectsSection = ({ fadeUp, projects }) => {
  return (
    <section className="py-32 px-6 md:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-20">
          <SectionLabel text="OUR WORK" />
          <h2 className="text-white font-syne font-extrabold text-5xl md:text-7xl uppercase">PROJECTS.</h2>
        </motion.div>

        <div className="flex gap-4 md:gap-8 overflow-x-auto pb-12 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[500px] aspect-[4/5] md:aspect-[16/10] bg-card rounded-2xl overflow-hidden relative group snap-center"
            >
              <img src={project.image} alt={project.name} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                <div className="px-3 py-1 md:px-4 md:py-1.5 bg-teal/20 border border-teal/30 rounded-full text-teal text-[9px] md:text-[10px] uppercase tracking-widest w-fit mb-3 md:mb-4">
                  {project.category}
                </div>
                <h3 className="text-white font-syne font-bold text-2xl md:text-3xl uppercase">{project.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-10 border-t border-white/5">
          <div className="flex items-center gap-6 font-syne font-bold text-sm">
            <span className="text-teal">01</span>
            <span className="w-8 h-px bg-white/20" />
            <span className="text-gray-dim">02</span>
            <span className="text-gray-dim">03</span>
            <span className="text-gray-dim">04</span>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-teal hover:text-teal transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-teal hover:text-teal transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
