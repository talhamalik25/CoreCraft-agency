import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ProjectsGrid = ({ filteredProjects }) => {
  return (
    <section className="px-4 sm:px-6 md:px-20 pb-20 md:pb-40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`${project.isFeatured ? 'md:col-span-2' : 'md:col-span-1'} group`}
              >
                <div className="bg-card border border-white/5 rounded-[2rem] overflow-hidden hover:border-teal/20 hover:shadow-[0_0_40px_rgba(0,168,150,0.1)] transition-all duration-500">
                  <div className={`grid grid-cols-1 ${project.isFeatured ? 'lg:grid-cols-2' : ''} gap-0`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden aspect-[16/10] ${project.isFeatured ? 'lg:aspect-auto h-full' : ''}`}>
                      <img 
                        src={project.image} 
                        alt={project.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center">
                      {project.tag && (
                        <div className="text-teal text-[10px] uppercase tracking-[0.3em] font-dm mb-6 flex items-center gap-3">
                          <span className="w-8 h-px bg-teal/30" />
                          {project.tag}
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 mb-6">
                        <h3 className="text-white font-syne font-bold text-2xl sm:text-3xl md:text-4xl uppercase group-hover:text-teal transition-colors">
                          {project.name}
                        </h3>
                        <span className="px-4 py-1.5 rounded-full border border-white/10 text-teal text-[9px] sm:text-[10px] uppercase tracking-widest font-dm shrink-0">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-gray text-base font-dm leading-relaxed mb-10 max-w-md">
                        {project.desc}
                      </p>
                      <Link to="#" className="text-teal font-dm text-sm uppercase tracking-widest flex items-center gap-2 group/link">
                        View Project <ArrowUpRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
