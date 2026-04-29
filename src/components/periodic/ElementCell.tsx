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
        'group relative aspect-square w-full overflow-hidden rounded-[4px]',
        'text-black transition-transform duration-150 ease-out',
        'hover:z-10 hover:scale-[1.18] hover:ring-2 hover:ring-white/80 hover:shadow-lg',
        'focus:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-white',
        selected && 'z-10 scale-[1.12] ring-2 ring-white brightness-110',
      )}
    >
      <span className="absolute left-[3px] top-[1px] text-[8px] font-medium leading-none opacity-70">
        {element.atomicNumber}
      </span>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[13px] font-bold leading-none">
        {element.symbol}
      </span>
    </button>
  );
}
