import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { fibonacciSphere } from '../../utils/fibonacciSphere';

const PROTON_COLOR = '#ff4d5e';
const NEUTRON_COLOR = '#c0c4cc';
const MAX_NUCLEONS = 30;

type Props = {
  protons: number;
  neutrons: number;
};

export function Nucleus({ protons, neutrons }: Props) {
  const groupRef = useRef<Group>(null);
  const total = protons + neutrons;
  const overflow = total > MAX_NUCLEONS;

  const baseRadius = 0.6 + Math.log(Math.max(1, protons)) * 0.15;

  const { positions, scale, types } = useMemo(() => {
    const visible = Math.min(total, MAX_NUCLEONS);
    const pts = fibonacciSphere(visible);
    const protonRatio = protons / Math.max(1, total);
    const visibleProtons = Math.round(visible * protonRatio);
    const t: ('p' | 'n')[] = pts.map((_, i) => (i < visibleProtons ? 'p' : 'n'));
    const packRadius = visible <= 1 ? 0 : baseRadius * 0.45;
    const nucleonScale = 0.18 + Math.max(0, 8 - visible) * 0.01;
    return {
      positions: pts.map(
        ([x, y, z]) => [x * packRadius, y * packRadius, z * packRadius] as [number, number, number],
      ),
      scale: nucleonScale,
      types: t,
    };
  }, [total, protons, baseRadius]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += 0.05 * delta;
  });

  return (
    <group ref={groupRef}>
      {overflow && (
        <mesh>
          <sphereGeometry args={[baseRadius, 24, 24]} />
          <meshStandardMaterial
            color="#ff8a9a"
            emissive="#ff4d5e"
            emissiveIntensity={0.9}
            transparent
            opacity={0.45}
            roughness={0.3}
          />
        </mesh>
      )}
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[scale, 10, 10]} />
          <meshStandardMaterial
            color={types[i] === 'p' ? PROTON_COLOR : NEUTRON_COLOR}
            emissive={types[i] === 'p' ? '#7a0010' : '#2a2c33'}
            emissiveIntensity={0.4}
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}
