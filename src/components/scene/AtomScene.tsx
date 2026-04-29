import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SceneEffects } from "./SceneEffects";
import { Atom } from "./Atom";

export function AtomScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 50, position: [0, 0, 18] }}>
      <color attach="background" args={["#f4f7fb"]} />
      <ambientLight intensity={0.75} />
      <pointLight position={[10, 8, 10]} intensity={1.15} color="#fff2d6" />
      <pointLight position={[-10, -6, -8]} intensity={1.1} color="#4dabf7" />
      <pointLight position={[0, -10, 6]} intensity={0.75} color="#ff4d5e" />

      <Atom />

      <OrbitControls
        enableDamping
        minDistance={6}
        maxDistance={40}
      />
      <SceneEffects />
    </Canvas>
  );
}
