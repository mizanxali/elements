import { useState } from "react";
import clsx from "clsx";
import { PeriodicTable } from "./PeriodicTable";
import {
  GripHorizontal,
  PanelBottomClose,
  PanelBottomOpen,
} from "../ui/Icons";

export function PeriodicDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="periodic-table-drawer"
      className={clsx(
        "flex shrink-0 flex-col overflow-hidden border-t border-black/10 bg-[#fffaf0]/95 transition-[height,max-height] duration-300 ease-out",
        isOpen
          ? "h-[320px] max-h-[52vh] md:h-[292px] md:max-h-[292px]"
          : "h-11 max-h-11",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="periodic-table-drawer-content"
        aria-label={isOpen ? "Collapse periodic table" : "Expand periodic table"}
        title={isOpen ? "Collapse periodic table" : "Expand periodic table"}
        className={clsx(
          "flex h-11 shrink-0 items-center gap-3 bg-[#f7f2e6] px-3 text-left text-black md:px-4",
          "transition hover:bg-[#fff9df] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/35",
        )}
      >
        <GripHorizontal className="h-5 w-5 shrink-0" />
        <span className="min-w-0 truncate font-display text-[11px] font-black uppercase tracking-[0.14em]">
          {isOpen ? "Hide table" : "Periodic table"}
        </span>
        <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-md bg-white text-black shadow-sm ring-1 ring-black/10">
          {isOpen ? (
            <PanelBottomClose className="h-4 w-4" />
          ) : (
            <PanelBottomOpen className="h-4 w-4" />
          )}
        </span>
      </button>

      <div
        id="periodic-table-drawer-content"
        aria-hidden={!isOpen}
        className={clsx(
          "min-h-0 flex-1 overflow-auto px-3 pb-3 transition-opacity duration-200 md:px-4",
          !isOpen && "pointer-events-none opacity-0",
        )}
      >
        <PeriodicTable />
      </div>
    </section>
  );
}
