import React from "react";
import Link from "next/link";
type Props = {
  cta: string;
  link: string;
};
export const LinkButton = (props: Props) => {
  return (
    <Link href={props.link}>
      <a className="c-link-button">{props.cta}</a>
    </Link>
  );
};