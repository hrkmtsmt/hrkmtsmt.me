import { httpClient } from '@modules/api';
import { API } from '@modules/constants';
import { ListResponse } from './types';

export const posts = {
  list: async () => {
    return httpClient.get<ListResponse>(API.posts.path);
  },
};
