import { api, Api, ClientError } from '@modules/api';
import useSWR from 'swr';
import { ListParams } from './types';

export const usePosts = (params: ListParams) => {
  return useSWR<Api.Post.ListResponse, ClientError>(
    `/posts?media=${params.media}&page=${params.page}`,
    () => api.posts.list(params),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
};
