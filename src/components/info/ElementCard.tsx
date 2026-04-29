import type { Element } from '../../types/element';
import { CategoryPill } from './CategoryPill';

export function ElementCard({ element }: { element: Element }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-white/40">{element.atomicNumber}</div>
          <div
            className="font-display text-7xl font-bold leading-none"
            style={{ color: 'var(--accent)' }}
          >
            {element.symbol}
          </div>
          <div className="mt-2 text-lg font-medium text-white/90">{element.name}</div>
          <div className="font-mono text-xs text-white/50">{element.atomicMass} u</div>
        </div>
        <CategoryPill category={element.category} />
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <Row label="Shells" value={`[ ${element.shells.join(', ')} ]`} mono />
        <Row label="Config" value={element.electronConfig} mono />
        <Row label="Period" value={String(element.period)} />
        <Row label="Group" value={element.group ? String(element.group) : '—'} />
        <Row label="Block" value={element.block} />
        <Row label="Phase" value={element.phase} />
      </dl>

      <p className="overflow-y-auto pr-1 text-sm leading-relaxed text-white/70">
        {element.summary}
      </p>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</dt>
      <dd className={mono ? 'font-mono text-xs text-white/85' : 'text-sm text-white/85'}>
        {value}
      </dd>
    </div>
  );
}
