import clsx from 'clsx';
import type { CSSProperties } from 'react';
import type { Element } from '../../types/element';
import { colorFor } from '../../data/categoryColors';

type Props = {
  element: Element;
  selected: boolean;
  onSelect: (z: number) => void;
  style?: CSSProperties;
};

export function ElementCell({ element, selected, onSelect, style }: Props) {
  const color = colorFor(element.category);

  return (
    <button
      type="button"
      onClick={() => onSelect(element.atomicNumber)}
      title={`${element.atomicNumber} · ${element.name}`}
      style={{ backgroundColor: color, ...style }}
      className={clsx(
        'group relative aspect-square w-full overflow-hidden rounded-md ring-1 ring-black/10',
        'text-black shadow-sm transition duration-150 ease-out',
        'hover:z-10 hover:-translate-y-0.5 hover:scale-[1.08] hover:shadow-md hover:ring-black/25',
        'focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-black/40',
        selected && 'z-10 -translate-y-0.5 scale-[1.06] ring-2 ring-black/45 brightness-110 shadow-md',
      )}
    >
      <span className="absolute left-[3px] top-[2px] font-mono text-[8px] font-black leading-none opacity-75">
        {element.atomicNumber}
      </span>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[13px] font-black leading-none">
        {element.symbol}
      </span>
      <span className="absolute bottom-0 left-0 h-1 w-full bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
