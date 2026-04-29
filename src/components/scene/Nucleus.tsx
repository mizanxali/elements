import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { packedSphere } from '../../utils/fibonacciSphere';

const PROTON_COLOR = '#ee3f32';
const NEUTRON_COLOR = '#3566ff';
const MAX_NUCLEONS = 30;

type Props = {
  protons: number;
  neutrons: number;
};

export function Nucleus({ protons, neutrons }: Props) {
  const groupRef = useRef<Group>(null);
  const total = protons + neutrons;

  const { positions, scale, types } = useMemo(() => {
    const visible = Math.min(total, MAX_NUCLEONS);
    const pts = packedSphere(visible);
    const protonRatio = protons / Math.max(1, total);
    const visibleProtons = Math.round(visible * protonRatio);
    const nucleonScale = visible <= 4 ? 0.34 : 0.36;
    let protonsPlaced = 0;
    let neutronsPlaced = 0;
    const t: ('p' | 'n')[] = pts.map((_, i) => {
      const remaining = visible - i;
      const remainingProtons = visibleProtons - protonsPlaced;
      const remainingNeutrons = visible - visibleProtons - neutronsPlaced;

      if (remainingProtons <= 0) {
        neutronsPlaced += 1;
        return 'n';
      }

      if (remainingNeutrons <= 0) {
        protonsPlaced += 1;
        return 'p';
      }

      const shouldPlaceProton = remainingProtons / remaining >= (i % 2 === 0 ? 0.42 : 0.58);
      if (shouldPlaceProton) {
        protonsPlaced += 1;
        return 'p';
      }

      neutronsPlaced += 1;
      return 'n';
    });

    return {
      positions: pts,
      scale: nucleonScale,
      types: t,
    };
  }, [total, protons]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.05 * delta;
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[scale, 24, 24]} />
          <meshStandardMaterial
            color={types[i] === 'p' ? PROTON_COLOR : NEUTRON_COLOR}
            roughness={0.22}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
