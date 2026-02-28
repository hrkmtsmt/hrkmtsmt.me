import { hc } from "hono/client";
import type { AppType } from "@hrkmtsmt/backend";

const basicAuth = (username: string, password: string) => {
  console.log(username, password)
  return `Basic ${btoa(`${username}:${password}`)}`;
};

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return "/api";
  }
  return import.meta.env.VITE_API_BASE_URL;
};

export const rpc = hc<AppType>(getBaseURL(), {
  headers: {
    Authorization: basicAuth(
      import.meta.env.VITE_API_BASIC_AUTH_USERNAME,
      import.meta.env.VITE_API_BASIC_AUTH_PASSWORD,
    ),
    "Access-Control-Allow-Origin": import.meta.env.BASE_URL,
  },
});
