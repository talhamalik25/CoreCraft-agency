import React from 'react';

const MarqueeStrip = ({ services = [] }) => {
  const marqueeItems = services.map(service => service.title);

  if (!marqueeItems || marqueeItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-surface border-y border-white/5 py-6 overflow-hidden relative">
      <div className="flex w-max animate-marquee whitespace-nowrap gap-12">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center gap-12">
            {marqueeItems.map((item, index) => (
              <React.Fragment key={`${group}-${index}`}>
                <span className="text-gray tracking-[0.3em] text-xs font-dm font-light">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
