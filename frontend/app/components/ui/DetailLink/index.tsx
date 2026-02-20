import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link, type LinkProps } from "react-router";
import React from "react";
import { tv } from "tailwind-variants";

const link = tv({
  base: "group hover:-translate-x-[28px] relative flex flex w-fit items-center gap-2 font-bold font-qualion-round text-primary leading-10 transition",
});

interface DetailLinkProps extends Pick<LinkProps, "to"> {
  text: string;
}

const Component: React.FC<DetailLinkProps> = (props) => {
  return (
    <Link to={props.to} className={link()}>
      <ArrowRightIcon className="w-6 stroke-2 transition group-hover:scale-0" />
      <span className="flex">{props.text}</span>
      <ArrowRightIcon className="w-6 scale-0 stroke-2 transition group-hover:scale-100" />
    </Link>
  );
};

export const DetailLink = React.memo(Component);
