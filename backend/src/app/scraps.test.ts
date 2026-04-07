import { describe, test, expect } from "vitest";
import { TestManager } from "@test/index";
import { scraps } from "./scraps";
import * as schema from "@schema";
import type { GetListResponse } from "./types";

describe("route /scraps", () => {
  describe("GET /scraps", () => {
    test("リクエストを送るとスクラップ一覧が返ってくる", async () => {
      const manager = new TestManager();
      const createdAt = new Date("2025-07-09T00:00:00.000Z");

      await manager.db.insert(schema.scraps).values({
        filename: "1751979286783.md",
        markdown: "# Test",
        mp3: "test.mp3",
        hash: "abc123",
        createdAt,
        updatedAt: createdAt,
      });

      const result = await scraps.request("/scraps", {}, manager.env);

      expect(await result.json<GetListResponse>()).toStrictEqual({
        data: [
          {
            id: 1,
            filename: "1751979286783.md",
            markdown: "# Test",
            mp3: "test.mp3",
            hash: "abc123",
            createdAt: createdAt.toISOString(),
            updatedAt: createdAt.toISOString(),
          },
        ],
        pages: 1,
        next: null,
      });
    });
  });

  describe("GET /scraps/:filename", () => {
    test("存在するファイル名でリクエストするとスクラップの詳細が返ってくる", async () => {
      const manager = new TestManager();
      const createdAt = new Date("2025-07-09T00:00:00.000Z");

      await manager.db.insert(schema.scraps).values({
        filename: "1751979286783.md",
        markdown: "# Test",
        mp3: "test.mp3",
        hash: "abc123",
        createdAt,
        updatedAt: createdAt,
      });

      const result = await scraps.request("/scraps/1751979286783.md", {}, manager.env);

      expect(result.status).toEqual(200);
    });

    test("存在しないファイル名でリクエストすると400エラーが返ってくる", async () => {
      const manager = new TestManager();

      const result = await scraps.request("/scraps/non-existent.md", {}, manager.env);

      expect(result.status).toBe(400);
    });
  });
});
