import { useElementStore } from '../../state/useElementStore';
import { getAllElements } from '../../hooks/useSelectedElement';
import { categoryColors } from '../../data/categoryColors';
import { ElementCell } from './ElementCell';

const isLanthanide = (z: number) => z >= 57 && z <= 71;
const isActinide = (z: number) => z >= 89 && z <= 103;

export function PeriodicTable() {
  const { selected, setSelected } = useElementStore();
  const elements = getAllElements();

  const main = elements.filter((e) => !isLanthanide(e.atomicNumber) && !isActinide(e.atomicNumber));
  const lanthanides = elements.filter((e) => isLanthanide(e.atomicNumber));
  const actinides = elements.filter((e) => isActinide(e.atomicNumber));

  return (
    <div className="flex min-w-[520px] flex-col gap-2">
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: 'repeat(18, minmax(26px, 1fr))',
          gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
        }}
      >
        {main.map((el) =>
          el.group ? (
            <ElementCell
              key={el.atomicNumber}
              element={el}
              selected={selected === el.atomicNumber}
              onSelect={setSelected}
              style={{ gridColumnStart: el.group, gridRowStart: el.period }}
            />
          ) : null,
        )}

        <PlaceholderCell
          label="57–71"
          color={categoryColors.lanthanide}
          targetZ={57}
          gridColumn={3}
          gridRow={6}
          active={isLanthanide(selected)}
          onSelect={setSelected}
        />
        <PlaceholderCell
          label="89–103"
          color={categoryColors.actinide}
          targetZ={89}
          gridColumn={3}
          gridRow={7}
          active={isActinide(selected)}
          onSelect={setSelected}
        />
      </div>

      <div
        className="grid gap-[3px] pl-[calc((100%/18)*2)]"
        style={{ gridTemplateColumns: 'repeat(15, minmax(26px, 1fr))' }}
      >
        {lanthanides.map((el) => (
          <ElementCell
            key={el.atomicNumber}
            element={el}
            selected={selected === el.atomicNumber}
            onSelect={setSelected}
          />
        ))}
        {actinides.map((el) => (
          <ElementCell
            key={el.atomicNumber}
            element={el}
            selected={selected === el.atomicNumber}
            onSelect={setSelected}
          />
        ))}
      </div>
    </div>
  );
}

type PlaceholderProps = {
  label: string;
  color: string;
  targetZ: number;
  gridColumn: number;
  gridRow: number;
  active: boolean;
  onSelect: (z: number) => void;
};

function PlaceholderCell({
  label,
  color,
  targetZ,
  gridColumn,
  gridRow,
  active,
  onSelect,
}: PlaceholderProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(targetZ)}
      title={label}
      style={{
        gridColumnStart: gridColumn,
        gridRowStart: gridRow,
        backgroundColor: `${color}33`,
        borderColor: color,
      }}
      className={
        'aspect-square w-full rounded-[4px] border border-dashed text-[8px] font-semibold ' +
        'leading-none text-white/80 transition-transform duration-150 hover:scale-[1.1] ' +
        'hover:ring-1 hover:ring-white/60 focus:outline-none ' +
        (active ? 'ring-2 ring-white' : '')
      }
    >
      {label}
    </button>
  );
}
