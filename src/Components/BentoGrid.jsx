// components/BentoGrid.jsx
import React from 'react';

//auto-rows-[minmax(100px,_auto)]

const BentoGrid = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-6 gap-4  p-4 grid-rows-6">
      {children}
    </div>
  );
};

export default BentoGrid;
