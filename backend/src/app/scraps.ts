import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { count, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Pagination } from "@core";
import { Logger } from "@modules";
import * as schema from "@schema";
import type { BlankSchema } from "hono/types";
import type { Env } from "@types";

const ScrapsQueries = z.object({
  limit: z.coerce.number().int().positive().optional().default(12),
  page: z.coerce.number().int().positive().optional().default(1),
});

const ScrapParams = z.object({
  filename: z.string(),
});

export const scraps = new Hono<Env, BlankSchema, "/">()
  .get("/scraps", zValidator("query", ScrapsQueries), async (c) => {
    try {
      const { page, limit } = c.req.valid("query");
      const offset = (page - 1) * limit;

      const db = drizzle(c.env.DB);
      const [data, [{ total }]] = await Promise.all([
        db.select().from(schema.scraps).limit(limit).offset(offset),
        db.select({ total: count() }).from(schema.scraps),
      ]);
      const { pages, next } = new Pagination(total, limit, page);

      return c.json({ data, pages, next }, 200);
    } catch (error: unknown) {
      Logger.error(error);

      if (error instanceof Error) {
        throw new HTTPException(422, { message: error.message });
      }

      throw new HTTPException(500, { message: "Failed to fetch scraps." });
    }
  })
  .get("/scraps/:filename", zValidator("param", ScrapParams), async (c) => {
    const { filename } = c.req.valid("param");
    const db = drizzle(c.env.DB);
    const data = await db.select().from(schema.scraps).where(eq(schema.scraps.filename, filename));
    const scrap = data.at(0);

    if (!scrap) {
      throw new HTTPException(400, { message: `${filename} dose not exist.` });
    }

    return c.json({ data: scrap }, 200);
  });
