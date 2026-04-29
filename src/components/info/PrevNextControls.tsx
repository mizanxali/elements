import clsx from "clsx";
import { useElementStore } from "../../state/useElementStore";

export function PrevNextControls() {
  const { selected, prev, next } = useElementStore();
  const atStart = selected <= 1;
  const atEnd = selected >= 118;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <Button onClick={prev} disabled={atStart} label="Prev" />
      <span className="rounded-md bg-[#fff15a] px-2.5 py-1 font-mono text-xs font-black text-black">
        Z {selected}/118
      </span>
      <Button onClick={next} disabled={atEnd} label="Next" />
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
        "rounded-md bg-black/5 px-3 py-2 text-sm font-black uppercase text-black",
        "transition hover:-translate-y-0.5 hover:bg-[var(--accent)] focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--accent)]/50",
        disabled &&
          "cursor-not-allowed opacity-40 hover:translate-y-0 hover:bg-white",
      )}
    >
      {label}
    </button>
  );
}
