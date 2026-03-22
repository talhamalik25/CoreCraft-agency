import React from 'react';

const StatsBar = ({ stats }) => {
  return (
    <section className="bg-surface border-y border-white/5 py-8 md:py-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 md:gap-6">
            <span className="text-teal font-syne font-extrabold text-2xl md:text-3xl lg:text-4xl">{stat.val}</span>
            <span className="text-white font-syne font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">{stat.label}</span>
            {i < stats.length - 1 && <span className="hidden lg:block w-1.5 h-1.5 bg-teal/20 rounded-full" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
