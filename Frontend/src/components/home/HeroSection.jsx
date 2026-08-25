import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const Pinterest = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 22c.11-1.33.22-3.33.56-4.67C8.89 16 10.33 11 10.33 11s-.44-1-.44-2.33c0-2.11 1.22-3.78 2.78-3.78 1.44 0 2.11 1.11 2.11 2.44 0 1.44-.89 3.67-1.33 5.78-.44 1.78.89 3.22 2.67 3.22 3.22 0 5.67-3.44 5.67-8.33 0-4.33-3.11-7.33-7.56-7.33-5.11 0-8.11 3.78-8.11 7.78 0 1.56.56 3.11 1.33 4 .11.11.22.22.11.44 0 .33-.33 1-.33 1.11-.11.22-.33.33-.56.22-1.44-.67-2.33-2.78-2.33-4.56 0-3.67 2.67-7.11 7.78-7.11 4.11 0 7.22 2.89 7.22 6.78 0 4-2.56 7.33-6 7.33-1.22 0-2.33-.67-2.78-1.44l-.78 3c-.22.89-.89 2.11-1.33 2.78z" />
  </svg>
);

import { SectionLabel } from "../common/SectionLabel";

const HeroSection = ({ fadeUp, staggerContainer }) => {
  return (
    <section className="relative min-h-[100dvh] w-full bg-black overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 md:px-20 pt-20 pb-16">
      {/* Background Video Layer — Dynamic Abstract Blue Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover opacity-45 transform scale-105"
        >
          <source src="./backgroud.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black z-[1]" />
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00A896 1px, transparent 1px), linear-gradient(to bottom, #00A896 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Radial Teal Glow */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-glow blur-[140px] rounded-full opacity-35 z-[3]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center my-auto"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel text="SOFTWARE AGENCY" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-syne font-extrabold uppercase leading-[0.9] tracking-tight mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16"
        >
          <span className="block text-white text-[clamp(1.85rem,6.5vw,7rem)]">
            CRAFTING
          </span>
          <span className="block text-transparent text-stroke text-[clamp(1.85rem,6.5vw,7rem)]">
            YOUR DIGITAL
          </span>
          <span className="block text-teal text-[clamp(1.85rem,6.5vw,7rem)]">
            SUCCESS.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray text-base sm:text-lg md:text-xl font-dm font-light max-w-xl mb-10 sm:mb-12 leading-relaxed mx-auto px-2"
        >
          We transform ideas into precision-crafted digital products that
          command attention and drive results.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <Link
            to="/work"
            className="px-7 sm:px-10 py-3.5 sm:py-4 bg-teal rounded-full text-black font-dm text-[10px] sm:text-xs font-semibold uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(0,168,150,0.35)]"
          >
            View Our Work
          </Link>
          <Link
            to="/services"
            className="px-7 sm:px-10 py-3.5 sm:py-4 border border-white/20 rounded-full text-white font-dm text-[10px] sm:text-xs uppercase tracking-widest hover:border-white transition-all duration-300 backdrop-blur-sm"
          >
            Our Services
          </Link>
        </motion.div>
      </motion.div>

      {/* Hero Bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-dim text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-dm text-center sm:text-left"
        >
          Karachi, Pakistan — Available Worldwide
        </motion.div>

        {/* Social Links — Horizontal on Mobile, Vertical on Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex sm:flex-col items-center gap-3 sm:gap-4"
        >
          <span className="hidden sm:block text-[9px] text-gray-dim uppercase tracking-[0.2em] font-dm [writing-mode:vertical-lr] rotate-180 select-none">
            Follow Us
          </span>
          <div className="hidden sm:block w-px h-6 bg-white/10 my-1" />
          <div className="flex items-center gap-3">
            {[
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/company/corecraftagency/",
                name: "LinkedIn",
              },
              {
                Icon: Facebook,
                href: "https://www.facebook.com/share/18K9EhcQhS/?mibextid=wwXIfr",
                name: "Facebook",
              },
              {
                Icon: Instagram,
                href: "https://www.instagram.com/corecraftagency/",
                name: "Instagram",
              },
              {
                Icon: Pinterest,
                href: "https://www.pinterest.com/corecraftagency/",
                name: "Pinterest",
              },
            ].map(({ Icon, href, name }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-gray hover:text-teal transition-colors p-1.5 rounded-full hover:bg-white/5"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
