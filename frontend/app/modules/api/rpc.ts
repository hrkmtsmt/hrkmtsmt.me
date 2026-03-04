import { hc } from "hono/client";
import type { AppType } from "@hrkmtsmt/backend";

const basicAuth = (username: string, password: string) => {
  return `Basic ${btoa(`${username}:${password}`)}`;
};

export const rpc = hc<AppType>(import.meta.env.VITE_APP_BASE_URL, {
  headers: {
    Authorization: basicAuth(
      import.meta.env.VITE_BASIC_AUTH_USERNAME,
      import.meta.env.VITE_BASIC_AUTH_PASSWORD,
    ),
    "Access-Control-Allow-Origin": import.meta.env.VITE_APP_BASE_URL,
  },
});
