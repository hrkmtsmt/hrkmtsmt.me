import React from 'react';
import { Tabs, Tab, TabPanel, Card } from '@components/ui';
import { Column, Container, Grid, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { useTab } from './hooks';
import { usePosts } from '@modules/hooks';

export const Posts: React.FC = () => {
  const { data: posts } = usePosts();
  const { tab, tabs, handleClickTab } = useTab();

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs>
        {tabs.map((t) => (
          <Tab key={t.id} active={tab === t.id} onClick={() => handleClickTab(t.id)}>
            {t.id}
          </Tab>
        ))}
      </Tabs>
      <TabPanel active={tab === 'Zenn'}>
        <Grid>
          {posts
            ?.filter((p) => p.media === 'zenn')
            .map((post) => (
              <Column key={post.id} size="md">
                <Card to={post.url} category={post.media} title={post.title} />
              </Column>
            ))}
        </Grid>
      </TabPanel>
      <TabPanel active={tab === 'Qiita'}>
        <Grid>
          {posts
            ?.filter((p) => p.media === 'qiita')
            .map((post) => (
              <Column key={post.id} size="md">
                <Card to={post.url} category={post.media} title={post.title} />
              </Column>
            ))}
        </Grid>
      </TabPanel>
      <TabPanel active={tab === 'Note'}>
        <Grid>
          {posts
            ?.filter((p) => p.media === 'note')
            .map((post) => (
              <Column key={post.id} size="md">
                <Card to={post.url} category={post.media} title={post.title} />
              </Column>
            ))}
        </Grid>
      </TabPanel>
    </Container>
  );
};
