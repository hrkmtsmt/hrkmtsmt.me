import { useMemo } from "react";
import useSWR from "swr";
import { rpc } from "@modules/api/rpc";

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
