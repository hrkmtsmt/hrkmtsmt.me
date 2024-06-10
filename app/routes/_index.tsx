import React from 'react';
import { Button, Card, Navigation } from '@components/ui';
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

export default function Index() {
  return (
    <>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Card to="https://example.com" category="Zenn" title="cardcom" />
      <Navigation links={[{ to: '/about', name: 'About' }, { to: '/posts', name: 'Posts' }]} />
    </>
  );
}
