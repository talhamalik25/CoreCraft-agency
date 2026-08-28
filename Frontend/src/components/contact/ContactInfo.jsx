import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';

const ContactInfo = ({ fadeUp, infoCards }) => {
  const socialLinks = [
    { name: 'LinkedIn', handle: '@corecraftagency', href: 'https://www.linkedin.com/company/corecraftagency/' },
    { name: 'Instagram', handle: '@corecraftagency', href: 'https://www.instagram.com/corecraftagency/' },
  ];

  return (
    <motion.div {...fadeUp} className="lg:col-span-5">
      <div className="max-w-lg">
        <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-teal">Start a conversation</p>
        <h2 className="font-syne text-4xl font-extrabold uppercase leading-[0.92] text-white sm:text-5xl md:text-7xl">
          Let&apos;s build something <span className="text-teal">premium.</span>
        </h2>
        <p className="mt-8 max-w-md font-dm text-base leading-relaxed text-gray md:text-lg">
          Bring us the ambition, the rough sketch, or the problem you cannot quite name yet. We&apos;ll shape the next move together.
        </p>
      </div>

      <div className="mt-14 border-t border-white/10 pt-6">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">Find us online</p>
        <div className="space-y-3">
          {socialLinks.map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-white/10 py-3 font-dm text-sm text-white/70 transition-colors hover:border-teal hover:text-teal">
              <span className="flex items-center gap-3">
                {social.name === 'LinkedIn' ? <Linkedin size={16} /> : <Instagram size={16} />}
                {social.handle}
              </span>
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
        {infoCards.slice(0, 2).map((card) => (
          <div key={card.title}>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{card.title}</p>
            <a href={card.link} className="break-words font-dm text-sm text-white/75 transition-colors hover:text-teal">{card.detail}</a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactInfo;
