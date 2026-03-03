import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Pagination } from "@core";
import { Logger } from "@modules";
import { ScrapService } from "./service";
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

      const service = new ScrapService(
        c.var.octokit,
        c.env.GITHUB_OWNER,
        c.env.GITHUB_REPO,
      );
      const data = await service.list();
      const { pages, next } = new Pagination(data.length, limit, page);

      return c.json(
        { data: data.slice(offset, page * limit), pages, next },
        200,
      );
    } catch (error: unknown) {
      Logger.error(error);
      if (error instanceof Error) {
        throw new HTTPException(422, { message: error.message });
      }

      throw new HTTPException(500, { message: "Failed to fetch scraps." });
    }
  })
  .get("/scraps/:filename", zValidator("param", ScrapParams), async (c) => {
    try {
      const { filename } = c.req.valid("param");

      const service = new ScrapService(
        c.var.octokit,
        c.env.GITHUB_OWNER,
        c.env.GITHUB_REPO,
      );
      const data = await service.retrieve(filename);

      if (!data) {
        throw new HTTPException(404, { message: "Not found." });
      }

      return c.json({ data }, 200);
    } catch (error: unknown) {
      Logger.error(error);
      if (error instanceof HTTPException) {
        throw error;
      }

      if (error instanceof Error) {
        throw new HTTPException(422, { message: error.message });
      }

      throw new HTTPException(500, { message: "Failed to fetch scrap." });
    }
  });
