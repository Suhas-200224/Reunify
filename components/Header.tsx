import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-6 sm:p-8 z-10 flex-shrink-0">
      <div className="mx-auto max-w-4xl">
        <Logo />
      </div>
    </header>
  );
};