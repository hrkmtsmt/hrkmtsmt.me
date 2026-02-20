import React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const grid = tv({
  base: "grid w-full grid-cols-4 gap-6 sm:grid-cols-8 sm:gap-8 md:grid-cols-12",
});

export interface GridProps {
  type?: "ol" | "ul";
  children?: React.ReactNode;
}

export const Grid: React.FC<GridProps> = React.memo((props) => {
  if (props.type === "ol") {
    return <ol className={grid()}>{props.children}</ol>;
  }

  if (props.type === "ul") {
    return <ul className={grid()}>{props.children}</ul>;
  }

  return <div className={grid()}>{props.children}</div>;
});

const column = tv({
  variants: {
    size: {
      full: "col-span-full",
      "2xl": "col-span-8 md:col-span-full",
      xl: "col-span-4 sm:col-span-4 md:col-span-6",
      lg: "col-span-2 sm:col-span-4 md:col-span-4",
      md: "col-span-4 sm:col-span-4 md:col-span-4",
      sm: "col-span-4 sm:col-span-4 md:col-span-3",
    },
  },
});

export interface ColumnProps extends VariantProps<typeof column> {
  type?: "li";
  children?: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = React.memo((props) => {
  if (props.type === "li") {
    return <li className={column({ size: props.size })}>{props.children}</li>;
  }

  return <div className={column({ size: props.size })}>{props.children}</div>;
});
