import { client } from '@modules/api';
import { API } from '@modules/constants';
import { ListResponse } from './types';

export const posts = {
  list: async () => {
    return client.get<ListResponse>(API.posts.path);
  },
};
