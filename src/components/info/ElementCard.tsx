import clsx from "clsx";
import type { Element } from "../../types/element";
import { CategoryPill } from "./CategoryPill";

export function ElementCard({ element }: { element: Element }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs font-black text-black/65">
              ATOMIC NO. {element.atomicNumber}
            </div>
            <div className="font-display text-7xl font-black leading-none text-black">
              {element.symbol}
            </div>
            <div className="mt-2 text-xl font-black uppercase leading-tight text-black">
              {element.name}
            </div>
            <div className="mt-1 flex items-center gap-2 font-mono text-xs font-bold text-black/70">
              <span>{element.atomicMass} u</span>
            </div>
          </div>
          <CategoryPill category={element.category} />
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <Row label="Shells" value={`[ ${element.shells.join(", ")} ]`} mono />
        <Row label="Config" value={element.electronConfig} mono wide />
        <Row label="Period" value={String(element.period)} />
        <Row
          label="Group"
          value={element.group ? String(element.group) : "-"}
        />
        <Row label="Block" value={element.block} />
        <Row label="Phase" value={element.phase} />
      </dl>

      <p className="overflow-y-auto text-sm font-semibold leading-relaxed text-black">
        {element.summary}
      </p>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  wide,
}: {
  label: string;
  value: string;
  mono?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex min-w-0 flex-col gap-0.5 py-1",
        wide && "col-span-2",
      )}
    >
      <dt className="text-[10px] font-black uppercase tracking-[0.16em] text-black/55">
        {label}
      </dt>
      <dd
        className={clsx(
          mono
            ? "break-words font-mono text-xs font-bold text-black"
            : "text-sm font-black uppercase text-black",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
