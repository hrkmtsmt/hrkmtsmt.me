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
  const { data: posts, isLoading } = usePosts();

  const tablist = [
    { key: 'all', name: 'All' },
    { key: 'zenn', name: 'Zenn' },
    { key: 'qiita', name: 'Qiita' },
    { key: 'note', name: 'Note' },
  ] as const satisfies Tablist;

  const { selectedTabKey, handleChangeTab } = useSearchParamsTab(tablist, 'media');

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs>
        {tablist.map((t) => (
          <Tab key={t.key} active={selectedTabKey === t.key} onClick={() => handleChangeTab(t.key)}>
            {t.name}
          </Tab>
        ))}
      </Tabs>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <>
          {tablist.map((t) => (
            <TabPanel key={t.key} active={selectedTabKey === t.key}>
              <Grid>
                {posts
                  ?.filter((post) => selectedTabKey === t.key || post.media === selectedTabKey)
                  .map((post) => (
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
