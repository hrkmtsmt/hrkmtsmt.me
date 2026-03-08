import { count } from "drizzle-orm";
import * as schema from "@schema";
import type { Database, CloudflareD1 } from "@types";

export class ScrapService<DB extends Database> {
  private readonly db: CloudflareD1;

  constructor(db: DB) {
    this.db = db as unknown as CloudflareD1;
  }

  public async list(limit: number, offset: number) {
    const [data, [{ total }]] = await Promise.all([
      this.db.select().from(schema.scraps).limit(limit).offset(offset),
      this.db.select({ total: count() }).from(schema.scraps),
    ]);

    return { data, total };
  }
}
