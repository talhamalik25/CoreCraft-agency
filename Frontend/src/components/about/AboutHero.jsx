import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const AboutHero = ({ fadeUp }) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionLabel text="IDENTITY" />
          <h1 className="text-white font-syne font-extrabold text-4xl md:text-8xl uppercase leading-[0.9] mb-12">
            BUILT / <br /> DIFFERENT. / <br /> BY DESIGN.
          </h1>
          <p className="text-gray text-lg font-dm max-w-2xl leading-relaxed">
            We exist to bridge the gap between imagination and execution. Based in the heart of Karachi, we craft digital monoliths that command attention and drive results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
