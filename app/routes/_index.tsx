import { Column, Container, Grid, Heading2, Paragraph } from "@components/layout";
import { Card, DetailLink, SkeltonCards } from "@components/ui";
import { usePosts } from "@modules/api";
import { PAGES } from "@modules/constants";
import { MetaFunction } from "@remix-run/cloudflare";
import React from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "hrkmtsmt" },
    {
      name: "description",
      content: "Hello! I'm Hiroki Matsumoto!",
    },
  ];
};

export default function Page() {
  const { data: posts, isLoading } = usePosts({ limit: 12, page: 1 });

  return (
    <>
      <Container>
        <Heading2>{PAGES.about.name}</Heading2>
        <Paragraph>Software engineer.</Paragraph>
      </Container>
      <Container>
        <Heading2>{PAGES.posts.name}</Heading2>
        {isLoading ? (
          <SkeltonCards total={12} size="md" />
        ) : (
          <Grid type="ul">
            {posts?.data.map((post) => (
              <Column type="li" key={post.id} size="md">
                <Card to={post.url} category={post.media} title={post.title} />
              </Column>
            ))}
          </Grid>
        )}
        <DetailLink to={PAGES.posts.path} text="View&nbsp;all" />
      </Container>
    </>
  );
}
