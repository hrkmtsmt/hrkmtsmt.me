import React, { Suspense } from 'react';
import { Card, SkeltonCards } from '@components/ui';
import { Container, Grid, Column, Heading2 } from '@components/layout';
import { api, loaderFetcher } from '@modules/api';
import type { MetaFunction } from '@remix-run/cloudflare';
import { Await, defer } from '@remix-run/react';

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
  return defer({ data: loaderFetcher(api.posts.list) });
}

export default function Index() {
  return (
    <Container>
      <Heading2>Posts</Heading2>
      <Suspense fallback={<SkeltonCards total={12} size="md" />}>
        <Await resolve={loaderFetcher(api.posts.list)}>
          {(response) => (
            <Grid>
              {response.data?.map((post) => (
                <Column key={post.id} size="md">
                  <Card to={post.url} category={post.media} title={post.title} />
                </Column>
              ))}
            </Grid>
          )}
        </Await>
      </Suspense>
    </Container>
  );
}
