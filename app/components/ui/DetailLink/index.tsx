import React from "react";
import { Link, LinkProps } from "@remix-run/react";
import { tv } from "tailwind-variants";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const link = tv({
  base: "relative flex group w-fit font-qualion-round font-bold leading-10 flex text-primary items-center gap-2 transition hover:-translate-x-[28px]",
});

interface DetailLinkProps extends Pick<LinkProps, "to"> {
  text: string;
}

const Component: React.FC<DetailLinkProps> = (props) => {
  return (
    <Link to={props.to} className={link()}>
      <ArrowRightIcon className="w-6 stroke-2 transition group-hover:scale-0" />
      <span className="flex">{props.text}</span>
      <ArrowRightIcon className="w-6 stroke-2 scale-0 transition group-hover:scale-100" />
    </Link>
  );
};

export const DetailLink = React.memo(Component);
