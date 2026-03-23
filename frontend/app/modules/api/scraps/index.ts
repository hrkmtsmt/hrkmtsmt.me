import { useMemo } from "react";
import useSWR from "swr";
import { rpc } from "@modules/api/rpc";

export const useScraps = () => {
  const url = useMemo(() => rpc.api.scraps.$url(), []);
  return useSWR(url.href, async () => {
    const response = await rpc.api.scraps.$get({ query: { page: undefined, limit: undefined } });
    return response.json();
  }, {
    suspense: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};

export const useScrap = (filename: string) => {
  const url = useMemo(() => rpc.api.scraps[":filename"].$url({ param: { filename } }), []);
  return useSWR(url.href, async () => {
    const response = await rpc.api.scraps[":filename"].$get({ param: { filename } });
    return response.json();
  }, {
    suspense: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
};
