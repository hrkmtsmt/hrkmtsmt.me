import { type Api, client, type ClientError } from "@modules/api";
import useSWR from "swr";
import { z } from "zod";

export const scrapSchema = z.object({
  filename: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
});

export const scraps = {
  list: async () => {
    return client.get<ListResponse>("/scraps");
  },
  retrieve: async (params: RetrieveParams) => {
    return client.get<RetrieveResponse>(`/scraps/${params.filename}`);
  },
};

export const useScraps = () => {
  return useSWR<ListResponse, ClientError>(["/scraps"], scraps.list, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};

export const useScrap = (params: RetrieveParams) => {
  return useSWR<RetrieveResponse, ClientError>(["/scraps", params], () => scraps.retrieve(params), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};

export type Schema = z.infer<typeof scrapSchema>;

export type ListResponse = {
  data: Schema[];
  pages: number;
  next: number | number;
};

export type RetrieveParams = { filename: string };

export type RetrieveResponse = { data: Schema };
