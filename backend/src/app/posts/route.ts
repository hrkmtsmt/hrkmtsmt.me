import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Logger } from "@modules";
import { Pagination, MediaSelecter } from "@core";
import { PostService } from "./service";
import type { BlankSchema } from "hono/types";
import type { Env } from "@types";

const PostQueries = z.object({
  limit: z.coerce.number().int().optional().default(12),
  page: z.coerce.number().int().optional().default(1),
  secret: z.coerce.boolean().optional().default(false),
  media: z.enum(["zenn", "qiita", "sizu", "note", "hatena"]).optional(),
});

export const posts = new Hono<Env, BlankSchema, "/">().get(
  "/posts",
  zValidator("query", PostQueries),
  async (c) => {
    try {
      const { limit, page, secret, media } = c.req.valid("query");

      const offset = (page - 1) * limit;
      const selecter = new MediaSelecter(media, secret);
      const medium = selecter.value === "all" ? undefined : selecter.value;

      const service = new PostService(c.var.db);
      const [data, total] = await Promise.all([
        service.list({ medium, limit, offset }),
        service.count({ medium }),
      ]);
      const { pages, next } = new Pagination(total, limit, page);

      return c.json({ data, pages, next }, 200);
    } catch (error: unknown) {
      Logger.error(error);
      if (error instanceof Error) {
        // return c.json({ message: error.message }, 422);
        throw new HTTPException(422, { message: error.message });
      }

      throw new HTTPException(500, { message: "Failed to fetch posts." });
      // return c.json({ message: "Failed to fetch posts." }, 500);
    }
  },
);
