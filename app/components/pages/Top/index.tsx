import React from 'react';
import { Card, SkeltonCards } from '@components/ui';
import { Container, Grid, Column, Heading2 } from '@components/layout';
import { usePosts } from '@modules/hooks';
import { PAGES } from '@modules/constants';

export const Top: React.FC = () => {
  const { data: posts, isLoading } = usePosts();

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <Grid>
          {posts?.map((post) => (
            <Column key={post.id} size="md">
              <Card to={post.url} category={post.media} title={post.title} />
            </Column>
          ))}
        </Grid>
      )}
    </Container>
  );
};
