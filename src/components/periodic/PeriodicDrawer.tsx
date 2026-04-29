import { useState } from "react";
import clsx from "clsx";
import { PeriodicTable } from "./PeriodicTable";
import { ChevronDown, ChevronUp, GripHorizontal } from "../ui/Icons";

export function PeriodicDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      id="periodic-table-drawer"
      style={{
        transform: isOpen ? "translateY(0)" : "translateY(calc(100% - 44px))",
      }}
      className="fixed inset-x-0 bottom-0 z-30 flex h-[320px] max-h-[52vh] flex-col border-t border-black/10 bg-[#c8f7ff] shadow-[0_-12px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-out md:h-[292px] md:max-h-[292px]"
    >
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="periodic-table-drawer-content"
        aria-label={isOpen ? "Collapse periodic table" : "Expand periodic table"}
        title={isOpen ? "Collapse periodic table" : "Expand periodic table"}
        className={clsx(
          "flex h-11 shrink-0 items-center justify-between gap-3 px-3 text-left md:px-4",
          "transition hover:bg-[#fff15a] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/35",
        )}
      >
        <span className="flex min-w-0 items-center gap-2 rounded-md bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-black shadow-sm ring-1 ring-black/10">
          <GripHorizontal className="h-4 w-4 shrink-0" />
          <span className="truncate">Periodic table</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="hidden rounded-md bg-[#fff15a] px-2.5 py-1 text-[10px] font-black uppercase text-black shadow-sm ring-1 ring-black/10 sm:inline">
            click cells / arrows cycle
          </span>
          <span className="hidden rounded-md bg-white px-2.5 py-1 text-[10px] font-black uppercase text-black shadow-sm ring-1 ring-black/10 sm:inline">
            {isOpen ? "Collapse" : "Expand"}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-black shadow-sm ring-1 ring-black/10">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </span>
        </span>
      </button>

      <div
        id="periodic-table-drawer-content"
        className="min-h-0 flex-1 overflow-auto px-3 pb-3 md:px-4"
      >
        <PeriodicTable />
      </div>
    </section>
  );
}
