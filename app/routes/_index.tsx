import React from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import { Card, SkeltonCards } from '@components/ui';
import { Container, Grid, Column, Heading2 } from '@components/layout';
import { PAGES } from '@modules/constants';
import { usePosts } from '@modules/api';

export const meta: MetaFunction = () => {
  return [
    { title: 'hrkmtsmt' },
    {
      name: 'description',
      content: "Hello! I'm Hiroki Matsumoto!",
    },
  ];
};

export default function Page() {
  const { data: posts, isLoading } = usePosts({ limit: 12, page: 1 });

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <Grid>
          {posts?.data.map((post) => (
            <Column key={post.id} size="md">
              <Card to={post.url} category={post.media} title={post.title} />
            </Column>
          ))}
        </Grid>
      )}
    </Container>
  );
}
