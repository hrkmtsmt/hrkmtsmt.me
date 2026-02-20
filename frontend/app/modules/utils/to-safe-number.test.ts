import { toSafeNumber } from "./to-safe-number";

describe("function toSafeNumber", () => {
  test("数値として正しい文字列が入力されたときに数値型に変換された値が返却される", () => {
    assert.equal(toSafeNumber("10", 100), 10);
  });

  test("数値として不正な文字列が入力されたときにデフォルト値が返却される", () => {
    assert.equal(toSafeNumber("o", 200), 200);
  });

  describe("Falsyな値が入力された場合はデフォルト値が返却される", () => {
    test("空文字が入力された場合はデフォルト値が返却される", () => {
      assert.equal(toSafeNumber("", 300), 300);
    });

    test("undefinedが入力された場合はデフォルト値が返却される", () => {
      assert.equal(toSafeNumber(undefined, 400), 400);
    });

    test("nullが入力された場合はデフォルト値が返却される", () => {
      assert.equal(toSafeNumber(null, 400), 400);
    });
  });
});
