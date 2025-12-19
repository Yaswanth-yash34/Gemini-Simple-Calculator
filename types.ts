
export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  isAi?: boolean;
}

export type CalcMode = 'standard' | 'ai';
