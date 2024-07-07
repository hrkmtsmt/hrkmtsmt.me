import React, { Suspense, useCallback, useState } from 'react';
import { Column, Container, Grid, Heading2 } from '@components/layout';
import { api, loaderFetcher } from '@modules/api';
import { Await, defer } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/cloudflare';
import { PAGES } from '@modules/constants';
import { Tabs, Tab, TabPanel, Card, SkeltonCards } from '@components/ui';

export const useTab = () => {
  const [tab, setTab] = useState<'Zenn' | 'Qiita' | 'Note'>('Zenn');
  
  const handleClickTab = useCallback((t: typeof tab) => {
    setTab(t);
  }, [])
  
  const tabs = [
    { id: 'Zenn' },
    { id: 'Qiita' },
    { id: 'Note' },
  ] as const;

  return { tab, handleClickTab, tabs }
};

export const meta: MetaFunction = () => {
  return [
    { title: 'hrkmtsmt | About' },
    {
      name: 'description',
      content: 'My posts',
    },
  ];
};

export async function clientLoader() {
  return defer({ data: loaderFetcher(api.posts.list) });
}

export default function Posts() {
  const { tab, tabs, handleClickTab } = useTab();
  
  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs>
        {tabs.map((t) => (
          <Tab key={t.id} active={tab === t.id} onClick={() => handleClickTab(t.id)}>{t.id}</Tab>
        ))}
      </Tabs>
      <Suspense fallback={<SkeltonCards total={12} size="md" />}>
        <Await resolve={loaderFetcher(api.posts.list)}>
          {(response) => (
            <div>
              <TabPanel active={tab === 'Zenn'}>
                <Grid>
                  {response.data?.filter((p) => p.media === 'zenn').map((post) => (
                    <Column key={post.id} size="md">
                      <Card to={post.url} category={post.media} title={post.title} />
                    </Column>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel active={tab === 'Qiita'}>
                <Grid>
                  {response.data?.filter((p) => p.media === 'qiita').map((post) => (
                    <Column key={post.id} size="md">
                      <Card to={post.url} category={post.media} title={post.title} />
                    </Column>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel active={tab === 'Note'}>
                <Grid>
                  {response.data?.filter((p) => p.media === 'note').map((post) => (
                    <Column key={post.id} size="md">
                      <Card to={post.url} category={post.media} title={post.title} />
                    </Column>
                  ))}
                </Grid>
              </TabPanel>
            </div>
          )}
        </Await>
      </Suspense>
    </Container>
  );
}
