type Props = {
  position: [number, number, number];
  color: string;
};

export function Electron({ position, color }: Props) {
  return (
    <mesh position={position} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}
