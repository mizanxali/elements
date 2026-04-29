import { Header } from './Header';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import { useSelectedElement } from '../../hooks/useSelectedElement';

export function AppShell() {
  useKeyboardNav();
  const el = useSelectedElement();

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

        <aside className="flex min-h-0 flex-col bg-white/[0.04] p-6">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Selected</div>
          <div className="mt-2 font-display text-5xl font-bold">{el.symbol}</div>
          <div className="mt-1 text-sm text-white/60">
            Z = {el.atomicNumber} · {el.name}
          </div>
          <div className="mt-1 text-xs text-white/40">{el.category}</div>
        </aside>
      </div>

      <section className="border-t border-white/5 bg-white/[0.02] p-4">
        <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Periodic table</div>
        <div className="mt-2 text-sm text-white/50">[ grid placeholder · use ← → to cycle ]</div>
      </section>
    </div>
  );
}
