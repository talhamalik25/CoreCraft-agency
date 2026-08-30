import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function LiveProjectButton({ href = '#' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 sm:px-5 py-2.5 min-h-11 rounded-full border border-teal text-teal hover:bg-teal hover:text-black font-dm text-xs uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 w-fit hover:shadow-[0_0_20px_rgba(0,230,217,0.3)]"
    >
      <span>Live Project</span>
      <ArrowUpRight size={15} />
    </a>
  );
}
