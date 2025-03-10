import React, { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "text-nowrap rounded-full px-4 font-qualion-bold leading-10 duration-200 ease-in-out hover:opacity-80 focus-visible:outline-none active:scale-95",
  variants: {
    color: {
      primary: "bg-primary text-black",
      secondary: "bg-black text-primary",
    },
    shape: {
      circle: "w-10",
      pill: "w-fit",
    },
  },
});

export interface ButtonProps
  extends Pick<ComponentProps<"button">, "children" | "value" | "onClick" | "disabled" | "role">,
    VariantProps<typeof button> {}

const Component: React.FC<ButtonProps> = (props) => {
  return <button {...props} type="button" className={button({ color: props.color, shape: props.shape })} />;
};

export const Button = React.memo(Component);
