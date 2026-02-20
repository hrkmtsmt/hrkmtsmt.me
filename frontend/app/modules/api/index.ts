import { posts } from "./posts";
import { scraps } from "./scraps";

export const api = {
  posts,
  scraps,
};

export * from "./create-client";
export * from "./error";
export type * as Api from "./types";
export { usePosts } from "./posts/hooks";
export * from "./scraps";
