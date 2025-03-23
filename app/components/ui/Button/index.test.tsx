import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Button } from ".";

describe("component Button", () => {
  test("childrenに渡された値が表示される", () => {
    render(<Button color="primary">Submit</Button>);

    const result = screen.getByRole("button").textContent;

    assert.include(result, "Submit");
  });

  test("color=primaryで指定したクラスが付与される", () => {
    render(<Button color="primary">Submit</Button>);

    const result = screen.getByRole("button").className;

    assert.include(result, "bg-primary text-black");
  });

  test("color=secondaryで指定したクラスが付与される", () => {
    render(<Button color="secondary">Submit</Button>);

    const result = screen.getByRole("button").className;

    assert.include(result, "bg-black text-primary");
  });

  test("disable=falseの時にボタンを1度クリックするとonClickに渡した関数が1度発火する", async () => {
    const handleClick = vi.fn();
    render(
      <Button color="primary" onClick={handleClick}>
        Submit
      </Button>
    );

    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toBeCalledTimes(1);
  });

  test("disable=trueの時にボタンをクリックしてもonClickに渡した関数が発火しない", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled color="primary" onClick={handleClick}>
        Submit
      </Button>
    );

    await userEvent.click(screen.getByRole("button"));

    expect(handleClick).toBeCalledTimes(0);
  });
});
