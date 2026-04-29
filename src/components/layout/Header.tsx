import clsx from "clsx";
import { useElementStore } from "../../state/useElementStore";

export function Header() {
  const { autoRotate, toggleAutoRotate } = useElementStore();

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-black/10 bg-white/85 px-4 text-black backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <span className="rounded-md px-3 py-1 font-display text-2xl font-bold uppercase leading-none text-black">
          Elements
        </span>
        <span className="hidden rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-black sm:inline">
          3D periodic table
        </span>
      </div>

      <button
        type="button"
        onClick={toggleAutoRotate}
        aria-pressed={autoRotate}
        className={clsx(
          "flex items-center gap-2 rounded-md border border-black/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] shadow-sm transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d5e]/50",
          autoRotate
            ? "bg-[#63e6be]"
            : "bg-white hover:-translate-y-0.5 hover:bg-[#fff15a]",
        )}
      >
        <span
          className={clsx(
            "inline-block h-2.5 w-2.5 rounded-md ring-1 ring-black/20 transition",
            autoRotate ? "bg-black" : "bg-white",
          )}
        />
        Autorotate
      </button>
    </header>
  );
}
