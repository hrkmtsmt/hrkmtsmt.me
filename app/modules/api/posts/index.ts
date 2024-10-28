import { client } from '@modules/api';
import { ListResponse } from './types';

export const posts = {
  list: async () => client.get<ListResponse>('/posts'),
};
