import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { useGSAPAnimations } from '../../hooks/useGSAP';

const AboutSection = ({ fadeUp }) => {
  const sectionRef = React.useRef(null);

  useGSAPAnimations((gsap) => {
    const counters = gsap.utils.toArray('[data-metric-target]', sectionRef.current);

    counters.forEach((counter) => {
      const target = Number(counter.dataset.metricTarget);
      const suffix = counter.dataset.metricSuffix || '';
      const value = { current: 0 };

      gsap.to(value, {
        current: target,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          counter.textContent = `${Math.round(value.current)}${suffix}`;
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full overflow-hidden bg-black section-x section-y">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-20">
        <motion.div {...fadeUp}>
          <SectionLabel text="About" />
          <h2 className="text-white font-syne font-extrabold text-4xl sm:text-5xl md:text-7xl uppercase mb-6 sm:mb-8 mt-4">THE STUDIO.</h2>
          <p className="text-gray text-base sm:text-lg font-dm leading-relaxed mb-10 max-w-lg">
            CoreCraft is a founder-led studio in Karachi. The people who scope your system are the people who build it — so web platforms, AI automation, and commerce systems ship with fewer hand-offs and no bloat.
          </p>
          <Link href="/about" className="text-teal font-dm text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 group w-fit">
            More <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-12 md:mt-24">
          {[
            { val: 'SELECTED', label: 'PRODUCT BUILDS', span: 'sm:col-span-5' },
            { val: 'DIRECT', label: 'TECHNICAL PARTNERSHIP', span: 'sm:col-span-4' },
            { val: 'CORE', label: 'SERVICES', span: 'sm:col-span-3' },
          ].map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * 0.1 }} className={`border-t border-teal/30 pt-5 ${stat.span}`}>
              <div className="font-syne text-3xl font-extrabold leading-none text-teal sm:text-4xl md:text-5xl">{stat.val}</div>
              <div className="mt-4 font-dm text-[10px] uppercase tracking-[0.25em] text-gray sm:text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
