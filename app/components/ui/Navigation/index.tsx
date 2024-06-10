import React from "react";
import { Link, LinkProps } from "@remix-run/react";


interface NavigationProps {
  links: { to: LinkProps['to']; name: string; }[];
};

export const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <nav className="">
      <ul className="flex items-center gap-4">
        {props.links.map((l, i) => (
          <li key={i} className="">
            <Link to={l.to} className="relative inline-block font-qualion-bold text-2xl leading-10 text-primary transition duration-200 ease-in-out after:absolute after:inset-x-0 after:top-12 after:m-auto after:size-2 after:rounded-full after:bg-primary after:opacity-0 after:duration-300 after:ease-in-out after:hover:top-10 after:hover:opacity-100 active:scale-95">
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
