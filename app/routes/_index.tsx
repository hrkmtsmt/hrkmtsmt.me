import React, { useCallback, useState } from 'react';
import { Card, Tab, Tabs } from '@components/ui';
import { Container, Grid, Column } from '@components/layout';
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
  const [tab, setTab] = useState('1');

  const handleClickTab: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setTab(e.currentTarget.value);
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Tabs>
          <Tab value="1" active={tab === '1'} onClick={handleClickTab}>
            Zenn Zenn
          </Tab>
          <Tab value="2" active={tab === '2'} onClick={handleClickTab}>
            Qiita
          </Tab>
          <Tab value="4" active={tab === '4'} onClick={handleClickTab}>
            Zenn Zenn
          </Tab>
          <Tab value="5" active={tab === '5'} onClick={handleClickTab}>
            Qiita
          </Tab>
          <Tab value="7" active={tab === '7'} onClick={handleClickTab}>
            Zenn Zenn
          </Tab>
          <Tab value="8" active={tab === '8'} onClick={handleClickTab}>
            Qiita
          </Tab>
        </Tabs>
      </Container>
      <Container>
        <Grid>
          {[...Array(20)].map((_, i) => (
            <Column key={i} size="md">
              <Card to="https://example.com" category="Zenn" title={`Title ${i}`} />
            </Column>
          ))}
        </Grid>
      </Container>
    </>
  );
}
