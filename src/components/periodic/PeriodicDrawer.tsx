import { PeriodicTable } from './PeriodicTable';

export function PeriodicDrawer() {
  return (
    <section className="flex min-h-[200px] flex-col border-t border-white/5 bg-white/[0.02] px-3 py-3 md:min-h-0 md:px-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">Periodic table</span>
        <span className="hidden text-[10px] text-white/30 sm:inline">click a cell · ← → to cycle</span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <PeriodicTable />
      </div>
    </section>
  );
}
