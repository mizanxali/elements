import { useState } from "react";
import clsx from "clsx";
import { useSelectedElement } from "../../hooks/useSelectedElement";
import { colorFor } from "../../data/categoryColors";
import { ElementCard } from "./ElementCard";
import { PrevNextControls } from "./PrevNextControls";
import {
  ChevronDown,
  GripVertical,
  PanelRightClose,
  PanelRightOpen,
} from "../ui/Icons";

type ElementInfoPanelProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ElementInfoPanel({
  isOpen,
  onOpenChange,
}: ElementInfoPanelProps) {
  const element = useSelectedElement();
  const accent = colorFor(element.category);
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      style={{ ["--accent" as never]: accent }}
      className={clsx(
        "relative flex min-h-0 flex-col overflow-hidden border-t border-black/10 bg-[#fffaf0]/95",
        "md:shrink-0 md:border-l md:border-t-0 md:transition-[width] md:duration-300 md:ease-out",
        isOpen ? "md:w-[360px]" : "md:w-12",
      )}
    >
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="element-info-panel-content"
        aria-label={isOpen ? "Collapse element info" : "Expand element info"}
        title={isOpen ? "Collapse element info" : "Expand element info"}
        className={clsx(
          "absolute inset-y-0 left-0 z-10 hidden w-12 flex-col items-center gap-3 border-r border-black/10 bg-[#c8f7ff] px-2 py-3 text-black shadow-[-8px_0_24px_rgba(0,0,0,0.08)] md:flex",
          "transition hover:bg-[#fff15a] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/35",
        )}
      >
        <GripVertical className="h-5 w-5 shrink-0" />
        <span
          className="font-display text-[11px] font-black uppercase tracking-[0.14em]"
          style={{ writingMode: "vertical-rl" }}
        >
          {isOpen ? "Hide info" : "Element info"}
        </span>
        <span className="mt-auto flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/10">
          {isOpen ? (
            <PanelRightClose className="h-4 w-4" />
          ) : (
            <PanelRightOpen className="h-4 w-4" />
          )}
        </span>
      </button>

      <div
        id="element-info-panel-content"
        className={clsx(
          "flex min-h-0 flex-1 flex-col gap-4 p-4 md:gap-5 md:p-5 md:pl-16",
          "transition-opacity duration-200",
          !isOpen && "md:pointer-events-none md:opacity-0",
        )}
      >
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
            title={expanded ? "Collapse details" : "Expand details"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-black/5 text-black transition hover:bg-[#fff15a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50"
          >
            <ChevronDown
              className={clsx(
                "h-5 w-5 transition-transform",
                expanded ? "rotate-180" : "",
              )}
            />
          </button>
        </div>

        <div className="md:hidden">
          <PrevNextControls compact />
        </div>

        <div
          className={clsx(
            "min-h-0 flex-1 overflow-y-auto md:block",
            expanded ? "block" : "hidden",
          )}
        >
          <ElementCard element={element} />
        </div>

        <div className="hidden pt-1 md:mt-auto md:block md:pt-2">
          <PrevNextControls />
        </div>
      </div>
    </aside>
  );
}
