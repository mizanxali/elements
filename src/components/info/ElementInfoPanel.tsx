import { useState } from 'react';
import clsx from 'clsx';
import { useSelectedElement } from '../../hooks/useSelectedElement';
import { colorFor } from '../../data/categoryColors';
import { ElementCard } from './ElementCard';
import { PrevNextControls } from './PrevNextControls';

export function ElementInfoPanel() {
  const element = useSelectedElement();
  const accent = colorFor(element.category);
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      style={{ ['--accent' as never]: accent }}
      className={clsx(
        'flex min-h-0 flex-col gap-4 border-t border-white/5 bg-white/[0.04] p-4',
        'md:gap-5 md:border-l md:border-t-0 md:p-6',
      )}
    >
      {/* Compact bar — mobile only */}
      <div className="flex items-center justify-between gap-3 md:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="font-display text-3xl font-bold leading-none"
            style={{ color: 'var(--accent)' }}
          >
            {element.symbol}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-white/90">{element.name}</div>
            <div className="font-mono text-[10px] text-white/40">
              Z {element.atomicNumber} · {element.atomicMass} u
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse details' : 'Expand details'}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:text-white"
        >
          <span
            className={clsx('inline-block transition-transform', expanded ? 'rotate-180' : '')}
          >
            ▾
          </span>
        </button>
      </div>

      {/* Full card */}
      <div
        className={clsx(
          'min-h-0 flex-1 overflow-y-auto md:block',
          expanded ? 'block' : 'hidden',
        )}
      >
        <ElementCard element={element} />
      </div>

      <div className="border-t border-white/5 pt-3 md:mt-auto md:pt-4">
        <PrevNextControls />
      </div>
    </aside>
  );
}
