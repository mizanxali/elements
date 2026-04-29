import { Header } from './Header';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import { ElementInfoPanel } from '../info/ElementInfoPanel';
import { PeriodicDrawer } from '../periodic/PeriodicDrawer';

export function AppShell() {
  useKeyboardNav();

  return (
    <div className="grid h-screen w-screen grid-rows-[56px_1fr_280px] text-white">
      <Header />

      <div className="grid min-h-0 grid-cols-[1fr_360px]">
        <section className="relative flex items-center justify-center border-r border-white/5 bg-white/[0.02]">
          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">3D Canvas</div>
            <div className="mt-2 font-display text-2xl text-white/70">[ atom scene ]</div>
          </div>
        </section>

        <ElementInfoPanel />
      </div>

      <PeriodicDrawer />
    </div>
  );
}
