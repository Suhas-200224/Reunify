import React from 'react';
import { Logo } from './Logo';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center z-50 animate-fade-out" style={{animationDelay: '2s'}}>
      <div className="text-center animate-fade-in">
        <Logo large />
        <p className="mt-4 text-lg text-primary animate-subtle-pulse">
          Remix your timeline.
        </p>
      </div>
    </div>
  );
};