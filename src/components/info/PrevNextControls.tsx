import clsx from "clsx";
import type { ReactNode } from "react";
import { useElementStore } from "../../state/useElementStore";
import { ChevronLeft, ChevronRight } from "../ui/Icons";

export function PrevNextControls({ compact = false }: { compact?: boolean }) {
  const { selected, prev, next } = useElementStore();
  const atStart = selected <= 1;
  const atEnd = selected >= 118;

  return (
    <div
      className={clsx(
        "grid items-center gap-2",
        compact ? "grid-cols-[auto_1fr_auto]" : "grid-cols-[1fr_auto_1fr]",
      )}
    >
      <Button
        onClick={prev}
        disabled={atStart}
        label="Prev"
        icon={<ChevronLeft className="h-4 w-4" />}
        compact={compact}
      />
      <span className="rounded-md bg-[#fff15a] px-2.5 py-1 font-mono text-xs font-black text-black">
        Z {selected}/118
      </span>
      <Button
        onClick={next}
        disabled={atEnd}
        label="Next"
        icon={<ChevronRight className="h-4 w-4" />}
        iconAfter
        compact={compact}
      />
    </div>
  );
}

function Button({
  onClick,
  disabled,
  label,
  icon,
  iconAfter,
  compact,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  icon: ReactNode;
  iconAfter?: boolean;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-1.5 rounded-md bg-black/5 font-black uppercase text-black",
        compact ? "min-h-9 px-2.5 py-2 text-xs" : "px-3 py-2 text-sm",
        "transition hover:-translate-y-0.5 hover:bg-[var(--accent)] focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--accent)]/50",
        disabled &&
          "cursor-not-allowed opacity-40 hover:translate-y-0 hover:bg-white",
      )}
    >
      {!iconAfter && icon}
      {label}
      {iconAfter && icon}
    </button>
  );
}
