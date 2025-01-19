import React from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import { Tabs, Tab, TabPanel, Card, SkeltonCards } from '@components/ui';
import { Column, Container, Grid, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { usePosts } from '@modules/api';
import { Tablist, useSearchParamsTab } from '@modules/hooks';

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
  ] as const satisfies Tablist;

  const { tab, handleChangeTab } = useSearchParamsTab(tablist, 'media');

  const { data: posts, isLoading } = usePosts({
    limit: 12,
    offset: 0,
    media: tab ?? undefined,
  });

  console.log(tab);

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs>
        {tablist.map((t) => (
          <Tab key={t.key} active={tab === t.key} onClick={() => handleChangeTab(t.key)}>
            {t.name}
          </Tab>
        ))}
      </Tabs>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <>
          {tablist.map((t) => (
            <TabPanel key={t.key} active={tab === t.key}>
              <Grid>
                {posts?.map((post) => (
                  <Column key={post.id} size="md">
                    <Card to={post.url} category={post.media} title={post.title} />
                  </Column>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </>
      )}
    </Container>
  );
}
