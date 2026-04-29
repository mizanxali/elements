import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SceneEffects } from './SceneEffects';
import { Atom } from './Atom';
import { useElementStore } from '../../state/useElementStore';

export function AtomScene() {
  const { autoRotate } = useElementStore();

  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 50, position: [0, 0, 18] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 8, 10]} intensity={1.2} color="#ffd6a5" />
      <pointLight position={[-10, -6, -8]} intensity={0.9} color="#7dd3fc" />

      <Atom />

      <OrbitControls
        enableDamping
        minDistance={6}
        maxDistance={40}
        autoRotate={autoRotate}
        autoRotateSpeed={0.6}
      />
      <SceneEffects />
    </Canvas>
  );
}
