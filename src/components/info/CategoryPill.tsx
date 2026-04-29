import type { ElementCategory } from '../../types/element';
import { colorFor } from '../../data/categoryColors';

export function CategoryPill({ category }: { category: ElementCategory }) {
  const color = colorFor(category);
  return (
    <span
      style={{ backgroundColor: `${color}22`, color, borderColor: `${color}66` }}
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider"
    >
      {category}
    </span>
  );
}
