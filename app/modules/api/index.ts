export * from './create-client';
export * from './loader-fetcher';
export type * as Api from './types';

import { posts } from './posts';

export const api = {
  posts,
};
