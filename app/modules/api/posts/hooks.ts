import { api, Api, ClientError } from '@modules/api';
import useSWR from 'swr';

export const usePosts = () => {
  return useSWR<Api.Post.ListResponse, ClientError>('/posts', api.posts.list);
};
