import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Instagram } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const HeroSection = ({ fadeUp, staggerContainer }) => {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #00A896 1px, transparent 1px), linear-gradient(to bottom, #00A896 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      
      {/* Radial Glow */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-glow blur-[120px] rounded-full opacity-30 pointer-events-none" />

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel text="SOFTWARE AGENCY" />
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-syne font-extrabold uppercase leading-[0.9] tracking-tight mb-6 sm:mb-8 mt-12 md:mt-24">
          <span className="block text-white text-[clamp(2rem,7vw,7rem)]">CRAFTING</span>
          <span className="block text-transparent text-stroke text-[clamp(2rem,7vw,7rem)]">YOUR DIGITAL</span>
          <span className="block text-teal text-[clamp(2rem,7vw,7rem)]">SUCCESS.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-gray text-lg md:text-xl font-dm font-light max-w-xl mb-12 leading-relaxed mx-auto">
          We transform ideas into precision-crafted digital products that command attention and drive results.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 md:mb-20">
          <Link to="/work" className="px-7 sm:px-10 py-3 sm:py-4 bg-teal rounded-full text-black font-dm text-[10px] sm:text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,168,150,0.3)]">
            View Our Work
          </Link>
          <Link to="/services" className="px-7 sm:px-10 py-3 sm:py-4 border border-white/20 rounded-full text-white font-dm text-[10px] sm:text-xs uppercase tracking-widest hover:border-white transition-all duration-300">
            Our Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Hero Bottom */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 md:left-20 right-4 sm:right-6 md:right-20 flex justify-between items-end">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-gray-dim text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-dm">
          Karachi, Pakistan — Available Worldwide
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="hidden sm:flex flex-col gap-6">
          {[Linkedin, Github, Instagram].map((Icon, i) => (
            <a key={i} href="#" className="text-gray hover:text-teal transition-colors">
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
