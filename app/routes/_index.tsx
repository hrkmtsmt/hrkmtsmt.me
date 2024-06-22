import React, { useCallback, useState } from 'react';
import { Card, Tab, Tabs } from '@components/ui';
import { Container, Grid, Column, Root } from '@components/layout';
import { Footer, Header } from '@components/feature';
import { api, loaderFetcher } from '@modules/api';
import { useClientLoader } from '@modules/hooks/use-client-loader';
import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [
    { title: 'hrkmtsmt' },
    {
      name: 'description',
      content: "Hello! I'm Hiroki Matsumoto!",
    },
  ];
};

export async function clientLoader() {
  return loaderFetcher(api.posts.list);
}

export default function Index() {
  const [tab, setTab] = useState('1');

  const { data, error } = useClientLoader<typeof clientLoader>();

  const handleClickTab: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setTab(e.currentTarget.value);
  }, []);

  if (error) {
    return null;
  }

  return (
    <Root>
      <Header />
      <Container>
        <Tabs>
          <Tab value="1" active={tab === '1'} onClick={handleClickTab}>
            Zenn Zenn
          </Tab>
          <Tab value="2" active={tab === '2'} onClick={handleClickTab}>
            Qiita
          </Tab>
          <Tab value="4" active={tab === '4'} onClick={handleClickTab}>
            Zenn Zenn
          </Tab>
          <Tab value="5" active={tab === '5'} onClick={handleClickTab}>
            Qiita
          </Tab>
          <Tab value="7" active={tab === '7'} onClick={handleClickTab}>
            Zenn Zenn
          </Tab>
          <Tab value="8" active={tab === '8'} onClick={handleClickTab}>
            Qiita
          </Tab>
        </Tabs>
        <Grid>
          {data.map((post) => (
            <Column key={post.id} size="md">
              <Card to={post.url} category={post.media} title={post.title} />
            </Column>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Root>
  );
}
