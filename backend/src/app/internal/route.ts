import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { Logger } from "@modules";
import * as schema from "@schema";
import type { BlankSchema } from "hono/types";
import type { Env } from "@types";

const ScrapsBulkBody = z.array(
  z.object({
    filename: z.string(),
    markdown: z.string(),
    mp3: z.string(),
    hash: z.string(),
  }),
);

export const internal = new Hono<Env, BlankSchema, "/">().post(
  "/internal/scraps:bulk",
  zValidator("json", ScrapsBulkBody),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const now = new Date();

      await c.var.db
        .insert(schema.scraps)
        .values(body.map((scrap) => ({ ...scrap, createdAt: now, updatedAt: now })))
        .onConflictDoUpdate({
          target: [schema.scraps.filename],
          set: {
            markdown: sql`excluded.markdown`,
            mp3: sql`excluded.mp3`,
            hash: sql`excluded.hash`,
            updatedAt: sql`excluded.updated_at`,
          },
        });

      return c.json({ ok: true }, 200);
    } catch (error: unknown) {
      Logger.error(error);

      if (error instanceof Error) {
        throw new HTTPException(422, { message: error.message });
      }

      throw new HTTPException(500, { message: "Failed to upsert scraps." });
    }
  },
);
