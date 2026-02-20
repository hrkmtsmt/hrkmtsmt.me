import { client } from "@modules/api";
import queryString from "query-string";
import type { ListParams, ListResponse } from "./types";

export const posts = {
  list: async (params: ListParams) => {
    const query = queryString.stringify(params);
    return client.get<ListResponse>(`/posts?${query}`);
  },
};
