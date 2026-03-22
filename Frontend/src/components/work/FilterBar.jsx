import React from 'react';

const FilterBar = ({ categories, filter, setFilter }) => {
  return (
    <section className="px-4 sm:px-6 md:px-20 mb-12 md:mb-20">
      <div className="max-w-7xl mx-auto flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-dm text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              filter === cat
                ? 'bg-teal text-black'
                : 'border border-white/10 text-gray hover:border-white/30 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FilterBar;
