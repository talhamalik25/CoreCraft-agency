import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const ServicesHero = ({ fadeUp }) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionLabel text="WHAT WE DO" />
          <h1 className="text-white font-syne font-extrabold text-4xl md:text-8xl uppercase leading-[0.9] mb-12">
            PRECISION. / <br /> PERFORMANCE. / <br /> POLISH.
          </h1>
          <p className="text-gray text-lg font-dm max-w-2xl leading-relaxed">
            We architect high-end digital experiences by merging technical brutalism with cinematic visual storytelling.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;
