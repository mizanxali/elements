import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { Electron } from './Electron';

type Props = {
  shellIndex: number;
  electronCount: number;
  color: string;
};

export function ElectronShell({ shellIndex, electronCount, color }: Props) {
  const groupRef = useRef<Group>(null);

  const radius = 2.0 + shellIndex * 1.4;
  const inclinationX = (shellIndex * 0.37) % Math.PI;
  const inclinationZ = (shellIndex * 0.91) % Math.PI;
  const direction = shellIndex % 2 === 0 ? 1 : -1;
  const speed = (0.4 + shellIndex * 0.15) * direction;
  const phaseOffset = shellIndex * 0.3;

  const electronPositions = useMemo<[number, number, number][]>(() => {
    if (electronCount <= 0) return [];
    const positions: [number, number, number][] = [];
    for (let i = 0; i < electronCount; i++) {
      const theta = (i / electronCount) * Math.PI * 2 + phaseOffset;
      positions.push([Math.cos(theta) * radius, 0, Math.sin(theta) * radius]);
    }
    return positions;
  }, [electronCount, radius, phaseOffset]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += speed * delta;
  });

  return (
    <group rotation={[inclinationX, 0, inclinationZ]}>
      <mesh>
        <torusGeometry args={[radius, 0.01, 6, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <group ref={groupRef}>
        {electronPositions.map((pos, i) => (
          <Electron key={i} position={pos} color={color} />
        ))}
      </group>
    </group>
  );
}
