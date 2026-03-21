import { describe, test, expect } from "vitest";
import { TestManager } from "@test/index";
import { posts } from "./route";
import * as schema from "@schema";
import type { Post } from "@schema/types";

const data: Post[] = [
  {
    id: 1,
    slug: "a",
    media: "zenn",
    title: "Zenn article A",
    url: "https://example.com/articles/zenn/A",
    createdAt: new Date("2021-01-01T00:00:00.000Z"),
    publishedAt: new Date("2021-01-01T00:00:00.000Z"),
  },
  {
    id: 2,
    slug: "b",
    media: "qiita",
    title: "Qiita article B",
    url: "https://example.com/articles/qiita/A",
    createdAt: new Date("2021-01-01T00:00:00.000Z"),
    publishedAt: new Date("2021-01-01T00:00:00.000Z"),
  },
  {
    id: 3,
    slug: "c",
    media: "sizu",
    title: "Sizu article C",
    url: "https://example.com/articles/sizu/C",
    createdAt: new Date("2021-01-01T00:00:00.000Z"),
    publishedAt: new Date("2021-01-01T00:00:00.000Z"),
  },
  {
    id: 4,
    slug: "d",
    media: "hatena",
    title: "hatena article D",
    url: "https://example.com/articles/hatena/D",
    createdAt: new Date("2021-01-01T00:00:00.000Z"),
    publishedAt: new Date("2021-01-01T00:00:00.000Z"),
  },
];

describe("route /posts", () => {
  describe("GET /posts", () => {
    test("メディアが指定されていない場合はすべての記事が取得できる", async () => {
      const manager = new TestManager();
      await manager.db.insert(schema.posts).values(data);

      const result = await posts.request("/posts?secret=true", {}, manager.env);

      expect(await result.json()).toStrictEqual({
        data: [
          {
            id: 1,
            slug: "a",
            media: "zenn",
            title: "Zenn article A",
            url: "https://example.com/articles/zenn/A",
            createdAt: "2021-01-01T00:00:00.000Z",
            publishedAt: "2021-01-01T00:00:00.000Z",
          },
          {
            id: 2,
            slug: "b",
            media: "qiita",
            title: "Qiita article B",
            url: "https://example.com/articles/qiita/A",
            createdAt: "2021-01-01T00:00:00.000Z",
            publishedAt: "2021-01-01T00:00:00.000Z",
          },
          {
            id: 3,
            slug: "c",
            media: "sizu",
            title: "Sizu article C",
            url: "https://example.com/articles/sizu/C",
            createdAt: "2021-01-01T00:00:00.000Z",
            publishedAt: "2021-01-01T00:00:00.000Z",
          },
          {
            id: 4,
            slug: "d",
            media: "hatena",
            title: "hatena article D",
            url: "https://example.com/articles/hatena/D",
            createdAt: "2021-01-01T00:00:00.000Z",
            publishedAt: "2021-01-01T00:00:00.000Z",
          },
        ],
        pages: 1,
        next: null,
      });
    });

    test("メディアを指定したとき、そのメディアの記事のみが返ってくる", async () => {
      const manager = new TestManager();
      await manager.db.insert(schema.posts).values(data);

      const result = await posts.request("/posts?media=zenn", {}, manager.env);

      expect(await result.json()).toStrictEqual({
        data: [
          {
            id: 1,
            slug: "a",
            media: "zenn",
            title: "Zenn article A",
            url: "https://example.com/articles/zenn/A",
            createdAt: "2021-01-01T00:00:00.000Z",
            publishedAt: "2021-01-01T00:00:00.000Z",
          },
        ],
        pages: 1,
        next: null,
      });
    });

    test("メディアがしずかなインターネットに指定されていてシークレットモードが無効のパラメータのリクエストを送るとエラーになる", async () => {
      const manager = new TestManager();

      const result = await posts.request(
        "/posts?media=sizu",
        {},
        manager.env,
      );

      expect(result.status).toBe(422);
    });
  });
});
