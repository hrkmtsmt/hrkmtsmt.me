import { client } from "@modules/api";
import { ListParams, ListResponse } from "./types";
import queryString from "query-string";

export const posts = {
  list: async (params: ListParams) => {
    const query = queryString.stringify(params);
    return client.get<ListResponse>(`/posts?${query}`);
  },
};
