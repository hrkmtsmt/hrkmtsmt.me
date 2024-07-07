import React from 'react';
import { Container } from '@components/layout';
import { api, loaderFetcher } from '@modules/api';
import { defer } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/cloudflare';

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

export default function About() {
  return (
    <Container>
      About
    </Container>
  );
}
