import { test, describe, expect } from "vitest";
import { MediaSelector } from "./media-selector";

describe("class MediaSelector", () => {
  describe("method selector.value", () => {
    test("メディアでしずかなインターネットを指定していてシークレットモードが無効な場合はエラーを返す", () => {
      expect(() => new MediaSelector("sizu", false)).toThrow();
    });

    test("メディアでしずかなインターネットを指定していてシークレットモードが有効な場合はしずかなインターネットのみを返す", () => {
      const selector = new MediaSelector("sizu", true);

      expect(selector.value).toStrictEqual(["sizu"]);
    });

    test("メディアの指定ありでシークレットモードが有効な場合は指定されたメディアのみを返す", () => {
      const selector = new MediaSelector("zenn", true);

      expect(selector.value).toStrictEqual(["zenn"]);
    });

    test("メディアの指定ありでシークレットモードが無効な場合は指定されたメディアのみを返す", () => {
      const selector = new MediaSelector("qiita", false);

      expect(selector.value).toStrictEqual(["qiita"]);
    });

    test("メディアの指定なしでシークレットモードが有効な場合は全メディアを返す", () => {
      const selector = new MediaSelector(undefined, true);

      expect(selector.value).toBe("all");
    });

    test("メディアの指定なしでシークレットモードが無効な場合は指定されたはしずかなインターネットを含まない全メディアを返す", () => {
      const selector = new MediaSelector(undefined, false);

      expect(selector.value).toStrictEqual(["hatena", "note", "qiita", "zenn"]);
    });
  });
});
