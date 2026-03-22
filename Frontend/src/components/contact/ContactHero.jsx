import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const ContactHero = ({ fadeUp }) => {
  return (
    <section className="py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <SectionLabel text="GET IN TOUCH" />
          <h1 className="text-white font-syne font-extrabold text-5xl md:text-8xl uppercase leading-[0.9] mb-12">
            LET'S CRAFT / <br /> SOMETHING / <br /> TOGETHER.
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
