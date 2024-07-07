import React from 'react';
import { Posts } from '@components/pages';
import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [
    { title: 'hrkmtsmt | Posts' },
    {
      name: 'description',
      content: 'My posts',
    },
  ];
};

export default function Page() {
  return <Posts />;
}
