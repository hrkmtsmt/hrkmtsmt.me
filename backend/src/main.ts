import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { basicAuth } from "hono/basic-auth";
import { drizzle } from "drizzle-orm/d1";
import { scheduled } from "./scheduled";
import * as handlers from "./app";
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
  .route("/", handlers.root)
  .route("/", handlers.posts)
  .route("/", handlers.scraps)
  .route("/", handlers.internal);

export default {
  fetch: app.fetch,
  scheduled,
};

export type AppType = typeof app;
