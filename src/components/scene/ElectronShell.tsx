import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { Electron } from "./Electron";

const SHELL_COLOR = "#5f6673";

type Props = {
  shellIndex: number;
  electronCount: number;
  electronColor: string;
};

export function ElectronShell({
  shellIndex,
  electronCount,
  electronColor,
}: Props) {
  const groupRef = useRef<Group>(null);

  const radius = 2.0 + shellIndex * 1.4;
  const direction = shellIndex % 2 === 0 ? 1 : -1;
  const speed = (0.4 + shellIndex * 0.15) * direction;
  const phaseOffset = shellIndex * 0.3;

  const electronAngles = useMemo(() => {
    if (electronCount <= 0) return [];
    const angles: number[] = [];
    for (let i = 0; i < electronCount; i++) {
      angles.push((i / electronCount) * Math.PI * 2 + phaseOffset);
    }
    return angles;
  }, [electronCount, phaseOffset]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.z += speed * delta;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[radius, 0.026, 10, 128]} />
        <meshBasicMaterial
          color={SHELL_COLOR}
          opacity={1}
          toneMapped={false}
          transparent={false}
        />
      </mesh>
      {electronAngles.map((angle, i) => (
        <group key={i} rotation={[0, 0, angle]}>
          <Electron position={[radius, 0, 0]} color={electronColor} />
        </group>
      ))}
    </group>
  );
}
