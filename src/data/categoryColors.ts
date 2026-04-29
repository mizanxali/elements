import type { ElementCategory } from '../types/element';

export const categoryColors: Record<ElementCategory, string> = {
  'alkali metal': '#ff6b6b',
  'alkaline earth': '#ffa94d',
  'transition metal': '#ffd43b',
  'post-transition': '#a9e34b',
  metalloid: '#63e6be',
  nonmetal: '#4dabf7',
  'noble gas': '#b197fc',
  lanthanide: '#f783ac',
  actinide: '#e599f7',
  unknown: '#868e96',
};

export function colorFor(category: ElementCategory): string {
  return categoryColors[category] ?? categoryColors.unknown;
}
