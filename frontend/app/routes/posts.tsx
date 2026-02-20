import { Column, Container, Grid, Heading2 } from "@components/layout";
import { Card, Pagination, SkeltonCards, TabPanel, Tabs } from "@components/ui";
import { usePosts } from "@modules/api";
import { PAGES } from "@modules/constants";
import { toSafeNumber } from "@modules/utils";
import { useSearchParams } from "react-router";
import React, { useCallback, useMemo } from "react";
import { useSWRConfig } from "swr";

import type { Route } from "./+types/posts";

export function meta({}: Route.MetaArgs) {
  return [{ title: "hrkmtsmt | Posts" }, { name: "description", content: "My posts" }];
}

export default function Page() {
  const tabs = [
    { value: undefined, name: "All" },
    { value: "zenn", name: "Zenn" },
    { value: "qiita", name: "Qiita" },
    { value: "note", name: "Note" },
  ] as const;

  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate } = useSWRConfig();
  const media = useMemo(
    () => (searchParams.get("media") ?? undefined) as (typeof tabs)[number]["value"],
    [searchParams]
  );
  const page = useMemo(() => toSafeNumber(searchParams.get("page"), 1), [searchParams]);
  const key = useMemo(() => ["/posts", { limit: 12, page, media: media ?? undefined }] as const, [page, media]);
  const { data: posts, isLoading } = usePosts(key[1]);

  const handleChangeTab: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      mutate(key);

      if (!e.currentTarget.value) {
        return setSearchParams((state) => {
          state.delete("page");
          state.delete("media");
          return state;
        });
      }

      return setSearchParams((state) => {
        state.delete("page");
        state.set("media", e.currentTarget.value);
        return state;
      });
    },
    [key, mutate, setSearchParams]
  );

  const handleChangePage: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      mutate(key);

      if (!e.currentTarget.value) {
        return setSearchParams((state) => {
          state.delete("page");
          state.delete("media");
          return state;
        });
      }

      return setSearchParams((state) => {
        state.set("page", e.currentTarget.value);
        return state;
      });
    },
    [key, mutate, setSearchParams]
  );

  const list = useMemo(
    () =>
      tabs.map((t) => ({
        name: t.name,
        value: t.value,
        active: media === t.value,
      })),
    [media, tabs]
  );

  return (
    <Container>
      <Heading2>{PAGES.posts.name}</Heading2>
      <Tabs tabs={list} onClick={handleChangeTab} />
      {isLoading ? (
        <SkeltonCards total={12} size="md" />
      ) : (
        <>
          {tabs.map((t) => (
            <TabPanel key={t.name} active={media === t.value}>
              <Grid type="ul">
                {posts?.data.map((post) => (
                  <Column type="li" key={post.id} size="md">
                    <Card to={post.url} category={post.media} title={post.title} />
                  </Column>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </>
      )}
      <Pagination pages={posts?.pages} current={page} onClick={handleChangePage} />
    </Container>
  );
}
