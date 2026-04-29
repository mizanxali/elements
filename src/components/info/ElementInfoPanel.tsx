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

  return (
    <aside
      style={{ ["--accent" as never]: accent }}
      className={clsx(
        "flex min-h-0 shrink-0 flex-col overflow-hidden border-t border-black/10 bg-[#fffaf0]/95 transition-[height,max-height,width] duration-300 ease-out",
        "md:h-auto md:max-h-none md:flex-row md:border-l md:border-t-0",
        isOpen
          ? "h-[42vh] max-h-[420px] md:w-[360px]"
          : "h-16 max-h-16 md:w-12",
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
          "hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-black/10 bg-[#f7f2e6] px-2 py-3 text-black md:flex",
          "transition hover:bg-[#fff9df] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/35",
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

      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="element-info-panel-content"
        aria-label={isOpen ? "Collapse element info" : "Expand element info"}
        title={isOpen ? "Collapse element info" : "Expand element info"}
        className={clsx(
          "flex h-16 shrink-0 items-center justify-between gap-3 bg-[#f7f2e6] px-4 text-left text-black md:hidden",
          "transition hover:bg-[#fff9df] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/35",
        )}
      >
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
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/10">
          <ChevronDown
            className={clsx(
              "h-5 w-5 transition-transform",
              isOpen ? "rotate-180" : "",
            )}
          />
        </span>
      </button>

      <div
        id="element-info-panel-content"
        aria-hidden={!isOpen}
        className={clsx(
          "flex min-h-0 flex-1 flex-col gap-4 p-4 md:gap-5 md:p-5",
          "transition-opacity duration-200",
          !isOpen && "pointer-events-none opacity-0",
        )}
      >
        <div className="md:hidden">
          <PrevNextControls compact />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <ElementCard element={element} />
        </div>

        <div className="hidden pt-1 md:mt-auto md:block md:pt-2">
          <PrevNextControls />
        </div>
      </div>
    </aside>
  );
}
