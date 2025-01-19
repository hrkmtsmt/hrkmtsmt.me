import React, { useCallback, useMemo } from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import { Tabs, Tab, TabPanel, Card, SkeltonCards, Pagination } from '@components/ui';
import { Column, Container, Grid, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { usePosts } from '@modules/api';
import { useSearchParams } from '@remix-run/react';
import { useSWRConfig } from 'swr';

export const meta: MetaFunction = () => {
  return [
    { title: 'hrkmtsmt | Posts' },
    {
      name: 'description',
      content: 'My posts',
    },
  ];
};

export default function Page() {
  const tablist = [
    { key: null, name: 'All' },
    { key: 'zenn', name: 'Zenn' },
    { key: 'qiita', name: 'Qiita' },
    { key: 'note', name: 'Note' },
  ] as const;

  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useSWRConfig();
  const media = useMemo(() => searchParams.get('media') ?? tablist[0].key, [searchParams]) as
    | (typeof tablist)[number]['key']
    | undefined;
  const page = useMemo(() => (Number(searchParams.get('page')) ? Number(searchParams.get('page')) : 1), [searchParams]);
  const key = useMemo(() => ['/posts', { limit: 12, page, media: media ?? undefined }] as const, [page, media]);
  const { data: posts, isLoading } = usePosts(key[1]);

  const pagination = useMemo(() => [...Array(posts?.pages)].map((_, i) => i + 1), [posts?.pages]);

  const handleChangeTab = useCallback(async (media: (typeof tablist)[number]['key']) => {
    mutate(key);

    if (!media) {
      return setSearchParams((state) => {
        state.delete('page');
        state.delete('media');
        return state;
      });
    }

    setSearchParams((state) => {
      state.delete('page');
      state.set('media', media);
      return state;
    });
  }, []);

  const handleChangePage = useCallback((p: number | undefined) => {
    mutate(key);

    if (!p) {
      return setSearchParams((state) => {
        state.delete('page');
        state.delete('media');
        return state;
      });
    }

    setSearchParams((state) => {
      state.set('page', p.toString());
      return state;
    });
  }, []);

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs>
        {tablist.map((t) => (
          <Tab key={t.key} active={media === t.key} onClick={() => handleChangeTab(t.key)}>
            {t.name}
          </Tab>
        ))}
      </Tabs>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <>
          {tablist.map((t) => (
            <TabPanel key={t.key} active={media === t.key}>
              <Grid>
                {posts?.data.map((post) => (
                  <Column key={post.id} size="md">
                    <Card to={post.url} category={post.media} title={post.title} />
                  </Column>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </>
      )}
      <Pagination pagination={pagination} current={page} onClick={async (p) => handleChangePage(p)} />
    </Container>
  );
}
