import { render, screen } from "@testing-library/react";
import React from "react";
import { BrandSymbol } from "./index";

describe("component BrandSymbol", () => {
  test("widthプロパティが正しく適用される", () => {
    render(<BrandSymbol size={32} color="primary" />);

    const result = screen.getByRole("img").getAttribute("width");

    assert.equal(result, "32");
  });

  test("heightプロパティが正しく適用される", () => {
    render(<BrandSymbol size={32} color="primary" />);

    const result = screen.getByRole("img").getAttribute("height");

    assert.equal(result, "32");
  });

  test("color=primaryの場合はprimaryのクラスが適応される", () => {
    render(<BrandSymbol size={32} color="primary" />);

    const result = screen.getByRole("img").children[0].getAttribute("class");

    assert.include(result, "fill-primary");
  });

  test("color=whiteの場合はwhiteのクラスが適応される", () => {
    render(<BrandSymbol size={32} color="white" />);

    const result = screen.getByRole("img").children[0].getAttribute("class");

    assert.include(result, "fill-white");
  });
});
