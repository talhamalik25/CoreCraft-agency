import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const ProjectsSection = ({ fadeUp, projects }) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollTo = index * (clientWidth + 32); // 32 is the gap (gap-8 = 2rem = 32px)
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const scroll = (direction) => {
    const nextIndex = direction === 'left' 
      ? Math.max(0, activeIndex - 1) 
      : Math.min(projects.length - 1, activeIndex + 1);
    scrollToIndex(nextIndex);
  };

  // Update active index on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const index = Math.round(scrollLeft / (clientWidth + 32));
        if (index !== activeIndex && index >= 0 && index < projects.length) {
          setActiveIndex(index);
        }
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, projects.length]);

  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-20">
          <SectionLabel text="OUR WORK" />
          <h2 className="text-white font-syne font-extrabold text-4xl sm:text-5xl md:text-7xl uppercase">PROJECTS.</h2>
        </motion.div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <div className="flex items-center gap-6 font-syne font-bold text-sm">
            {projects.map((_, i) => (
              <React.Fragment key={i}>
                <button 
                  onClick={() => scrollToIndex(i)}
                  className={`transition-colors duration-300 ${activeIndex === i ? 'text-teal' : 'text-gray-dim hover:text-white'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
                {i === 0 && <span className="w-8 h-px bg-white/20" />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-teal hover:text-teal transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-teal hover:text-teal transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
