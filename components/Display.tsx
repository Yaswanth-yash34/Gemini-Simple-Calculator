
import React from 'react';

interface DisplayProps {
  expression: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  return (
    <div className="w-full bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 mb-6 flex flex-col items-end justify-end border border-slate-700/50 min-h-[140px] shadow-inner">
      <div className="text-slate-400 text-lg mono truncate w-full text-right mb-2 h-7">
        {expression}
      </div>
      <div className="text-slate-50 text-5xl font-bold mono truncate w-full text-right">
        {result || '0'}
      </div>
    </div>
  );
};

export default Display;
