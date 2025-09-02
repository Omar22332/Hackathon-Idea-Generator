import React from 'react';
import type { HackathonIdea } from '../types';
import { CodeIcon, CheckCircleIcon, AlertTriangleIcon, ArrowLeftIcon } from './icons';

interface IdeaDetailProps {
  idea: HackathonIdea;
  onBack: () => void;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            {icon}
            {title}
        </h4>
        {children}
    </div>
);


const IdeaDetail: React.FC<IdeaDetailProps> = ({ idea, onBack }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 font-bold transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
            العودة إلى الأفكار
        </button>
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-purple-400 font-tech mb-2">{idea.name}</h2>
        <p className="text-slate-300 text-lg mb-8">{idea.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section title="الميزات الرئيسية" icon={<CheckCircleIcon className="h-6 w-6 text-green-400" />}>
                <ul className="space-y-2 list-inside">
                    {idea.features.map((feature, index) => (
                        <li key={index} className="text-slate-300 flex items-start gap-2">
                            <span className="text-purple-400 font-bold" aria-hidden="true">&bull;</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section title="التحديات المحتملة" icon={<AlertTriangleIcon className="h-6 w-6 text-yellow-400" />}>
                <ul className="space-y-2 list-inside">
                    {idea.challenges.map((challenge, index) => (
                        <li key={index} className="text-slate-300 flex items-start gap-2">
                            <span className="text-purple-400 font-bold" aria-hidden="true">&bull;</span>
                            <span>{challenge}</span>
                        </li>
                    ))}
                </ul>
            </Section>
        </div>

        <div className="mt-6">
             <Section title="الحزمة التقنية المقترحة" icon={<CodeIcon className="h-6 w-6 text-blue-400" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-300">
                    <div><span className="font-bold text-slate-100">Frontend:</span> {idea.techStack.frontend}</div>
                    <div><span className="font-bold text-slate-100">Backend:</span> {idea.techStack.backend}</div>
                    <div><span className="font-bold text-slate-100">Database:</span> {idea.techStack.database}</div>
                    <div><span className="font-bold text-slate-100">APIs:</span> {idea.techStack.apis}</div>
                </div>
            </Section>
        </div>

      </div>
    </div>
  );
};

export default IdeaDetail;