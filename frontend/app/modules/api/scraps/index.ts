import { useMemo } from "react";
import useSWR from "swr";
import { rpc } from "@modules/api/rpc";
import type { InferRequestType } from "hono/client";

export const useScraps = () => {
  const url = useMemo(() => rpc.api.scraps.$url(), []);
  return useSWR(url.href, async () => {
    const response = await rpc.api.scraps.$get({ query: { page: undefined, limit: undefined } });
    return response.json();
  }, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};

const scrap = rpc.api.scraps[":filename"];

type RetrieveParams = InferRequestType<typeof scrap.$get>["param"];

export const useScrap = (params: RetrieveParams) => {
  const url = useMemo(() => scrap.$url({ param: params }), [params]);
  return useSWR(url.href, async () => {
    const response = await scrap.$get({ param: params });
    return response.json();
  }, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
