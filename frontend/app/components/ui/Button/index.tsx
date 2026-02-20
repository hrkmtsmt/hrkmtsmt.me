import React, { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "cursor-pointer text-nowrap rounded-2xl px-4 font-bold font-qualion-round leading-10 duration-200 ease-in-out hover:opacity-80 focus-visible:outline-hidden active:scale-95",
  variants: {
    color: {
      primary: "bg-primary text-black",
      secondary: "bg-black text-primary",
    },
    shape: {
      circle: "w-10", // TODO: Change this param name 'circle' to 'square'
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
