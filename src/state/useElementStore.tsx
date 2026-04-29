import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type ElementStore = {
  selected: number;
  setSelected: (z: number) => void;
  next: () => void;
  prev: () => void;
  autoRotate: boolean;
  toggleAutoRotate: () => void;
};

const MIN_Z = 1;
const MAX_Z = 118;

const ElementStoreContext = createContext<ElementStore | null>(null);

const clamp = (z: number) => Math.min(MAX_Z, Math.max(MIN_Z, z));

export function ElementStoreProvider({ children }: { children: ReactNode }) {
  const [selected, setSelectedRaw] = useState<number>(1);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const setSelected = useCallback((z: number) => setSelectedRaw(clamp(z)), []);
  const next = useCallback(() => setSelectedRaw((z) => clamp(z + 1)), []);
  const prev = useCallback(() => setSelectedRaw((z) => clamp(z - 1)), []);
  const toggleAutoRotate = useCallback(() => setAutoRotate((v) => !v), []);

  const value = useMemo<ElementStore>(
    () => ({ selected, setSelected, next, prev, autoRotate, toggleAutoRotate }),
    [selected, setSelected, next, prev, autoRotate, toggleAutoRotate],
  );

  return <ElementStoreContext.Provider value={value}>{children}</ElementStoreContext.Provider>;
}

export function useElementStore(): ElementStore {
  const ctx = useContext(ElementStoreContext);
  if (!ctx) throw new Error('useElementStore must be used inside <ElementStoreProvider>');
  return ctx;
}
