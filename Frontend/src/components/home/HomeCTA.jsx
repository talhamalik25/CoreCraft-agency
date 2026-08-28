import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const HomeCTA = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0b0e0d] py-24 text-white md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -right-24 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full border border-teal/20"
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -right-4 top-1/2 h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-white/10"
          animate={shouldReduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(105deg,transparent_0%,transparent_49%,rgba(0,168,150,0.08)_50%,transparent_51%),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100% 100%,64px 64px,64px 64px]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0b0e0d] via-[#0b0e0d]/70 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex items-center gap-3 font-dm text-[10px] uppercase tracking-[0.22em] text-teal"
        >
          <span className="h-px w-8 bg-teal" />
          Ready to begin
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-5xl font-syne text-[2.8rem] font-extrabold uppercase leading-[0.92] tracking-[-0.045em] sm:text-4xl md:text-6xl lg:text-8xl xl:text-[10rem]"
        >
          <span className="block">
            Your <span className="text-teal">vision.</span>
          </span>
          <span className="block">Our process.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 max-w-md font-dm text-base font-light leading-relaxed text-gray sm:text-lg"
        >
          You&apos;ve seen our approach, our work, and how we build. Now let&apos;s apply it to your project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border-b border-teal pb-3 font-dm text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:text-teal"
          >
            Start a Project
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 font-dm text-xs uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 hover:text-white"
          >
            Let&apos;s Talk
            <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-20 flex items-end justify-between border-t border-white/10 pt-5 font-dm text-[9px] uppercase tracking-[0.2em] text-white/30 sm:mt-28">
          <span>CoreCraft Agency</span>
          <span className="hidden sm:block">Ideas into systems</span>
          <span>2026</span>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;
