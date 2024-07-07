import React from 'react';
import { Tabs, Tab, TabPanel, Card, SkeltonCards } from '@components/ui';
import { Column, Container, Grid, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { useTab } from './hooks';
import { usePosts } from '@modules/hooks';

export const Posts: React.FC = () => {
  const { data: posts, isLoading } = usePosts();
  const { tab, tabs, handleClickTab, postFilter } = useTab();

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs>
        {tabs.map((t) => (
          <Tab key={t.id} active={tab === t.id} onClick={() => handleClickTab(t.id)}>
            {t.name}
          </Tab>
        ))}
      </Tabs>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <>
          {tabs.map((t) => (
            <TabPanel key={t.id} active={tab === t.id}>
              <Grid>
                {posts?.filter((post) => postFilter(post, tab)).map((post) => (
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
};
