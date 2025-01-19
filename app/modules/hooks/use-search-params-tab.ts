import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';

interface Tab {
  key: string | null;
  name: string;
}

export type Tablist = Tab[];

export const useSearchParamsTab = <T extends Tablist, U extends string>(tablist: T, name: U) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab: T[number]['key'] = useMemo(() => searchParams.get(name) ?? tablist[0].key, [searchParams]);

  const handleChangeTab = useCallback((key: (typeof tablist)[number]['key']) => {
    if (!key) {
      return setSearchParams((state) => {
        state.delete(name);
        return state;
      });
    }

    setSearchParams((state) => {
      state.set(name, key);
      return state;
    });
  }, []);

  return { tab, handleChangeTab };
};
