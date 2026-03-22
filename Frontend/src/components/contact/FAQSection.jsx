import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';

const FAQSection = ({ fadeUp, faqs, activeFaq, setActiveFaq }) => {
  return (
    <section className="py-40 px-6 md:px-20 bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} className="mb-20 text-center">
          <SectionLabel text="FAQ" />
          <h2 className="text-white font-syne font-extrabold text-4xl md:text-6xl uppercase">COMMON QUESTIONS.</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className="border-b border-white/5"
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`font-syne font-bold text-xl uppercase transition-colors ${activeFaq === i ? 'text-teal' : 'text-white group-hover:text-teal'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeFaq === i ? 'border-teal bg-teal text-black' : 'border-white/10 text-gray'}`}>
                  {activeFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray text-base font-dm leading-relaxed pb-8 max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
