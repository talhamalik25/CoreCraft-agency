import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeCTA = ({ fadeUp }) => {
  return (
    <section className="py-20 md:py-40 px-4 sm:px-6 md:px-20 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-glow/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 {...fadeUp} className="text-white font-syne font-extrabold text-3xl sm:text-5xl md:text-8xl uppercase leading-[0.9] mb-8 sm:mb-12">
          START YOUR <br /> DIGITAL <br /> <span className="text-teal">JOURNEY.</span>
        </motion.h2>
        <motion.p {...fadeUp} className="text-gray text-lg font-dm mb-12 max-w-xl mx-auto">
          Elevate your brand with our precision-crafted digital solutions.
        </motion.p>
        <motion.div {...fadeUp}>
          <Link to="/contact" className="px-8 sm:px-12 py-4 sm:py-5 bg-teal rounded-full text-black font-dm text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,168,150,0.3)]">
            Let's Talk — Start Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCTA;
