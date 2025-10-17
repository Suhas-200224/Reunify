import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="relative h-20 w-20">
      <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-t-4 border-t-primary animate-spin"></div>
    </div>
  );
};