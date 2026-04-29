import { Header } from './Header';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import { ElementInfoPanel } from '../info/ElementInfoPanel';
import { PeriodicDrawer } from '../periodic/PeriodicDrawer';
import { AtomScene } from '../scene/AtomScene';

export function AppShell() {
  useKeyboardNav();

  return (
    <div className="flex h-screen w-screen flex-col text-white md:grid md:grid-rows-[56px_1fr_280px]">
      <Header />

      <div className="flex min-h-0 flex-1 flex-col md:grid md:grid-cols-[1fr_360px]">
        <section className="relative min-h-[45vh] flex-1 border-white/5 bg-white/[0.02] md:min-h-0 md:border-r">
          <AtomScene />
        </section>

        <ElementInfoPanel />
      </div>

      <PeriodicDrawer />
    </div>
  );
}
