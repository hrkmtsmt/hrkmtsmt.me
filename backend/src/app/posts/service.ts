import { or, count, desc, eq, sql } from "drizzle-orm";
import { posts } from "@schema";
import { splitArray } from "@modules";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { Post } from "@schema/types";

interface ListSelecter {
  medium: Post["media"][] | undefined;
  limit?: number;
  offset?: number;
}

interface CountSelecter {
  medium: Post["media"][] | undefined;
}

export class PostService {
  private readonly db: DrizzleD1Database;

  constructor(db: DrizzleD1Database) {
    this.db = db;
  }

  private mediumSelecter(medium: Post["media"][] | undefined) {
    return medium ? or(...medium.map((m) => eq(posts.media, m))) : undefined;
  }

  public async upsert(data: Post[]) {
    return Promise.all(
      splitArray(data, 10).map(async (row) => {
        return this.db
          .insert(posts)
          .values(row)
          .onConflictDoUpdate({
            target: [posts.slug],
            set: {
              title: sql`excluded.title`,
            },
          });
      }),
    );
  }

  public async list(selecter: ListSelecter) {
    return this.db
      .select()
      .from(posts)
      .where(this.mediumSelecter(selecter.medium))
      .orderBy(desc(posts.publishedAt))
      .limit(selecter.limit ?? -1)
      .offset(selecter.offset ?? 0);
  }

  public async count(selecter: CountSelecter) {
    const [{ total }] = await this.db
      .select({ total: count() })
      .from(posts)
      .where(this.mediumSelecter(selecter.medium));
    return total;
  }
}
