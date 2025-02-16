import React, { useCallback, useMemo } from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import { Tabs, TabPanel, Card, SkeltonCards, Pagination } from '@components/ui';
import { Column, Container, Grid, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { usePosts } from '@modules/api';
import { useSearchParams } from '@remix-run/react';
import { useSWRConfig } from 'swr';

export const meta: MetaFunction = () => {
  return [{ title: 'hrkmtsmt | Posts' }, { name: 'description', content: 'My posts' }];
};

export default function Page() {
  const tabs = [
    { value: undefined, name: 'All' },
    { value: 'zenn', name: 'Zenn' },
    { value: 'qiita', name: 'Qiita' },
    { value: 'note', name: 'Note' },
  ] as const;

  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useSWRConfig();
  const media = useMemo(() => searchParams.get('media') ?? tabs[0].value, [searchParams]) as
    | (typeof tabs)[number]['value']
    | undefined;
  const page = useMemo(() => (Number(searchParams.get('page')) ? Number(searchParams.get('page')) : 1), [searchParams]);
  const key = useMemo(() => ['/posts', { limit: 12, page, media: media ?? undefined }] as const, [page, media]);
  const { data: posts, isLoading } = usePosts(key[1]);

  const handleChangeTab: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      mutate(key);

      if (!e.currentTarget.value) {
        return setSearchParams((state) => {
          state.delete('page');
          state.delete('media');
          return state;
        });
      }

      return setSearchParams((state) => {
        state.delete('page');
        state.set('media', e.currentTarget.value);
        return state;
      });
    },
    [key]
  );

  const handleChangePage: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      mutate(key);

      if (!e.currentTarget.value) {
        return setSearchParams((state) => {
          state.delete('page');
          state.delete('media');
          return state;
        });
      }

      return setSearchParams((state) => {
        state.set('page', e.currentTarget.value);
        return state;
      });
    },
    [key]
  );

  const list = useMemo(() => tabs.map((t) => ({ name: t.name, value: t.value, active: media === t.value })), [media]);

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs list={list} onClick={handleChangeTab} />
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <>
          {tabs.map((t) => (
            <TabPanel key={t.value} active={media === t.value}>
              <Grid type="ul">
                {posts?.data.map((post) => (
                  <Column type="li" key={post.id} size="md">
                    <Card to={post.url} category={post.media} title={post.title} />
                  </Column>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </>
      )}
      <Pagination pages={posts?.pages} current={page} onClick={handleChangePage} />
    </Container>
  );
}
