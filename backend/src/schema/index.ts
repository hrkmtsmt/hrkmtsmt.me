import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scraps = sqliteTable("scraps", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  filename: text("filename").unique().notNull(),
  markdown: text("markdown").notNull(),
  mp3: text("mp3").notNull(),
  hash: text("hash").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id", { mode: "number" })
    .primaryKey({ autoIncrement: true })
    .notNull(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  media: text("media", {
    enum: ["zenn", "qiita", "sizu", "note", "hatena"],
  }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  publishedAt: integer("published_at", { mode: "timestamp" }).notNull(),
});
