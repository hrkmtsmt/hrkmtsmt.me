import { z } from "zod";
import { postSchema } from "./schema";

export type Schema = z.infer<typeof postSchema>;

export type ListResponse = {
  data: Schema[];
  pages: number;
  next: number | null;
};

export type ListParams = {
  limit: number;
  page: number;
  media?: Schema["media"];
  secret?: boolean;
};
