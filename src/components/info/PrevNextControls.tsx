import clsx from 'clsx';
import { useElementStore } from '../../state/useElementStore';

export function PrevNextControls() {
  const { selected, prev, next } = useElementStore();
  const atStart = selected <= 1;
  const atEnd = selected >= 118;

  return (
    <div className="flex items-center gap-2">
      <Button onClick={prev} disabled={atStart} label="‹ prev" />
      <span className="font-mono text-xs text-white/40">Z {selected}/118</span>
      <Button onClick={next} disabled={atEnd} label="next ›" />
    </div>
  );
}

function Button({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium',
        'transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2',
        'focus-visible:ring-white/60',
        disabled && 'cursor-not-allowed opacity-30 hover:bg-white/5',
      )}
      style={!disabled ? { color: 'var(--accent)' } : undefined}
    >
      {label}
    </button>
  );
}
