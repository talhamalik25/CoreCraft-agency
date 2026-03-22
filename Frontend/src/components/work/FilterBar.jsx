import React from 'react';

const FilterBar = ({ categories, filter, setFilter }) => {
  return (
    <section className="px-6 md:px-20 mb-20">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-full font-dm text-xs uppercase tracking-widest transition-all duration-300 ${
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
