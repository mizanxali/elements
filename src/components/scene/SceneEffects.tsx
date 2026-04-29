import { EffectComposer, Bloom } from '@react-three/postprocessing';

export function SceneEffects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.8} luminanceThreshold={0.2} mipmapBlur />
    </EffectComposer>
  );
}
