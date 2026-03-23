import React, { Suspense } from "react";
import { Column, Container, Grid, Heading2, Paragraph } from "@components/layout";
import { Card, DetailLink, SkeltonCards, HorizontalScroller } from "@components/ui";
import { ScrapPlayer } from "@components/feature";
import { usePosts, useScraps } from "@modules/api";
import { PAGES } from "@modules/constants";

export function meta() {
  return [
    { title: "hrkmtsmt" },
    {
      name: "description",
      content: "Hello! I'm Hiroki Matsumoto!",
    },
  ];
}

function PostsList() {
  const { data } = usePosts({ limit: "12", page: "1" });
  return (
    <Grid type="ul">
      {data.data.map((post) => (
        <Column type="li" key={post.id} size="md">
          <Card to={post.url} category={post.media} title={post.title} />
        </Column>
      ))}
    </Grid>
  );
}

function ScrapsList() {
  const { data } = useScraps();
  return (
    <HorizontalScroller>
      {data.data.map((scrap) => (
        <div key={scrap.hash} className="min-w-[40%]">
          <ScrapPlayer
            path={`/scraps/${scrap.filename}`}
            filename={scrap.filename}
            text={scrap.markdown}
            mp3={scrap.mp3}
          />
        </div>
      ))}
    </HorizontalScroller>
  );
}

export default function Page() {
  return (
    <>
      <Container>
        <Heading2>{PAGES.about.name}</Heading2>
        <Paragraph>Software engineer.</Paragraph>
      </Container>
      <Container>
        <Heading2>{PAGES.posts.name}</Heading2>
        <Suspense fallback={<SkeltonCards total={12} size="md" />}>
          <PostsList />
        </Suspense>
        <DetailLink to={PAGES.posts.path} text="View&nbsp;all" />
      </Container>
      <Container>
        <Heading2>{PAGES.scraps.name}</Heading2>
        <Suspense fallback={null}>
          <ScrapsList />
        </Suspense>
      </Container>
    </>
  );
}
