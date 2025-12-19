
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryViewProps {
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onClear, onSelect }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-bold text-slate-200">History</h3>
        <button 
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {history.length === 0 ? (
          <div className="text-center text-slate-600 py-10 italic">
            No history yet
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/40 cursor-pointer transition-all group"
            >
              <div className="text-xs text-slate-500 mb-1 flex justify-between">
                <span className="mono">{item.expression}</span>
                {item.isAi && <span className="bg-blue-500/10 text-blue-400 px-1 rounded">AI</span>}
              </div>
              <div className="text-slate-100 font-medium mono group-hover:text-blue-400 truncate">
                {item.result}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
