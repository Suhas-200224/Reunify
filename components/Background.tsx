import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-dark-bg">
      <div className="absolute top-0 left-0 w-full h-full opacity-60">
        <div 
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0, 242, 234, 0.3) 0%, rgba(0, 242, 234, 0) 70%)' }}
        />
        <div 
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full filter blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212, 0, 255, 0.3) 0%, rgba(212, 0, 255, 0) 70%)' }}
        />
         <div 
          className="absolute top-1/4 right-0 w-1/3 h-1/3 rounded-full filter blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0, 255, 135, 0.2) 0%, rgba(0, 255, 135, 0) 70%)' }}
        />
      </div>
    </div>
  );
};