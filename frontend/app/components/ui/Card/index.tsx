import { LinkButton, type LinkButtonProps } from "@components/ui";
import React, { useCallback, useRef } from "react";

export interface CardProps {
  title: string;
  category: string;
  to: LinkButtonProps["to"];
}

// https://design-system.w3.org/components/cards.html
const Component: React.FC<CardProps> = (props) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const onClick = useCallback(() => {
    if (getSelection()?.toString()) {
      return;
    }

    ref.current?.click();
  }, []);

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-black p-4 font-default duration-200 ease-in-out hover:scale-101 hover:opacity-80"
    >
      <h3 className="line-clamp-2 flex flex-col gap-2 font-bold">
        <span className="block w-fit font-qualion-round text-primary text-xs capitalize leading-4">
          {props.category}
        </span>
        <span className="line-clamp-2 h-12 leading-6 hover:underline">{props.title}</span>
      </h3>
      <LinkButton to={props.to} ref={ref}>
        <span>Read on </span>
        <span className="capitalize">{props.category}</span>
      </LinkButton>
    </div>
  );
};

export const Card = React.memo(Component);
