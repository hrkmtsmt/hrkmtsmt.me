import { count } from "drizzle-orm";
import * as schema from "@schema";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export class ScrapService {
  private readonly db: DrizzleD1Database;

  constructor(db: DrizzleD1Database) {
    this.db = db;
  }

  public async list(limit: number, offset: number) {
    const [data, [{ total }]] = await Promise.all([
      this.db.select().from(schema.scraps).limit(limit).offset(offset),
      this.db.select({ total: count() }).from(schema.scraps),
    ]);

    return { data, total };
  }
}
