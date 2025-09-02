import React from 'react';
import { LightbulbIcon } from './icons';

const Header = () => {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-center gap-4 text-center">
        <LightbulbIcon className="h-10 w-10 text-purple-400" />
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-tech">Hackathon AI</h1>
          <h2 className="text-2xl md:text-3xl text-purple-400" dir="rtl">مولّد الأفكار - هاكثون</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;