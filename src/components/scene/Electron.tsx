type Props = {
  position: [number, number, number];
  color: string;
};

export function Electron({ position, color }: Props) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.12, 10, 10]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.2}
        toneMapped={false}
      />
    </mesh>
  );
}
