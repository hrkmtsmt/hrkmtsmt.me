import React from 'react';
import { About } from '@components/pages';
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

export default function Page() {
  return <About />;
}
