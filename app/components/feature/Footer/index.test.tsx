import { render, screen } from "@testing-library/react";
import React from "react";
import { Footer } from ".";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2030-01-01T00:00:00"));
});

afterEach(() => {
  vi.useRealTimers();
});

describe("component Footer", () => {
  test("フッターのコピーライトのに現在の年が表示される", () => {
    render(<Footer />);

    assert.equal(screen.getByRole("contentinfo").textContent, "Copyright 2030 Hiroki Matsumoto");
  });
});
