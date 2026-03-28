import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WorkHero from '../components/work/WorkHero';
import WorkCTA from '../components/work/WorkCTA';

const Work = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-black pt-20">
      <WorkHero fadeUp={fadeUp} />
      
      {/* Coming Soon Section */}
      <section className="px-4 sm:px-6 md:px-20 pb-20 md:pb-40">
        <motion.div 
          {...fadeUp}
          className="border border-white/5 rounded-[2rem] bg-card p-12 md:p-24 flex flex-col items-center justify-center text-center min-h-[400px] relative overflow-hidden"
        >
          {/* Subtle Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,150,0.06),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Status Pill */}
            <div className="border border-teal/30 bg-teal/5 rounded-full px-5 py-2 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-teal font-dm text-[10px] uppercase tracking-[0.3em]">
                CURRENTLY IN PROGRESS
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase leading-[0.9] flex flex-col">
              <span className="text-white">PROJECTS</span>
              <span className="text-stroke">INCOMING.</span>
            </h2>

            {/* Paragraph */}
            <p className="text-gray font-dm text-base md:text-lg max-w-lg">
              We're currently heads-down building for our first clients. Our work will be showcased here as soon as it ships.
            </p>

            {/* CTA Link */}
            <Link 
              to="/contact"
              className="mt-4 bg-teal text-black rounded-full px-8 py-3 font-dm text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-teal/20"
            >
              Start a Project With Us
            </Link>
          </div>
        </motion.div>
      </section>

      <WorkCTA fadeUp={fadeUp} />
    </div>
  );
};

export default Work;
