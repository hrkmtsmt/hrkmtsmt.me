import { toSafeNumber } from './to-safe-number';

describe('function toSafeNumber', () => {
  test('数値として正しい文字列が入力されたときに数値型に変換された値が返却される', () => {
    expect(toSafeNumber('10', 100)).toBe(10);
  });

  test('数値として不正な文字列が入力されたときにデフォルト値が返却される', () => {
    expect(toSafeNumber('o', 200)).toBe(200);
  });

  describe('Falsyな値が入力された場合はデフォルト値が返却される', () => {
    test('空文字が入力された場合はデフォルト値が返却される', () => {
      expect(toSafeNumber('', 300)).toBe(300);
    });

    test('undefinedが入力された場合はデフォルト値が返却される', () => {
      expect(toSafeNumber(undefined, 400)).toBe(400);
    });

    test('nullが入力された場合はデフォルト値が返却される', () => {
      expect(toSafeNumber(null, 400)).toBe(400);
    });
  });
});
