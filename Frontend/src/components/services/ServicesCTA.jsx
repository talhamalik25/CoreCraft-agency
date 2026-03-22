import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesCTA = ({ fadeUp }) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20">
      <motion.div 
        {...fadeUp}
        className="max-w-7xl mx-auto bg-teal rounded-[1.5rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-24 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
        <div className="relative z-10">
          <h2 className="text-black font-syne font-extrabold text-3xl sm:text-4xl md:text-7xl uppercase leading-[0.9] mb-8 sm:mb-12">
            LEAVE THE <br /> MEDIOCRE <br /> IN THE PAST.
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="px-7 sm:px-10 py-3 sm:py-4 bg-black rounded-full text-white font-dm text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Start Your Project
            </Link>
            <button className="px-7 sm:px-10 py-3 sm:py-4 border border-black/20 rounded-full text-black font-dm text-[10px] sm:text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              View Showreel
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesCTA;
