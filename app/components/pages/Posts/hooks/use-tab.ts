import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { Api } from '@modules/api';

export const useTab = () => {
  const tabs = [
    { id: 'all', name: 'All' },
    { id: 'zenn', name: 'Zenn' },
    { id: 'qiita', name: 'Qiita' },
    { id: 'note', name: 'Note' },
  ] as const;

  const [params, setParams] = useSearchParams();

  const name = 'media';

  const tab = useMemo(() => params.get('media') ?? 'all', [params]);

  const handleClickTab = useCallback((tab: (typeof tabs)[number]['id']) => {
    setParams((prev) => {
      prev.set(name, tab);

      return prev;
    });
  }, []);
  
  const postFilter = useCallback((post: Api.Post.ListResponse[number], tab: string) => {
    if (tab === 'all') {
      return true;
    }

    return post.media === tab;
  }, []);

  return { tab, handleClickTab, tabs, postFilter };
};
