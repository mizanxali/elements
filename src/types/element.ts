export type ElementCategory =
  | 'alkali metal'
  | 'alkaline earth'
  | 'transition metal'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'noble gas'
  | 'lanthanide'
  | 'actinide'
  | 'unknown';

export type ElementBlock = 's' | 'p' | 'd' | 'f';

export type ElementPhase = 'Solid' | 'Liquid' | 'Gas' | 'Unknown';

export type Element = {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: ElementCategory;
  shells: number[];
  electronConfig: string;
  cpkHex: string;
  summary: string;
  period: number;
  group: number | null;
  block: ElementBlock;
  phase: ElementPhase;
};
