import React from "react";
import { Column, Container, Grid, Heading2, Paragraph } from "@components/layout";
import { Card, DetailLink, SkeltonCards, HorizontalScroller } from "@components/ui";
import { ScrapPlayer, useScrapPlayer } from "@components/feature";
import { usePosts, useScraps } from "@modules/api";
import { PAGES } from "@modules/constants";

import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "hrkmtsmt" },
    {
      name: "description",
      content: "Hello! I'm Hiroki Matsumoto!",
    },
  ];
}

export default function Page() {
  const posts = usePosts({ limit: 12, page: 1 });
  const scraps = useScraps();
  const player = useScrapPlayer();

  return (
    <>
      <Container>
        <Heading2>{PAGES.about.name}</Heading2>
        <Paragraph>Software engineer.</Paragraph>
      </Container>
      <Container>
        <Heading2>{PAGES.posts.name}</Heading2>
        {posts.isLoading ? (
          <SkeltonCards total={12} size="md" />
        ) : (
          <Grid type="ul">
            {posts.data?.data.map((post) => (
              <Column type="li" key={post.id} size="md">
                <Card to={post.url} category={post.media} title={post.title} />
              </Column>
            ))}
          </Grid>
        )}
        <DetailLink to={PAGES.posts.path} text="View&nbsp;all" />
      </Container>
      <Container>
        <Heading2>{PAGES.scraps.name}</Heading2>
        <HorizontalScroller>
          {scraps.data?.data.map((scrap) => (
            <div key={scrap.filename} className="min-w-[40%]">
              <ScrapPlayer
                status={player.status(scrap.filename)}
                filename={scrap.filename}
                path={player.path(scrap.filename)}
                onPlay={player.play}
              />
            </div>
          ))}
        </HorizontalScroller>
      </Container>
    </>
  );
}
