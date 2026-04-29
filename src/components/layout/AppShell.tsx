import { useEffect, useState } from "react";
import { useKeyboardNav } from "../../hooks/useKeyboardNav";
import { ElementInfoPanel } from "../info/ElementInfoPanel";
import { PeriodicDrawer } from "../periodic/PeriodicDrawer";
import { AtomScene } from "../scene/AtomScene";

export function AppShell() {
  useKeyboardNav();
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);
  const [tableOpen, setTableOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncPanels = () => {
      if (mediaQuery.matches && tableOpen && infoPanelOpen) {
        setInfoPanelOpen(false);
      }
    };

    syncPanels();
    mediaQuery.addEventListener("change", syncPanels);
    return () => mediaQuery.removeEventListener("change", syncPanels);
  }, [infoPanelOpen, tableOpen]);

  const isMobileLayout = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  const handleInfoOpenChange = (isOpen: boolean) => {
    setInfoPanelOpen(isOpen);
    if (isOpen && isMobileLayout()) {
      setTableOpen(false);
    }
  };

  const handleTableOpenChange = (isOpen: boolean) => {
    setTableOpen(isOpen);
    if (isOpen && isMobileLayout()) {
      setInfoPanelOpen(false);
    }
  };

  return (
    <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#fff9df] text-black">
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <section
          className={
            "relative flex-1 overflow-hidden border-b border-black/10 bg-[#f7f2e6] md:min-h-0 md:border-b-0 md:border-r " +
            (tableOpen ? "min-h-0" : "min-h-[45vh]")
          }
        >
          <h1 className="pointer-events-none absolute left-5 top-5 z-10 font-display text-2xl font-bold tracking-normal text-black sm:left-7 sm:top-7 sm:text-3xl">
            ELEMENTS
          </h1>
          <AtomScene />
        </section>

        <ElementInfoPanel
          isOpen={infoPanelOpen}
          onOpenChange={handleInfoOpenChange}
        />
      </div>

      <PeriodicDrawer isOpen={tableOpen} onOpenChange={handleTableOpenChange} />
    </div>
  );
}
