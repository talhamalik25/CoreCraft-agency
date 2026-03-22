import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WorkCTA = ({ fadeUp }) => {
  return (
    <section className="py-40 px-6 md:px-20 bg-surface text-center">
      <div className="max-w-4xl mx-auto">
        <motion.h2 {...fadeUp} className="text-white font-syne font-extrabold text-5xl md:text-8xl uppercase leading-[0.9] mb-12">
          READY TO <br /> CRAFT YOUR <br /> <span className="text-teal">VISION?</span>
        </motion.h2>
        <motion.div {...fadeUp}>
          <Link to="/contact" className="px-12 py-5 bg-teal rounded-full text-black font-dm text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,168,150,0.3)]">
            Let's Talk
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkCTA;
