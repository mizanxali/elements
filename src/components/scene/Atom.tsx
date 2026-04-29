import { useSelectedElement } from '../../hooks/useSelectedElement';
import { colorFor } from '../../data/categoryColors';
import { Nucleus } from './Nucleus';
import { ElectronShell } from './ElectronShell';

export function Atom() {
  const element = useSelectedElement();
  const protons = element.atomicNumber;
  const neutrons = Math.max(0, Math.round(element.atomicMass) - protons);
  const accent = colorFor(element.category);

  return (
    <group key={element.atomicNumber}>
      <Nucleus protons={protons} neutrons={neutrons} />
      {element.shells.map((count, i) => (
        <ElectronShell
          key={`${element.atomicNumber}-${i}`}
          shellIndex={i}
          electronCount={count}
          electronColor={accent}
        />
      ))}
    </group>
  );
}
