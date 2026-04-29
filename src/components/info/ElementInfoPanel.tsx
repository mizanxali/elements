import { useSelectedElement } from '../../hooks/useSelectedElement';
import { colorFor } from '../../data/categoryColors';
import { ElementCard } from './ElementCard';
import { PrevNextControls } from './PrevNextControls';

export function ElementInfoPanel() {
  const element = useSelectedElement();
  const accent = colorFor(element.category);

  return (
    <aside
      style={{ ['--accent' as never]: accent }}
      className="flex min-h-0 flex-col gap-5 border-l border-white/5 bg-white/[0.04] p-6"
    >
      <ElementCard element={element} />
      <div className="mt-auto border-t border-white/5 pt-4">
        <PrevNextControls />
      </div>
    </aside>
  );
}
