import { z } from 'zod';
import { postSchema } from './schema';

export type Schema = z.infer<typeof postSchema>;

export type ListResponse = Schema[];
