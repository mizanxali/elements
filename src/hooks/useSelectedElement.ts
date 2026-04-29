import elementsRaw from '../data/elements.json';
import type { Element } from '../types/element';
import { useElementStore } from '../state/useElementStore';

const elements = elementsRaw as Element[];
const byZ = new Map<number, Element>(elements.map((e) => [e.atomicNumber, e]));

export function useSelectedElement(): Element {
  const { selected } = useElementStore();
  const el = byZ.get(selected);
  if (!el) throw new Error(`no element for Z=${selected}`);
  return el;
}

export function getAllElements(): Element[] {
  return elements;
}
