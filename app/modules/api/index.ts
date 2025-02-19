import { posts } from "./posts";

export const api = {
  posts,
};

export * from "./create-client";
export * from "./error";
export type * as Api from "./types";
export { usePosts } from "./posts/hooks";
