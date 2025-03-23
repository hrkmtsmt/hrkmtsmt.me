import { Api, ClientError, api } from "@modules/api";
import useSWR from "swr";
import { ListParams } from "./types";

export const usePosts = (params: ListParams) => {
  return useSWR<Api.Post.ListResponse, ClientError>(["/posts", params], () => api.posts.list(params), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
