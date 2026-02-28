import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Pagination } from "@core";
import { Logger } from "@modules";
import { ScrapService } from "./service";
import type { BlankSchema } from "hono/types";
import type { Env } from "@types";

const scrapsQuerySchema = z.object({
  page: z.preprocess((v) => Number(v) || 1, z.int().positive()),
  limit: z.preprocess((v) => Number(v) || 12, z.int().positive()),
});

const scrapParamSchema = z.object({
  filename: z.string().min(1),
});

export const scraps = new Hono<Env, BlankSchema, "/">()
  .get("/scraps", zValidator("query", scrapsQuerySchema), async (c) => {
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
  .get("/scraps/:filename", zValidator("param", scrapParamSchema), async (c) => {
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
