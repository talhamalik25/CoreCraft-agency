import React from 'react';

export const SectionLabel = ({ text }) => (
  <span className="text-teal text-xs uppercase tracking-[0.2em] font-dm flex items-center gap-3 mb-8">
    <span className="w-8 h-px bg-teal inline-block" />
    {text}
  </span>
);
