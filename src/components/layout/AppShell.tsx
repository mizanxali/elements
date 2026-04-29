import { Header } from "./Header";
import { useKeyboardNav } from "../../hooks/useKeyboardNav";
import { ElementInfoPanel } from "../info/ElementInfoPanel";
import { PeriodicDrawer } from "../periodic/PeriodicDrawer";
import { AtomScene } from "../scene/AtomScene";

export function AppShell() {
  useKeyboardNav();

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#fff9df] text-black">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col pb-11 md:grid md:grid-cols-[1fr_360px]">
        <section className="relative min-h-[45vh] flex-1 overflow-hidden border-b border-black/10 bg-[#f7f2e6] md:min-h-0 md:border-b-0 md:border-r">
          <AtomScene />
        </section>

        <ElementInfoPanel />
      </div>

      <PeriodicDrawer />
    </div>
  );
}
