import React, { useCallback, useRef } from "react";
import { LinkButton, LinkButtonProps } from "@components/ui";

export interface CardProps {
  title: string;
  to: LinkButtonProps["to"];
  category?: string;
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
      className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-black p-4 font-default duration-200 ease-in-out hover:opacity-80"
    >
      <h3 className="line-clamp-2 flex flex-col gap-2">
        {!!props.category && (
          <span className="block font-qualion-bold text-xs capitalize leading-4 text-primary">{props.category}</span>
        )}
        <span className="line-clamp-2 h-12 leading-6">{props.title}</span>
      </h3>
      <LinkButton to={props.to} ref={ref}>
        Read article
      </LinkButton>
    </div>
  );
};

export const Card = React.memo(Component);
