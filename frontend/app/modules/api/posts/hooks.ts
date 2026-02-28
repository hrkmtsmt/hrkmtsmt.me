import { type Api, type ClientError, api } from "@modules/api";
import { rpc } from "@modules/api/rpc"
import useSWR from "swr";
import type { ListParams } from "./types";

export const usePosts = (params: ListParams) => {
  rpc.posts.$get({
    queries: params
  })

  return useSWR<Api.Post.ListResponse, ClientError>(["/posts", params], () => api.posts.list(params), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
