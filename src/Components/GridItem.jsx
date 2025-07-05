// components/GridItem.jsx
import React from 'react';

const GridItem = ({ title, children, className }) => {
  return (
    <div className={`bg-white/10 backdrop-blur-lg
    
    shadow-blue-500/50
    backdrop-saturate-200 rounded-3xl border-1 border-white/20  p-4 hover:shadow-md transition ${className}`}>
      {/* //<h2 className="text-xl font-semibold mb-2">{title}</h2> */}
      <div className="text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default GridItem;
