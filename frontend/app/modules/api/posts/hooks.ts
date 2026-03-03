import { useMemo } from "react";
import useSWR from "swr";
import { rpc } from "@modules/api/rpc";
import type { InferRequestType } from "hono/client"

type ListQueries = InferRequestType<typeof rpc.api.posts.$get>['query'];

export const usePosts = (queries: ListQueries) => {
  const url = useMemo(() => rpc.api.posts.$url({ query: queries }), [queries]);
  return useSWR(url.href, async () => {
    const response = await rpc.api.posts.$get({ query: queries });
    return response.json();
  }, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
