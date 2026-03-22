import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const AboutSection = ({ fadeUp }) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div {...fadeUp}>
          <SectionLabel text="ABOUT" />
          <h2 className="text-white font-syne font-extrabold text-5xl md:text-7xl uppercase mb-8">OUR ESSENCE.</h2>
          <p className="text-gray text-lg font-dm leading-relaxed mb-10 max-w-lg">
            CoreCraft Studio is a multidisciplinary creative hub where code meets cinematic aesthetics. We don't just build interfaces; we engineer digital environments that reflect the uncompromising standards of our clients.
          </p>
          <Link to="/about" className="text-teal font-dm text-sm uppercase tracking-widest flex items-center gap-2 group">
            More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-8 md:gap-12 lg:pl-20">
          {[
            { val: '25+', label: 'Projects' },
            { val: '15+', label: 'Clients' },
            { val: '2+', label: 'Years' },
          ].map((stat, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="flex flex-col">
              <div className="text-teal font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl mb-2">{stat.val}</div>
              <div className="text-gray text-[10px] md:text-xs uppercase tracking-[0.3em] font-dm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
