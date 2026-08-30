"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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

const headlineLines = [
  { text: "CRAFTING", className: "text-white" },
  { text: "YOUR DIGITAL", className: "text-transparent text-stroke" },
  { text: "SUCCESS", className: "text-teal" },
];

const HeroSection = ({ fadeUp, staggerContainer }) => {
  return (
    <section data-hero-section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-black px-4 pt-20 pb-16 sm:px-6 lg:px-8">
      {/* Background Video Layer — Dynamic Abstract Blue Lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          poster="/background-poster.webp"
          className="absolute inset-0 w-full h-full object-cover opacity-45 transform scale-105"
        >
          {/* Absolute path so the video also loads on nested routes */}
          <source src="/background-opt.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black z-[1]" />
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00a896 1px, transparent 1px), linear-gradient(to bottom, #00a896 1px, transparent 1px)",
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
        className="relative z-10 w-full max-w-7xl mx-auto text-center flex flex-col items-center my-auto"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel text="SOFTWARE AGENCY" />
        </motion.div>

        <h1 className="mb-6 mt-8 font-syne font-extrabold uppercase leading-[0.9] tracking-tight sm:mb-8 sm:mt-12 md:mt-16">
{headlineLines.map((line) => (
  <span
    key={line.text}
    className="block overflow-hidden text-center text-[clamp(2rem,8vw,3.25rem)] sm:text-[clamp(2.5rem,6.5vw,5rem)] md:text-[clamp(3rem,5.5vw,6rem)] lg:text-[clamp(3.5rem,4.8vw,6.75rem)] xl:text-[clamp(4rem,4.2vw,7.5rem)] 2xl:text-[clamp(4.5rem,3.8vw,8rem)]"
  >
    <span className="flex flex-wrap justify-center gap-x-[0.28em] gap-y-1">
      {line.text.split(" ").map((word, wordIndex) => (
        <span
          key={`${line.text}-word-${wordIndex}`}
          className="inline-flex"
        >
          {word.split("").map((character, charIndex) => (
            <span
              key={`${line.text}-${wordIndex}-${charIndex}`}
              data-entrance-headline-char
              className={`inline-block ${line.className}`}
            >
              {character}
            </span>
          ))}
        </span>
      ))}
    </span>
  </span>
))}
        </h1>

        <motion.p
          variants={fadeUp}
          className="text-gray text-base sm:text-lg md:text-xl font-dm font-light max-w-xl mb-10 sm:mb-12 leading-relaxed mx-auto px-2"
        >
          A founder-led engineering team in Karachi. We design, build, and ship
          web platforms, AI automation, and commerce systems that hold up under
          real traffic and real deadlines.
        </motion.p>

        <div
          className="flex w-full flex-col items-center gap-3 min-[390px]:flex-row min-[390px]:flex-wrap min-[390px]:justify-center sm:gap-6 mb-8 sm:mb-12"
        >
          <Link
            href="/work"
            data-entrance-cta
            data-magnetic
            className="btn-primary w-full min-[390px]:w-auto"
          >
            <span data-magnetic-text>View Our Work</span>
          </Link>
          <Link
            href="/services"
            data-entrance-cta
            data-magnetic
            className="btn-secondary w-full min-[390px]:w-auto"
          >
            <span data-magnetic-text>Our Services</span>
          </Link>
        </div>
      </motion.div>

      {/* Hero Bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-end gap-4 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          data-magnetic
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2.5 text-gray-dim text-[9px] uppercase tracking-[0.15em] backdrop-blur-md transition-colors duration-300 hover:border-teal/40 hover:text-white sm:text-[10px] sm:tracking-[0.2em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal shadow-[0_0_12px_rgba(0,230,217,0.8)]" />
          </span>
          <span data-magnetic-text>Karachi, Pakistan — Available Worldwide</span>
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
                className="min-h-11 min-w-11 text-gray hover:text-teal transition-colors p-2.5 rounded-full hover:bg-white/5"
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
