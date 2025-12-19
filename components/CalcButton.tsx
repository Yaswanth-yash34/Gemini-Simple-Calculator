
import React from 'react';

interface CalcButtonProps {
  label: string;
  onClick: (val: string) => void;
  type?: 'number' | 'operator' | 'action' | 'equal';
  span?: number;
}

const CalcButton: React.FC<CalcButtonProps> = ({ label, onClick, type = 'number', span = 1 }) => {
  const baseStyles = "h-16 rounded-xl flex items-center justify-center text-xl font-semibold transition-all duration-150 active:scale-95 shadow-lg select-none";
  
  const typeStyles = {
    number: "bg-slate-700 hover:bg-slate-600 text-slate-100",
    operator: "bg-slate-800 hover:bg-slate-700 text-blue-400",
    action: "bg-slate-800/80 hover:bg-slate-700 text-rose-400",
    equal: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20"
  };

  const spanClass = span === 2 ? "col-span-2" : "";

  return (
    <button 
      onClick={() => onClick(label)}
      className={`${baseStyles} ${typeStyles[type]} ${spanClass}`}
    >
      {label}
    </button>
  );
};

export default CalcButton;
