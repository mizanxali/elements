import { useState } from "react";
import { useKeyboardNav } from "../../hooks/useKeyboardNav";
import { ElementInfoPanel } from "../info/ElementInfoPanel";
import { PeriodicDrawer } from "../periodic/PeriodicDrawer";
import { AtomScene } from "../scene/AtomScene";

export function AppShell() {
  useKeyboardNav();
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);

  return (
    <div className="flex h-[100dvh] w-screen flex-col overflow-hidden bg-[#fff9df] text-black">
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <section className="relative min-h-[45vh] flex-1 overflow-hidden border-b border-black/10 bg-[#f7f2e6] md:min-h-0 md:border-b-0 md:border-r">
          <h1 className="pointer-events-none absolute left-5 top-5 z-10 font-display text-2xl font-bold tracking-normal text-black sm:left-7 sm:top-7 sm:text-3xl">
            ELEMENTS
          </h1>
          <AtomScene />
        </section>

        <ElementInfoPanel
          isOpen={infoPanelOpen}
          onOpenChange={setInfoPanelOpen}
        />
      </div>

      <PeriodicDrawer />
    </div>
  );
}
