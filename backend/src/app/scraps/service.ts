import { eq, count } from "drizzle-orm";
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

    return {
      data: data.map((s) => ({ filename: s.path, createdAt: new Date(s.createdAt) })),
      total,
    };
  }

  public async retrieve(filename: string) {
    const [data] = await this.db
      .select()
      .from(schema.scraps)
      .where(eq(schema.scraps.path, filename));

    if (!data) {
      return null;
    }

    return {
      filename: data.path,
      content: data.text,
      createdAt: new Date(data.createdAt),
    };
  }
}
