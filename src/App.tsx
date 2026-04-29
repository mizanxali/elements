import { useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { ElementStoreProvider, useElementStore } from './state/useElementStore';

function SelectionLogger() {
  const { selected } = useElementStore();
  useEffect(() => {
    console.log('selected Z:', selected);
  }, [selected]);
  return null;
}

export default function App() {
  return (
    <ElementStoreProvider>
      <SelectionLogger />
      <AppShell />
    </ElementStoreProvider>
  );
}
