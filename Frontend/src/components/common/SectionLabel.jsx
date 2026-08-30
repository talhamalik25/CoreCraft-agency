import React from "react";

export const SectionLabel = ({ text }) => (
  <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-teal sm:text-xs">
    <span className="inline-block h-px w-8 bg-teal" />
    {text}
  </div>
);
