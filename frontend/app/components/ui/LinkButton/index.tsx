import { Link, type LinkProps } from "react-router";
import React from "react";
import { tv } from "tailwind-variants";

const link = tv({
  base: "block w-fit rounded-2xl bg-primary px-4 font-bold font-qualion-round text-black leading-10 duration-200 ease-in-out hover:opacity-80 active:scale-95",
});

interface LProps extends Pick<LinkProps, "to" | "children"> {}

interface AProps extends Pick<React.ComponentProps<"a">, "onClick" | "children" | "ref"> {
  to: string;
}

export type LinkButtonProps = LProps | AProps;

const isURL = (props: LProps | AProps): props is AProps => {
  const pattern = /^https?:\/\/[\w/:%#$&?()~.=+-]+$/;

  return typeof props.to === "string" && pattern.test(props.to);
};

const Component: React.FC<LinkButtonProps> = (props) => {
  if (isURL(props)) {
    return (
      <a href={props.to} ref={props.ref} className={link()}>
        {props.children}
      </a>
    );
  }

  return <Link {...props} className={link()} />;
};

export const LinkButton = React.memo(Component);
