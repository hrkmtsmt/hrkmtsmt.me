import type { D1Database } from "@cloudflare/workers-types";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export interface Bindings {
  DB: D1Database;
  ALLOW_ORIGINS: string;
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;
  HATENA_API_KEY: string;
  HATENA_API_URL: string;
  HATENA_BASE_URL: string;
  QIITA_API_ACCESS_TOKEN: string;
  QIITA_API_URL: string;
  QIITA_BASE_URL: string;
  SIZU_API_KEY: string;
  SIZU_API_URL: string;
  SIZU_BASE_URL: string;
  ZENN_API_URL: string;
  ZENN_BASE_URL: string;
}

export interface Env {
  Bindings: Bindings;
  Variables: {
    db: DrizzleD1Database;
  };
}
