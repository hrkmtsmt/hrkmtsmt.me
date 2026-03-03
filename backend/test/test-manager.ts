import { afterEach, vi } from "vitest";
import { DatabaseSync } from "node:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Octokit } from "@octokit/rest";
import * as dotenvx from "@dotenvx/dotenvx";
import * as schema from "@schema/index";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

export interface BunSQLite extends BunSQLiteDatabase<typeof schema> {
  $client: DatabaseSync;
}

export interface TestHonoEnv {
  DB: DatabaseSync;
  GITHUB_TOKEN: string;
  GITHUB_OWNER: string;
  GITHUB_REPO: string;
}

export class TestManager {
  public readonly db: BunSQLite;

  public readonly env: TestHonoEnv;

  public readonly octokit: Octokit;

  constructor() {
    dotenvx.config({ path: ".dev.vars" });

    const store = new DatabaseSync("db.sqlite");
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    this.db = drizzle({ client: store, schema });
    this.octokit = octokit;
    this.env = {
      DB: store,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN!,
      GITHUB_OWNER: process.env.GITHUB_OWNER!,
      GITHUB_REPO: process.env.GITHUB_REPO!,
    };

    vi.mock("drizzle-orm/d1", () => {
      return { drizzle };
    });

    afterEach(() => {
      this.restore();
    });
  }

  private restore() {
    Object.values(schema).forEach((s) => this.db.delete(s).run());
  }
}
