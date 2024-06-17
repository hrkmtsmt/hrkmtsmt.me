import { z } from 'zod';

export const postSchema = z.object({
  id: z.string().uuid(),
  media: z.enum(['zenn', 'qiita', 'sizu', 'note']),
  title: z.string(),
  url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
