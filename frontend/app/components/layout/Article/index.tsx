import React from "react";

export interface ArticleProps {
  children?: React.ReactNode;
}

const Component: React.FC<ArticleProps> = (props) => {
  return <article className="flex w-full flex-col gap-6 sm:gap-8">{props.children}</article>;
};

export const Article = React.memo(Component);
