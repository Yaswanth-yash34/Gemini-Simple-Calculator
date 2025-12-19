
import React, { useState, useCallback, useEffect } from 'react';
import Display from './components/Display';
import CalcButton from './components/CalcButton';
import HistoryView from './components/HistoryView';
import SmartAssistant from './components/SmartAssistant';
import { HistoryItem, CalcMode } from './types';

const App: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mode, setMode] = useState<CalcMode>('standard');

  const addToHistory = useCallback((expr: string, res: string, isAi = false) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      expression: expr,
      result: res,
      timestamp: Date.now(),
      isAi
    };
    setHistory(prev => [newItem, ...prev]);
  }, []);

  const handleButtonClick = (val: string) => {
    if (val === 'C') {
      setExpression('');
      setResult('');
    } else if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Simple safety check - avoid eval for security if possible, 
        // but for a simple calculator expression, we sanitize.
        const sanitized = expression.replace(/[^-+*/%0-9.]/g, '');
        // eslint-disable-next-line no-eval
        const evaluated = eval(sanitized);
        const resStr = String(evaluated);
        setResult(resStr);
        addToHistory(expression, resStr);
      } catch (err) {
        setResult('Error');
      }
    } else {
      // Prevent multiple operators
      const lastChar = expression.slice(-1);
      const operators = ['+', '-', '*', '/', '%'];
      if (operators.includes(lastChar) && operators.includes(val)) {
        setExpression(prev => prev.slice(0, -1) + val);
      } else {
        setExpression(prev => prev + val);
      }
    }
  };

  const handleAiResult = (query: string, res: string) => {
    setExpression(query);
    setResult(res);
    addToHistory(query, res, true);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setExpression(item.expression);
    setResult(item.result);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'standard') return;
      
      const key = e.key;
      if (/[0-9]/.test(key)) handleButtonClick(key);
      if (['+', '-', '*', '/', '%'].includes(key)) handleButtonClick(key);
      if (key === 'Enter') handleButtonClick('=');
      if (key === 'Escape') handleButtonClick('C');
      if (key === 'Backspace') handleButtonClick('DEL');
      if (key === '.') handleButtonClick('.');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, mode]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center bg-slate-950">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Calculator/AI */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 self-start mb-2">
            <button 
              onClick={() => setMode('standard')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'standard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Standard
            </button>
            <button 
              onClick={() => setMode('ai')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'ai' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
            >
              AI Assistant
            </button>
          </div>

          {mode === 'standard' ? (
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] shadow-2xl">
              <Display expression={expression} result={result} />
              <div className="grid grid-cols-4 gap-3">
                <CalcButton label="C" onClick={handleButtonClick} type="action" />
                <CalcButton label="%" onClick={handleButtonClick} type="operator" />
                <CalcButton label="DEL" onClick={handleButtonClick} type="action" />
                <CalcButton label="/" onClick={handleButtonClick} type="operator" />
                
                <CalcButton label="7" onClick={handleButtonClick} />
                <CalcButton label="8" onClick={handleButtonClick} />
                <CalcButton label="9" onClick={handleButtonClick} />
                <CalcButton label="*" onClick={handleButtonClick} type="operator" />
                
                <CalcButton label="4" onClick={handleButtonClick} />
                <CalcButton label="5" onClick={handleButtonClick} />
                <CalcButton label="6" onClick={handleButtonClick} />
                <CalcButton label="-" onClick={handleButtonClick} type="operator" />
                
                <CalcButton label="1" onClick={handleButtonClick} />
                <CalcButton label="2" onClick={handleButtonClick} />
                <CalcButton label="3" onClick={handleButtonClick} />
                <CalcButton label="+" onClick={handleButtonClick} type="operator" />
                
                <CalcButton label="0" onClick={handleButtonClick} span={2} />
                <CalcButton label="." onClick={handleButtonClick} />
                <CalcButton label="=" onClick={handleButtonClick} type="equal" />
              </div>
            </div>
          ) : (
            <>
              <SmartAssistant onResult={handleAiResult} />
              {result && (
                <div className="mt-4 p-6 bg-slate-900/80 border border-slate-700 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">Solution</h4>
                  <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-4 h-[500px] lg:h-auto bg-slate-900/30 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <HistoryView 
            history={history} 
            onClear={() => setHistory([])} 
            onSelect={handleSelectHistory}
          />
        </div>

      </div>

      <footer className="mt-12 text-slate-600 text-sm flex items-center gap-2">
        <span>Powered by</span>
        <span className="font-bold text-slate-400 flex items-center gap-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z"/></svg>
          Gemini 3 Flash
        </span>
      </footer>
    </div>
  );
};

export default App;
