import React from 'react';
import { Card } from '@components/ui';
import { Container, Grid, Column, Heading2 } from '@components/layout';
import { usePosts } from '@modules/hooks';

export const Top: React.FC = () => {
  const { data: posts } = usePosts();

  return (
    <Container>
      <Heading2>Posts</Heading2>
      <Grid>
        {posts?.map((post) => (
          <Column key={post.id} size="md">
            <Card to={post.url} category={post.media} title={post.title} />
          </Column>
        ))}
      </Grid>
    </Container>
  );
};
