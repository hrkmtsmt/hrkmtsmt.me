import { env } from "cloudflare:test";
import { drizzle } from "drizzle-orm/d1";
import { Octokit } from "@octokit/rest";
import * as schema from "@schema/index";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export class TestManager {
  public readonly db: DrizzleD1Database<typeof schema>;

  public readonly env = env;

  public readonly octokit: Octokit;

  constructor() {
    this.db = drizzle(env.DB, { schema });
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }
}
