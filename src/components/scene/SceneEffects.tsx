import { EffectComposer, Bloom } from '@react-three/postprocessing';

export function SceneEffects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.45} luminanceThreshold={0.9} mipmapBlur />
    </EffectComposer>
  );
}
