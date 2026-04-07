import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { or, count, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Logger } from "@modules";
import { Pagination, MediaSelector } from "@core";
import { posts as postsTable } from "@schema";
import type { BlankSchema } from "hono/types";
import type { Env } from "@types";

const PostQueries = z.object({
  limit: z.coerce.number().int().optional().default(12),
  page: z.coerce.number().int().optional().default(1),
  secret: z.coerce.boolean().optional().default(false),
  media: z.enum(["zenn", "qiita", "sizu", "note", "hatena"]).optional(),
});

export const posts = new Hono<Env, BlankSchema, "/">().get("/posts", zValidator("query", PostQueries), async (c) => {
  try {
    const { limit, page, secret, media } = c.req.valid("query");

    const offset = (page - 1) * limit;
    const selector = new MediaSelector(media, secret);
    const medium = selector.value === "all" ? undefined : selector.value;
    const where = medium ? or(...medium.map((m) => eq(postsTable.media, m))) : undefined;

    const db = drizzle(c.env.DB);
    const [data, [{ total }]] = await Promise.all([
      db.select().from(postsTable).where(where).orderBy(desc(postsTable.publishedAt)).limit(limit).offset(offset),
      db.select({ total: count() }).from(postsTable).where(where),
    ]);
    const { pages, next } = new Pagination(total, limit, page);

    return c.json({ data, pages, next }, 200);
  } catch (error: unknown) {
    Logger.error(error);
    if (error instanceof Error) {
      throw new HTTPException(422, { message: error.message });
    }

    throw new HTTPException(500, { message: "Failed to fetch posts." });
  }
});
