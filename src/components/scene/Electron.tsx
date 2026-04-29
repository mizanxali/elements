type Props = {
  position: [number, number, number];
  color: string;
};

export function Electron({ position, color }: Props) {
  return (
    <group position={position}>
      <mesh castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[0.18, 18, 18]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}
