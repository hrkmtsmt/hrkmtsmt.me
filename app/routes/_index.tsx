import React from 'react';
import { Button, Card } from '@components/ui';
import { Container, Grid, GridColumn } from '@components/layout';
import { Header } from '@components/feature';
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
      <Header />
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Container>
        <Grid>
          {[...Array(20)].map((_, i) => (
            <GridColumn key={i} size="md">
              <Card to="https://example.com" category="Zenn" title={`Title ${i}`} />
            </GridColumn>
          ))}
        </Grid>
      </Container>
    </>
  );
}
