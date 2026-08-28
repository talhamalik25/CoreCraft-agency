import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from '../common/SectionLabel';

const ValuesSection = ({ fadeUp, values }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeValue = values[activeIndex];

  return (
    <section className="py-20 md:py-40 px-4 sm:px-6 md:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="mb-12 md:mb-20">
          <SectionLabel text="VALUES" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_2fr] lg:items-end">
            <p className="max-w-xs text-gray text-sm font-dm uppercase tracking-[0.18em] leading-relaxed">
              Core principles for building useful, enduring systems.
            </p>
            <h2 className="text-white font-syne font-extrabold text-4xl md:text-6xl uppercase">CORE PRINCIPLES.</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 lg:grid-cols-[1.15fr_0.85fr_1fr]">
          <motion.button
            type="button"
            {...fadeUp}
            onClick={() => setActiveIndex(0)}
            className={`group min-h-[22rem] bg-surface p-7 text-left transition-colors duration-300 sm:p-10 lg:row-span-2 ${activeIndex === 0 ? 'bg-card' : 'hover:bg-card'}`}
            aria-pressed={activeIndex === 0}
          >
            <PrincipleContent value={values[0]} index={0} isActive={activeIndex === 0} large />
          </motion.button>

          {values.slice(1).map((value, index) => {
            const valueIndex = index + 1;
            const isActive = activeIndex === valueIndex;

            return (
              <motion.button
                type="button"
                key={value.name}
                {...fadeUp}
                transition={{ delay: valueIndex * 0.1 }}
                onClick={() => setActiveIndex(valueIndex)}
                className={`group min-h-[13rem] bg-surface p-7 text-left transition-colors duration-300 sm:p-8 ${isActive ? 'bg-card' : 'hover:bg-card'}`}
                aria-pressed={isActive}
              >
                <PrincipleContent value={value} index={valueIndex} isActive={isActive} />
              </motion.button>
            );
          })}

          <motion.div {...fadeUp} className="bg-card p-7 sm:p-8 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="mb-12 flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gray">
              <span>Blueprint / Detail</span>
              <span className="text-teal">0{activeIndex + 1} / 03</span>
            </div>
            <div className="mb-8 text-teal">
              {React.cloneElement(activeValue.icon, { size: 34 })}
            </div>
            <h3 className="mb-5 text-white font-syne text-3xl font-bold uppercase leading-none sm:text-4xl">{activeValue.name}</h3>
            <p className="text-gray font-dm text-base leading-relaxed">{activeValue.desc}</p>
            <div className="mt-12 border-t border-zinc-800 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gray">
              System constant / Active
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PrincipleContent = ({ value, index, isActive, large = false }) => (
  <>
    <div className="mb-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-gray">
      <span>0{index}</span>
      <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? 'bg-teal' : 'bg-zinc-700'}`} />
    </div>
    <div className="mb-8 text-teal transition-transform duration-300 group-hover:translate-x-1">
      {React.cloneElement(value.icon, { size: large ? 34 : 24 })}
    </div>
    <h3 className={`mb-4 text-white font-syne font-bold uppercase leading-none ${large ? 'text-3xl sm:text-5xl' : 'text-2xl'}`}>{value.name}</h3>
    <p className="max-w-sm text-gray font-dm text-sm leading-relaxed">{value.desc}</p>
  </>
);

export default ValuesSection;
