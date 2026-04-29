import { useState } from "react";
import clsx from "clsx";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { colorFor } from "../../data/categoryColors";
import { ElementCard } from "./ElementCard";
import { PrevNextControls } from "./PrevNextControls";

export function ElementInfoPanel() {
  const element = useSelectedElement();
  const accent = colorFor(element.category);
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      style={{ ["--accent" as never]: accent }}
      className={clsx(
        "flex min-h-0 flex-col gap-4 border-t border-black/10 bg-[#fffaf0]/95 p-4",
        "md:gap-5 md:border-l md:border-t-0 md:p-5",
      )}
    >
      {/* Compact bar — mobile only */}
      <div className="flex items-center justify-between gap-3 md:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="rounded-md px-2 py-1 font-display text-3xl font-black leading-none text-black"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {element.symbol}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-black uppercase text-black">
              {element.name}
            </div>
            <div className="font-mono text-[10px] font-bold text-black/60">
              Z {element.atomicNumber} · {element.atomicMass} u
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-black/5 text-black transition hover:bg-[#fff15a]"
        >
          <span
            className={clsx(
              "inline-block transition-transform",
              expanded ? "rotate-180" : "",
            )}
          >
            ▾
          </span>
        </button>
      </div>

      {/* Full card */}
      <div
        className={clsx(
          "min-h-0 flex-1 overflow-y-auto md:block",
          expanded ? "block" : "hidden",
        )}
      >
        <ElementCard element={element} />
      </div>

      <div className="pt-1 md:mt-auto md:pt-2">
        <PrevNextControls />
      </div>
    </aside>
  );
}
