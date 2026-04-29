import type { ElementCategory } from "../../types/element";
import { colorFor } from "../../data/categoryColors";

export function CategoryPill({ category }: { category: ElementCategory }) {
  const color = colorFor(category);
  return (
    <span
      style={{ backgroundColor: `${color}30` }}
      className="inline-flex max-w-[130px] items-center rounded-md px-2.5 py-1 text-[10px] font-black uppercase leading-tight tracking-[0.08em] text-black"
    >
      {category}
    </span>
  );
}
