import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import IdeaForm from './components/IdeaForm';
import IdeaCard from './components/IdeaCard';
import IdeaDetail from './components/IdeaDetail';
import TeamRoles from './components/TeamRoles';
import { generateHackathonIdeas, generateTeamRoles } from './services/geminiService';
import type { HackathonIdea, TeamRole } from './types';

const App: React.FC = () => {
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [ideas, setIdeas] = useState<HackathonIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<HackathonIdea | null>(null);
  const [teamRoles, setTeamRoles] = useState<TeamRole[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdeas = useCallback(async (theme: string) => {
    setIsLoadingIdeas(true);
    setError(null);
    setIdeas([]);
    setSelectedIdea(null);
    setTeamRoles([]);
    try {
      const generatedIdeas = await generateHackathonIdeas(theme);
      setIdeas(generatedIdeas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoadingIdeas(false);
    }
  }, []);

  const handleSelectIdea = useCallback(async (idea: HackathonIdea) => {
    setSelectedIdea(idea);
    setIsLoadingRoles(true);
    setTeamRoles([]);
    setError(null);
    try {
        const roles = await generateTeamRoles(idea.name, idea.description);
        setTeamRoles(roles);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred while fetching roles.');
    } finally {
        setIsLoadingRoles(false);
    }
  }, []);

  const handleBackToIdeas = () => {
    setSelectedIdea(null);
    setTeamRoles([]);
  };
  
  const WelcomeMessage = () => (
    <div className="text-center text-slate-400 max-w-2xl mx-auto mt-12 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-2">مرحباً بك في مولّد أفكار الهاكثون</h2>
        <p className="text-lg">
            هل تحتاج إلى شرارة إبداع لمشروعك القادم؟ أدخل موضوعًا أو تقنية، ودع الذكاء الاصطناعي يقترح عليك أفكارًا مبتكرة، كاملة مع تفاصيل المشروع والأدوار المقترحة للفريق.
        </p>
    </div>
  );


  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-purple-500/30">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-600 opacity-20 blur-[100px]"></div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-10">
          <IdeaForm onGenerate={handleGenerateIdeas} isLoading={isLoadingIdeas} />
        </div>

        {error && (
            <div role="alert" className="mt-8 max-w-2xl mx-auto bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
                <strong>خطأ:</strong> {error}
            </div>
        )}

        <div className="mt-12">
          {selectedIdea ? (
            <div>
              <IdeaDetail idea={selectedIdea} onBack={handleBackToIdeas} />
              <TeamRoles roles={teamRoles} isLoading={isLoadingRoles} />
            </div>
          ) : (
             <>
              {isLoadingIdeas && (
                <div aria-live="polite" className="text-center text-purple-300 text-lg animate-fade-in">
                  جاري توليد الأفكار...
                </div>
              )}
              {ideas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {ideas.map((idea, index) => (
                    <IdeaCard key={index} idea={idea} onSelect={() => handleSelectIdea(idea)} />
                  ))}
                </div>
              ) : (
                !isLoadingIdeas && !error && <WelcomeMessage />
              )}
            </>
          )}
        </div>
      </main>
      
      <footer className="text-center py-6 text-slate-500 text-sm">
        Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;