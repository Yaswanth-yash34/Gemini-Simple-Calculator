
import React, { useState } from 'react';
import { solveMathProblem } from '../services/geminiService';

interface SmartAssistantProps {
  onResult: (query: string, result: string) => void;
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    const result = await solveMathProblem(query);
    onResult(query, result);
    setQuery('');
    setLoading(false);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        AI Math Assistant
      </h2>
      <p className="text-slate-400 text-sm mb-4">
        Ask anything like: "What's the square root of 576?", "Solve for x: 2x + 5 = 15", or "Compound interest on $1000 at 5% for 3 years".
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question..."
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none h-32"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Ask AI'
          )}
        </button>
      </form>
    </div>
  );
};

export default SmartAssistant;
