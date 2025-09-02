import React, { useState } from 'react';
import Spinner from './Spinner';

interface IdeaFormProps {
  onGenerate: (theme: string) => void;
  isLoading: boolean;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onGenerate, isLoading }) => {
  const [theme, setTheme] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (theme.trim() && !isLoading) {
      onGenerate(theme);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 border border-slate-700 rounded-full p-2 shadow-lg backdrop-blur-sm">
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="أدخل موضوع الهاكثون... (e.g., AI for Good, FinTech, Sustainable Energy)"
          className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none px-6 py-3 text-lg text-right sm:text-left"
          dir="rtl"
          aria-label="Hackathon Theme"
        />
        <button
          type="submit"
          disabled={isLoading || !theme.trim()}
          className="w-full sm:w-auto flex-shrink-0 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          aria-live="polite"
        >
          {isLoading ? <Spinner /> : 'ولّد الأفكار'}
        </button>
      </div>
    </form>
  );
};

export default IdeaForm;