import React from 'react';
import type { HackathonIdea } from '../types';

interface IdeaCardProps {
  idea: HackathonIdea;
  onSelect: () => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onSelect }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex flex-col justify-between hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1">
      <div>
        <h3 className="text-xl font-bold text-purple-400 font-tech mb-2">{idea.name}</h3>
        <p className="text-slate-300 mb-4">{idea.description}</p>
      </div>
      <button
        onClick={onSelect}
        className="self-start mt-auto bg-slate-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
      >
        عرض التفاصيل
      </button>
    </div>
  );
};

export default IdeaCard;