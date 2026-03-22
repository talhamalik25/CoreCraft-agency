import React from 'react';
import { motion } from 'framer-motion';

const ContactInfo = ({ fadeUp, infoCards }) => {
  return (
    <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
      {infoCards.map((card, i) => (
        <motion.div 
          key={i}
          {...fadeUp}
          transition={{ delay: i * 0.1 }}
          className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 hover:border-teal/20 transition-all duration-300 group"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-teal-dim flex items-center justify-center mb-4 md:mb-6 group-hover:bg-teal transition-colors">
            {React.cloneElement(card.icon, { size: 18, className: "group-hover:text-black transition-colors" })}
          </div>
          <h3 className="text-gray-dim text-[9px] md:text-[10px] uppercase tracking-widest font-dm mb-1 md:mb-2">{card.title}</h3>
          {card.badge ? (
            <span className="px-3 py-1 bg-teal/10 border border-teal/20 rounded-full text-teal text-[9px] md:text-[10px] uppercase tracking-widest font-dm">
              {card.detail}
            </span>
          ) : (
            <a href={card.link} className="text-white font-syne font-bold text-xs md:text-sm hover:text-teal transition-colors break-words">
              {card.detail}
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ContactInfo;
