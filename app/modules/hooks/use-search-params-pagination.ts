import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';

export const useSearchParamsPagination = (pages: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = useMemo(
    () => (Number.isFinite(Number(searchParams.get('page'))) ? Number(searchParams.get('page')) : undefined),
    [searchParams]
  );
  const pagination = useMemo(() => [...Array(pages)].map((_, i) => i + 1), [pages]);

  const handleChangePage = useCallback((p: number | undefined) => {
    if (!p) {
      return setSearchParams((state) => {
        state.delete('page');
        return state;
      });
    }

    setSearchParams((state) => {
      state.set('page', p.toString());
      return state;
    });
  }, []);

  return { pagination, page, handleChangePage };
};
