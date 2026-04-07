import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { basicAuth } from "hono/basic-auth";
import { drizzle } from "drizzle-orm/d1";
import { internal } from "@app/internal";
import { posts } from "@app/posts";
import { root } from "@app/root";
import { scraps } from "@app/scraps";
import { scheduled } from "@app/scheduled";
import type { BlankSchema } from "hono/types";
import type { Env } from "./types";

const app = new Hono<Env, BlankSchema, "/">()
  .basePath("/api")
  .use(logger())
  .use("/*", (c, next) => {
    return cors({
      origin: c.env.ALLOW_ORIGINS,
    })(c, next);
  })
  .use("/*", (c, next) => {
    return basicAuth({
      username: c.env.BASIC_AUTH_USERNAME,
      password: c.env.BASIC_AUTH_PASSWORD,
    })(c, next);
  })
  .use(async (c, next) => {
    c.set("db", drizzle(c.env.DB));
    await next();
  })
  .route("/", internal)
  .route("/", posts)
  .route("/", root)
  .route("/", scraps);

export default {
  fetch: app.fetch,
  scheduled,
};

export type AppType = typeof app;
