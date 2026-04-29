import clsx from 'clsx';
import { useElementStore } from '../../state/useElementStore';

export function Header() {
  const { autoRotate, toggleAutoRotate } = useElementStore();

  return (
    <header className="flex h-14 items-center justify-between gap-3 border-b border-white/5 px-4 sm:px-6">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-xl font-bold tracking-tight text-white">Elements</span>
        <span className="hidden text-[11px] uppercase tracking-[0.3em] text-white/40 sm:inline">
          3D periodic table
        </span>
      </div>

      <button
        type="button"
        onClick={toggleAutoRotate}
        aria-pressed={autoRotate}
        className={clsx(
          'flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] transition',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
          autoRotate
            ? 'border-white/30 bg-white/10 text-white'
            : 'border-white/10 bg-white/[0.03] text-white/60 hover:text-white/90',
        )}
      >
        <span
          className={clsx(
            'inline-block h-2 w-2 rounded-full transition',
            autoRotate ? 'bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]' : 'bg-white/30',
          )}
        />
        Autorotate
      </button>
    </header>
  );
}
