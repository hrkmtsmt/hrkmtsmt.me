import { useCallback, useState } from 'react';

export const useTab = () => {
  const [tab, setTab] = useState<'Zenn' | 'Qiita' | 'Note'>('Zenn');

  const handleClickTab = useCallback((t: typeof tab) => {
    setTab(t);
  }, []);

  const tabs = [{ id: 'Zenn' }, { id: 'Qiita' }, { id: 'Note' }] as const;

  return { tab, handleClickTab, tabs };
};
