import React from 'react';
import { motion } from 'framer-motion';

const MarqueeStrip = () => {
  const marqueeItems = [
    'WEB DEVELOPMENT',
    'AI SOLUTIONS',
    'UI/UX DESIGN',
    'DIGITAL MARKETING',
    'SAAS PRODUCTS',
    'MOBILE APPS',
  ];

  return (
    <div className="w-full bg-surface border-y border-white/5 py-6 overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            {marqueeItems.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-gray uppercase tracking-[0.3em] text-xs font-dm font-light">
                  {item}
                </span>
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeStrip;
