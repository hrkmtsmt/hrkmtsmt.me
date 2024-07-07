import { api } from '@modules/api';
import useSWR from 'swr';

export const usePosts = () => {
  return useSWR('/posts', api.posts.list);
};
